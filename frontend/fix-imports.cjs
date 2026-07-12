const fs = require('fs');
const path = require('path');

function walkSync(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    let stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile() && (filepath.endsWith('.ts') || filepath.endsWith('.tsx'))) {
      callback(filepath);
    }
  });
}

walkSync(path.join(__dirname, 'src'), (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  content = content.replace(/import\s+React\s*,\s*\{\s*([^}]+)\s*\}\s*from\s*['"]react['"];/g, 'import { $1 } from \'react\';');
  content = content.replace(/import\s+React\s*from\s*['"]react['"];/g, '');

  content = content.replace(/import\s*\{\s*([^}]*)\s*\}\s*from\s*['"]@tanstack\/react-table['"];/g, (match, p1) => {
    if (p1.includes('ColumnDef') || p1.includes('SortingState')) {
      const types = [];
      const values = [];
      p1.split(',').forEach(item => {
        item = item.trim();
        if (['ColumnDef', 'SortingState'].includes(item)) {
          types.push(item);
        } else if (item) {
          values.push(item);
        }
      });
      let replacement = '';
      if (types.length) replacement += `import type { ${types.join(', ')} } from '@tanstack/react-table';\n`;
      if (values.length) replacement += `import { ${values.join(', ')} } from '@tanstack/react-table';`;
      return replacement;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed:', filePath);
  }
});
