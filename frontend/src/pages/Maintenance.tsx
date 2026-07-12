import { useState, useEffect, useMemo  } from 'react';
import { PageHeader } from '../components/layout/page-header';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/ui/status-badge';
import { Plus, FileDown, MoreVertical, Wrench, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { MaintenanceService } from '../services/maintenance.service';
import type { MaintenanceRecord } from '../mocks/maintenance.mock';
import { toast } from 'sonner';
import { exportToCSV } from '../utils/csv';
import { DataTable } from '../components/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';


import { Modal } from '../components/ui/modal';
import { Input } from '../components/ui/input';

export const Maintenance = () => {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const form = e.target as HTMLFormElement;
      const data = {
        vehicleId: (form.elements.namedItem('vehicleId') as HTMLInputElement).value,
        serviceType: (form.elements.namedItem('serviceType') as HTMLInputElement).value,
        date: (form.elements.namedItem('date') as HTMLInputElement).value,
        description: (form.elements.namedItem('description') as HTMLInputElement).value,
        cost: Number((form.elements.namedItem('cost') as HTMLInputElement).value),
        status: 'Scheduled',
      };
      const result = await MaintenanceService.logMaintenance(data);
      setRecords([result, ...records]);
      setIsModalOpen(false);
      toast.success('Maintenance logged successfully');
    } catch (err) {
      toast.error('Failed to log maintenance');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    MaintenanceService.getMaintenanceRecords().then((data) => {
      setRecords(data);
      setIsLoading(false);
    }).catch(() => {
      toast.error('Failed to fetch maintenance records');
      setIsLoading(false);
    });
  }, []);

  const handleExport = () => {
    exportToCSV(records, 'maintenance_log');
    toast.success('Downloaded CSV export!');
  };

  const columns = useMemo<ColumnDef<MaintenanceRecord>[]>(() => [
    {
      accessorKey: 'id',
      header: 'Task ID',
      cell: ({ row }) => <span className="font-bold text-odoo-primary">{row.original.id}</span>,
    },
    {
      accessorKey: 'vehicleId',
      header: 'Vehicle & Type',
      cell: ({ row }) => {
        const record = row.original;
        return (
          <>
            <span className="text-odoo-text font-bold block">{record.vehicleId}</span>
            <span className="text-xs text-odoo-muted">{record.serviceType}</span>
          </>
        );
      },
    },
    {
      accessorKey: 'date',
      header: 'Date & Details',
      cell: ({ row }) => {
        const record = row.original;
        return (
          <>
            <span className="text-odoo-text font-medium block">{record.date}</span>
            <span className="text-xs text-odoo-muted">{record.description}</span>
          </>
        );
      },
    },
    {
      accessorKey: 'cost',
      header: 'Cost',
      cell: ({ row }) => <span className="font-semibold text-odoo-text">₹{row.original.cost.toLocaleString()}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const record = row.original;
        return (
          <StatusBadge 
            status={record.status.toLowerCase().replace(' ', '-') as any} 
            label={record.status} 
          />
        );
      },
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <div className="text-right">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full" onClick={() => toast.info('Maintenance options opened')}>
            <MoreVertical className="w-4 h-4 text-odoo-muted" />
          </Button>
        </div>
      ),
    },
  ], []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="pb-10 space-y-6"
    >
      <PageHeader 
        title="Maintenance Center" 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Maintenance' }]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm" onClick={handleExport}>
              <FileDown className="w-4 h-4 mr-2" />
              Export Log
            </Button>
            <Button className="shadow-enterprise" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Log Maintenance
            </Button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Maintenance', value: 60, icon: Wrench, color: 'text-odoo-primary' },
          { label: 'In Progress', value: 4, icon: Calendar, color: 'text-odoo-info' },
          { label: 'Pending Approval', value: 12, icon: FileText, color: 'text-odoo-warning' },
          { label: 'Completed (MTD)', value: 45, icon: CheckCircle2, color: 'text-odoo-success' },
        ].map((stat, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-odoo-muted uppercase font-semibold">{stat.label}</p>
                <p className="text-2xl font-bold text-odoo-text mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-odoo-muted-background ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm p-4">
        {isLoading ? (
          <div className="p-8 text-center text-odoo-muted animate-pulse">Loading maintenance records...</div>
        ) : (
          <DataTable columns={columns} data={records} searchPlaceholder="Search by ID, vehicle..." />
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Maintenance">
        <form onSubmit={handleLogSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-odoo-text mb-1">Vehicle ID</label>
            <Input name="vehicleId" required placeholder="e.g. TRK-001" />
          </div>
          <div>
            <label className="block text-sm font-medium text-odoo-text mb-1">Service Type</label>
            <Input name="serviceType" required placeholder="e.g. Oil Change, Engine Repair" />
          </div>
          <div>
            <label className="block text-sm font-medium text-odoo-text mb-1">Date</label>
            <Input name="date" type="date" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-odoo-text mb-1">Description</label>
            <Input name="description" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-odoo-text mb-1">Estimated Cost ($)</label>
            <Input name="cost" type="number" step="0.01" required />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-odoo-border">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Record'}</Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};
