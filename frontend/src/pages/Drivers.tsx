import { useState, useEffect, useMemo  } from 'react';
import { PageHeader } from '../components/layout/page-header';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/ui/status-badge';
import { Plus, FileDown, MoreVertical, ShieldCheck, FileText, UserCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { DriverService } from '../services/driver.service';
import type { Driver } from '../types';
import { toast } from 'sonner';
import { exportToCSV } from '../utils/csv';
import { DataTable } from '../components/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';


export const Drivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DriverService.getDrivers().then((data) => {
      setDrivers(data);
      setIsLoading(false);
    }).catch(() => {
      toast.error('Failed to fetch drivers');
      setIsLoading(false);
    });
  }, []);

  const handleExport = () => {
    exportToCSV(drivers, 'drivers_export');
    toast.success('Downloaded CSV export!');
  };

  const handleAddDriver = () => {
    toast.info('Add Driver dialog opened.');
  };

  const columns = useMemo<ColumnDef<Driver>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Driver Info',
      cell: ({ row }) => {
        const driver = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-odoo-primary/10 flex items-center justify-center text-odoo-primary font-bold">
              {driver.name.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-odoo-text block">{driver.name}</span>
              <span className="text-xs text-odoo-muted">{driver.id}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'phone',
      header: 'Contact / License',
      cell: ({ row }) => {
        const driver = row.original;
        return (
          <>
            <span className="text-odoo-text font-medium block">{driver.phone}</span>
            <span className="text-xs text-odoo-muted">{driver.licenseNumber}</span>
          </>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const driver = row.original;
        return (
          <StatusBadge 
            status={driver.status.toLowerCase().replace(' ', '-') as any} 
            label={driver.status} 
          />
        );
      },
    },
    {
      accessorKey: 'experienceYears',
      header: 'Experience',
      cell: ({ row }) => <span className="text-odoo-text">{row.original.experienceYears} Yrs</span>,
    },
    {
      accessorKey: 'safetyScore',
      header: 'Safety Score',
      cell: ({ row }) => {
        const score = row.original.safetyScore;
        const color = score > 90 ? 'bg-odoo-success' : score > 80 ? 'bg-odoo-warning' : 'bg-odoo-danger';
        const textColor = score > 90 ? 'text-odoo-success' : score > 80 ? 'text-odoo-warning' : 'text-odoo-danger';
        return (
          <div className="flex items-center gap-2 mb-1">
            <div className="w-full bg-odoo-border rounded-full h-1.5 max-w-[100px]">
              <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${score}%` }}></div>
            </div>
            <span className={`text-xs font-semibold ${textColor}`}>{score}</span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <div className="text-right">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full" onClick={() => toast.info('Driver options menu opened')}>
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
        title="Driver Management" 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Drivers' }]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm" onClick={handleExport}>
              <FileDown className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="shadow-enterprise" onClick={handleAddDriver}>
              <Plus className="w-4 h-4 mr-2" />
              Add Driver
            </Button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Drivers', value: 80, icon: UserCheck, color: 'text-odoo-primary' },
          { label: 'On Trip', value: 35, icon: Activity, color: 'text-odoo-info' },
          { label: 'Available', value: 40, icon: ShieldCheck, color: 'text-odoo-success' },
          { label: 'On Leave', value: 5, icon: FileText, color: 'text-odoo-warning' },
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
          <div className="p-8 text-center text-odoo-muted animate-pulse">Loading drivers...</div>
        ) : (
          <DataTable columns={columns} data={drivers} searchPlaceholder="Search drivers by name, phone or ID..." />
        )}
      </Card>
    </motion.div>
  );
};
