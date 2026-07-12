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
import { DataTable } from '../components/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';


export const Maintenance = () => {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    toast.info('Downloading CSV export...');
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
            <Button className="shadow-enterprise" onClick={() => toast.info('Log Maintenance dialog opened.')}>
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
    </motion.div>
  );
};
