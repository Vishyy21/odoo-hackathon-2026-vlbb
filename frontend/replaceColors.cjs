const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src');

const replacements = {
  'bg-white': 'bg-odoo-surface',
  'bg-gray-50': 'bg-odoo-muted-background',
  'bg-gray-100': 'bg-odoo-muted-background',
  'bg-gray-200': 'bg-odoo-border',
  'text-gray-400': 'text-odoo-muted',
  'text-gray-500': 'text-odoo-muted',
  'text-black': 'text-odoo-text',
  'text-gray-800': 'text-odoo-text',
  'text-gray-900': 'text-odoo-text',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  Object.keys(replacements).forEach(key => {
    // Replace whole words to avoid partial matching (e.g., bg-white-500 if that existed)
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    content = content.replace(regex, replacements[key]);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  });
}

processDirectory(directory);
console.log('Color replacement complete.');
