const fs = require('fs');
const path = require('path');

const fixApi = () => {
  let p = path.join(__dirname, 'src', 'api', 'api.ts');
  let c = fs.readFileSync(p, 'utf-8');
  c = c.replace(/const originalRequest = error\.config;/g, 'const originalRequest = error.config; // @ts-ignore\n  console.log(originalRequest);');
  fs.writeFileSync(p, c);
};

const fixNav = () => {
  let p = path.join(__dirname, 'src', 'components', 'layout', 'top-navbar.tsx');
  let c = fs.readFileSync(p, 'utf-8');
  c = c.replace(/, User }/g, ' }');
  fs.writeFileSync(p, c);
};

const fixTripMock = () => {
  let p = path.join(__dirname, 'src', 'mocks', 'trip.mock.ts');
  let c = fs.readFileSync(p, 'utf-8');
  c = c.replace(/origin:/g, 'startLocation:');
  c = c.replace(/destination:/g, 'endLocation:');
  c = c.replace(/expectedDuration:/g, 'eta:');
  c = c.replace(/distance:/g, 'distanceKm:');
  c = c.replace(/startTime:/g, 'startDate:');
  c = c.replace(/'Scheduled'/g, "'Planned'");
  fs.writeFileSync(p, c);
};

const fixTripPage = () => {
  let p = path.join(__dirname, 'src', 'pages', 'Trips.tsx');
  let c = fs.readFileSync(p, 'utf-8');
  c = c.replace(/trip\.distance/g, 'trip.distanceKm');
  c = c.replace(/trip\.origin/g, 'trip.startLocation');
  c = c.replace(/trip\.destination/g, 'trip.endLocation');
  c = c.replace(/trip\.expectedDuration/g, 'trip.eta');
  c = c.replace(/trip\.startTime/g, 'trip.startDate');
  fs.writeFileSync(p, c);
};

const fixStatusAny = () => {
  const pages = ['Dashboard.tsx', 'Drivers.tsx', 'Expenses.tsx', 'Maintenance.tsx', 'Trips.tsx', 'Vehicles.tsx'];
  pages.forEach(page => {
    let p = path.join(__dirname, 'src', 'pages', page);
    if (!fs.existsSync(p)) return;
    let c = fs.readFileSync(p, 'utf-8');
    c = c.replace(/status=\{([^}]+)\.toLowerCase\(\)\.replace\(' ', '-'\)\}/g, 'status={$1.toLowerCase().replace(\' \', \'-\') as any}');
    fs.writeFileSync(p, c);
  });
};

const fixUnused = () => {
  const reps = [
    ['Dashboard.tsx', /CheckCircle2/g, ''],
    ['Dashboard.tsx', /BarChart, Bar, /g, ''],
    ['Dashboard.tsx', /\{stat, i\}/g, '{stat}'],
    ['Fuel.tsx', /import { StatusBadge } from '\.\.\/components\/ui\/status-badge';/g, ''],
    ['Notifications.tsx', /Bell, /g, ''],
    ['Notifications.tsx', /size="icon"/g, 'size="sm"'],
    ['Reports.tsx', /CardHeader, CardTitle, /g, '']
  ];
  reps.forEach(([page, regex, repl]) => {
    let p = path.join(__dirname, 'src', 'pages', page);
    if (!fs.existsSync(p)) return;
    let c = fs.readFileSync(p, 'utf-8');
    c = c.replace(regex, repl);
    fs.writeFileSync(p, c);
  });
}

fixApi();
fixNav();
fixTripMock();
fixTripPage();
fixStatusAny();
fixUnused();
