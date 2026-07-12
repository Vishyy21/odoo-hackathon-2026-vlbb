import { useState, useEffect, useMemo  } from 'react';
import { PageHeader } from '../components/layout/page-header';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

import { Plus, FileDown, MoreVertical, Droplet, TrendingDown, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import { FuelService } from '../services/fuel.service';
import type { FuelLog } from '../mocks/fuel.mock';
import { toast } from 'sonner';
import { DataTable } from '../components/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';


export const Fuel = () => {
  const [logs, setLogs] = useState<FuelLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    FuelService.getFuelLogs().then((data) => {
      setLogs(data);
      setIsLoading(false);
    }).catch(() => {
      toast.error('Failed to fetch fuel logs');
      setIsLoading(false);
    });
  }, []);

  const handleExport = () => {
    toast.info('Downloading CSV export...');
  };

  const columns = useMemo<ColumnDef<FuelLog>[]>(() => [
    {
      accessorKey: 'id',
      header: 'Log ID',
      cell: ({ row }) => <span className="font-bold text-odoo-primary">{row.original.id}</span>,
    },
    {
      accessorKey: 'vehicleId',
      header: 'Vehicle & Date',
      cell: ({ row }) => {
        const log = row.original;
        return (
          <>
            <span className="text-odoo-text font-bold block">{log.vehicleId}</span>
            <span className="text-xs text-odoo-muted">{log.date}</span>
          </>
        );
      },
    },
    {
      accessorKey: 'volume',
      header: 'Volume & Cost',
      cell: ({ row }) => {
        const log = row.original;
        return (
          <>
            <span className="text-odoo-text font-medium block">{log.volume} L</span>
            <span className="text-xs text-odoo-muted font-bold">₹{log.cost.toLocaleString()}</span>
          </>
        );
      },
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => <span className="text-odoo-text">{row.original.location}</span>,
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <div className="text-right">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full" onClick={() => toast.info('Fuel Log options opened')}>
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
        title="Fuel Management" 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Fuel' }]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm" onClick={handleExport}>
              <FileDown className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button className="shadow-enterprise" onClick={() => toast.info('Log Fuel dialog opened.')}>
              <Plus className="w-4 h-4 mr-2" />
              Log Fuel
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Volume (MTD)', value: '14,250 L', icon: Droplet, color: 'text-odoo-primary' },
          { label: 'Total Cost (MTD)', value: '₹12.4L', icon: IndianRupee, color: 'text-odoo-info' },
          { label: 'Avg Efficiency', value: '4.2 km/L', icon: TrendingDown, color: 'text-odoo-success' },
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
          <div className="p-8 text-center text-odoo-muted animate-pulse">Loading fuel logs...</div>
        ) : (
          <DataTable columns={columns} data={logs} searchPlaceholder="Search by ID, vehicle..." />
        )}
      </Card>
    </motion.div>
  );
};
