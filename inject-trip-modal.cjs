const fs = require('fs');

const path = 'frontend/src/pages/Dashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Imports
if (!content.includes('import { Modal }')) {
  const importInject = `import { useState } from 'react';\nimport { Modal } from '../components/ui/modal';\nimport { Input } from '../components/ui/input';\nimport { TripService } from '../services/trip.service';\nimport { toast } from 'sonner';\n`;
  content = importInject + content;
}

// 2. Add State
const stateInject = `  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTripSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const form = e.target as HTMLFormElement;
      const data = {
        vehicle_id: (form.elements.namedItem('vehicle_id') as HTMLInputElement).value,
        driver_id: (form.elements.namedItem('driver_id') as HTMLInputElement).value,
        start_location: (form.elements.namedItem('start_location') as HTMLInputElement).value,
        end_location: (form.elements.namedItem('end_location') as HTMLInputElement).value,
        start_date: (form.elements.namedItem('start_date') as HTMLInputElement).value
      };
      await TripService.createTrip(data);
      toast.success('Trip planned successfully! Check Trips tab.');
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Failed to create trip');
    } finally {
      setIsSubmitting(false);
    }
  };
`;

if (!content.includes('const [isModalOpen')) {
  content = content.replace("export const Dashboard = () => {", "export const Dashboard = () => {\n" + stateInject);
}

// 3. Change Button onClick
content = content.replace(
  /<Button className="shadow-enterprise hover:shadow-enterprise-md transition-shadow">\s*<Map className="w-4 h-4 mr-2" \/>\s*New Trip \(Ctrl\+K\)\s*<\/Button>/,
  `<Button className="shadow-enterprise hover:shadow-enterprise-md transition-shadow" onClick={() => setIsModalOpen(true)}>\n              <Map className="w-4 h-4 mr-2" />\n              New Trip (Ctrl+K)\n            </Button>`
);

// 4. Inject Modal
const modalJSX = `      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Plan New Trip">
        <form onSubmit={handleTripSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-odoo-text mb-1">Vehicle ID</label>
            <Input name="vehicle_id" required placeholder="e.g. 1 (Requires valid DB ID)" />
          </div>
          <div>
            <label className="block text-sm font-medium text-odoo-text mb-1">Driver ID</label>
            <Input name="driver_id" required placeholder="e.g. 1 (Requires valid DB ID)" />
          </div>
          <div>
            <label className="block text-sm font-medium text-odoo-text mb-1">Start Location</label>
            <Input name="start_location" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-odoo-text mb-1">End Location</label>
            <Input name="end_location" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-odoo-text mb-1">Start Date</label>
            <Input name="start_date" type="date" required />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-odoo-border">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Plan Trip'}</Button>
          </div>
        </form>
      </Modal>
`;

if (!content.includes('isOpen={isModalOpen} onClose=')) {
  content = content.replace("    </motion.div>\n  );\n};", modalJSX + "    </motion.div>\n  );\n};");
}

fs.writeFileSync(path, content);
console.log('Injected modal into Dashboard.tsx');
