import { useState, useEffect, useMemo  } from 'react';
import { PageHeader } from '../components/layout/page-header';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/ui/status-badge';
import { Plus, FileDown, MoreVertical, ShieldAlert, Truck, Activity, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import { VehicleService } from '../services/vehicle.service';
import type { Vehicle } from '../types';
import { toast } from 'sonner';
import { DataTable } from '../components/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';


export const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    VehicleService.getVehicles().then((data) => {
      setVehicles(data);
      setIsLoading(false);
    }).catch(() => {
      toast.error('Failed to fetch vehicles');
      setIsLoading(false);
    });
  }, []);

  const handleExport = () => {
    toast.info('Downloading CSV export...');
  };

  const handleAddVehicle = () => {
    toast.info('Add Vehicle dialog opened.');
  };

  const columns = useMemo<ColumnDef<Vehicle>[]>(() => [
    {
      accessorKey: 'plateNumber',
      header: 'Plate No.',
      cell: ({ row }) => {
        const vehicle = row.original;
        return (
          <>
            <span className="font-bold text-odoo-primary block">{vehicle.plateNumber}</span>
            <span className="text-xs text-odoo-muted">{vehicle.location}</span>
          </>
        );
      },
    },
    {
      accessorKey: 'model',
      header: 'Model / Type',
      cell: ({ row }) => {
        const vehicle = row.original;
        return (
          <>
            <span className="text-odoo-text font-medium block">{vehicle.model}</span>
            <span className="text-xs text-odoo-muted">{vehicle.type}</span>
          </>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const vehicle = row.original;
        return (
          <StatusBadge 
            status={vehicle.status.toLowerCase().replace(' ', '-') as any} 
            label={vehicle.status} 
          />
        );
      },
    },
    {
      accessorKey: 'fuelLevel',
      header: 'Fuel / Next Svc',
      cell: ({ row }) => {
        const vehicle = row.original;
        return (
          <>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-full bg-odoo-border rounded-full h-1.5 max-w-[100px]">
                <div className={`h-1.5 rounded-full ${vehicle.fuelLevel > 30 ? 'bg-odoo-success' : 'bg-odoo-danger'}`} style={{ width: `${vehicle.fuelLevel}%` }}></div>
              </div>
              <span className="text-xs font-semibold">{vehicle.fuelLevel}%</span>
            </div>
            <span className="text-xs text-odoo-muted">{vehicle.nextServiceDate}</span>
          </>
        );
      },
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <div className="text-right">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full" onClick={() => toast.info('Options menu opened')}>
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
        title="Fleet Vehicles" 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Vehicles' }]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm" onClick={handleExport}>
              <FileDown className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="shadow-enterprise" onClick={handleAddVehicle}>
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Button>
          </div>
        }
      />

      {/* Fleet Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Fleet', value: 40, icon: Truck, color: 'text-odoo-primary' },
          { label: 'On Trip', value: 18, icon: Activity, color: 'text-odoo-info' },
          { label: 'Available', value: 18, icon: Droplet, color: 'text-odoo-success' },
          { label: 'Maintenance', value: 4, icon: ShieldAlert, color: 'text-odoo-warning' },
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
          <div className="p-8 text-center text-odoo-muted animate-pulse">Loading vehicles...</div>
        ) : (
          <DataTable columns={columns} data={vehicles} searchPlaceholder="Search by plate number, model..." />
        )}
      </Card>
    </motion.div>
  );
};
