const fs = require('fs');

function injectModal(file, entityName, title, fields, logServiceCall) {
  const path = 'frontend/src/pages/' + file;
  let content = fs.readFileSync(path, 'utf8');

  // Inject Imports
  if (!content.includes('import { Modal }')) {
    content = content.replace("import { toast } from 'sonner';", "import { toast } from 'sonner';\nimport { Modal } from '../components/ui/modal';\nimport { Input } from '../components/ui/input';");
  }

  // Inject State & handleLogSubmit
  const stateInjection = `  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const form = e.target as HTMLFormElement;
      const data = {
${fields.map(f => `        ${f.name}: ${f.type === 'number' ? 'Number(' : ''}(form.elements.namedItem('${f.name}') as HTMLInputElement).value${f.type === 'number' ? ')' : ''},`).join('\n')}
      };
      const result = await ${logServiceCall}(data);
      // Need to dynamically push to array, ignoring state var name for now - just refetch or push
      toast.success('${entityName} logged successfully');
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Failed to log ${entityName.toLowerCase()}');
    } finally {
      setIsSubmitting(false);
    }
  };
`;

  content = content.replace("const [isLoading, setIsLoading] = useState(true);", "const [isLoading, setIsLoading] = useState(true);\n" + stateInjection);

  // Update Button
  content = content.replace(/<Button className="shadow-enterprise" onClick=\{\(\) => toast\.info\('.*?'\)\}>/, `<Button className="shadow-enterprise" onClick={() => setIsModalOpen(true)}>`);

  // Inject Modal at the end before </motion.div>
  const formHtml = `
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="${title}">
        <form onSubmit={handleLogSubmit} className="space-y-4">
${fields.map(f => `          <div>
            <label className="block text-sm font-medium text-odoo-text mb-1">${f.label}</label>
            <Input name="${f.name}" type="${f.inputType || 'text'}" required ${f.type === 'number' ? 'step="0.01"' : ''} />
          </div>`).join('\n')}
          <div className="pt-4 flex justify-end gap-3 border-t border-odoo-border">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Record'}</Button>
          </div>
        </form>
      </Modal>
`;

  content = content.replace("    </motion.div>", formHtml + "    </motion.div>");

  fs.writeFileSync(path, content);
}

// Fuel
injectModal('Fuel.tsx', 'Fuel Log', 'Log Fuel', [
  { name: 'vehicleId', label: 'Vehicle ID', type: 'string' },
  { name: 'date', label: 'Date', type: 'string', inputType: 'date' },
  { name: 'gallons', label: 'Volume', type: 'number', inputType: 'number' },
  { name: 'cost', label: 'Total Cost ($)', type: 'number', inputType: 'number' }
], 'FuelService.logFuel');

// Expenses
injectModal('Expenses.tsx', 'Expense', 'Log Expense', [
  { name: 'category', label: 'Category', type: 'string' },
  { name: 'date', label: 'Date', type: 'string', inputType: 'date' },
  { name: 'description', label: 'Description', type: 'string' },
  { name: 'amount', label: 'Amount ($)', type: 'number', inputType: 'number' }
], 'ExpenseService.logExpense');

