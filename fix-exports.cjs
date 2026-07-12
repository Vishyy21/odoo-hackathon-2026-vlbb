const fs = require('fs');
const pages = [
  { file: 'Vehicles.tsx', varName: 'vehicles' },
  { file: 'Trips.tsx', varName: 'trips' },
  { file: 'Fuel.tsx', varName: 'records' },
  { file: 'Expenses.tsx', varName: 'expenses' },
  { file: 'Drivers.tsx', varName: 'drivers' }
];

pages.forEach(p => {
  const path = 'frontend/src/pages/' + p.file;
  let content = fs.readFileSync(path, 'utf8');
  
  if (!content.includes('import { exportToCSV }')) {
    content = content.replace("import { toast } from 'sonner';", "import { toast } from 'sonner';\nimport { exportToCSV } from '../utils/csv';");
  }

  content = content.replace(
    /const handleExport = \(\) => {\s+toast\.info\('Downloading CSV export\.\.\.'\);\s+};/g,
    `const handleExport = () => {\n    exportToCSV(${p.varName}, '${p.file.split('.')[0].toLowerCase()}_export');\n    toast.success('Downloaded CSV export!');\n  };`
  );
  
  fs.writeFileSync(path, content);
});
