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

  if (content.includes('React.') && !content.includes("from 'react'") && !content.includes('from "react"')) {
    content = "import React from 'react';\n" + content;
  } else if (content.includes('React.') && (content.includes("from 'react'") || content.includes('from "react"'))) {
    if (!content.includes('React ')) {
       content = content.replace(/import\s+\{/g, 'import React, {');
    }
  }

  // Also replace some specific errors:
  content = content.replace(/import \{ ColumnDef, SortingState \} from '@tanstack\/react-table'/g, "import type { ColumnDef, SortingState } from '@tanstack/react-table'");

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed:', filePath);
  }
});
