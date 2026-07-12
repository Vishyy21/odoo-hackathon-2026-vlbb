import { useState, useEffect, useMemo  } from 'react';
import { PageHeader } from '../components/layout/page-header';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/ui/status-badge';
import { Plus, FileDown, MoreVertical, MapPin, Map, Navigation, Clock, Activity, Flag, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TripService } from '../services/trip.service';
import type { Trip } from '../types';
import { toast } from 'sonner';
import { DataTable } from '../components/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';


export const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  useEffect(() => {
    TripService.getTrips().then((data) => {
      setTrips(data);
      setIsLoading(false);
    }).catch(() => {
      toast.error('Failed to fetch trips');
      setIsLoading(false);
    });
  }, []);

  const handleExport = () => {
    toast.info('Downloading CSV export...');
  };

  const columns = useMemo<ColumnDef<Trip>[]>(() => [
    {
      accessorKey: 'id',
      header: 'Trip Details',
      cell: ({ row }) => {
        const trip = row.original;
        return (
          <>
            <span className="font-bold text-odoo-primary block">{trip.id}</span>
            <span className="text-xs text-odoo-muted">{trip.distanceKm} km</span>
          </>
        );
      },
    },
    {
      accessorKey: 'route',
      header: 'Route',
      cell: ({ row }) => {
        const trip = row.original;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-odoo-text">
              <div className="w-2 h-2 rounded-full bg-green-500"></div> {trip.startLocation}
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-odoo-text">
              <MapPin className="w-3 h-3 text-red-500 -ml-0.5" /> {trip.endLocation}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'driverId',
      header: 'Driver & Vehicle',
      cell: ({ row }) => {
        const trip = row.original;
        return (
          <>
            <span className="text-odoo-text font-medium block">Driver {trip.driverId}</span>
            <span className="text-xs text-odoo-muted">Vehicle {trip.vehicleId}</span>
          </>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const trip = row.original;
        return (
          <StatusBadge 
            status={trip.status.toLowerCase().replace(' ', '-') as any} 
            label={trip.status} 
          />
        );
      },
    },
    {
      accessorKey: 'expectedDuration',
      header: 'ETA / Date',
      cell: ({ row }) => {
        const trip = row.original;
        return (
          <>
            <span className="text-odoo-text font-medium block">{trip.eta} ETA</span>
            <span className="text-xs text-odoo-muted">{new Date(trip.startDate).toLocaleDateString()}</span>
          </>
        );
      },
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <div className="text-right">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full" onClick={() => toast.info('Trip options opened')}>
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
      className="pb-10 space-y-6 relative"
    >
      <PageHeader 
        title="Trip Management" 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Trips' }]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm" onClick={handleExport}>
              <FileDown className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="shadow-enterprise" onClick={() => setIsWizardOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Plan New Trip
            </Button>
          </div>
        }
      />

      {/* Trip Dashboard KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Trips', value: 18, icon: Navigation, color: 'text-odoo-primary' },
          { label: 'Planned', value: 42, icon: Map, color: 'text-odoo-info' },
          { label: 'Delayed', value: 3, icon: Clock, color: 'text-odoo-warning' },
          { label: 'Completed (MTD)', value: 154, icon: Flag, color: 'text-odoo-success' },
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
          <div className="p-8 text-center text-odoo-muted animate-pulse">Loading trips...</div>
        ) : (
          <DataTable columns={columns} data={trips} searchPlaceholder="Search by ID, location..." />
        )}
      </Card>

      {/* Trip Wizard Drawer */}
      <AnimatePresence>
        {isWizardOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex justify-end"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-odoo-surface w-full max-w-xl h-full shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-odoo-border flex items-center justify-between">
                <h2 className="text-lg font-bold text-odoo-text">Plan New Trip</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsWizardOpen(false)}>Close</Button>
              </div>
              
              <div className="p-6 border-b border-odoo-border bg-odoo-muted-background/50">
                {/* Stepper */}
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center flex-1 last:flex-none">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${wizardStep >= step ? 'bg-odoo-primary text-white' : 'bg-odoo-border text-odoo-muted'}`}>
                        {step}
                      </div>
                      {step < 4 && <div className={`h-1 flex-1 mx-2 rounded-full ${wizardStep > step ? 'bg-odoo-primary' : 'bg-odoo-border'}`}></div>}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs font-medium text-odoo-muted">
                  <span>Route</span>
                  <span>Vehicle</span>
                  <span>Cargo</span>
                  <span>Confirm</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {wizardStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <h3 className="font-semibold text-odoo-text">Route Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-odoo-muted block mb-1">Origin Hub</label>
                        <input type="text" className="w-full border border-odoo-border rounded-md p-2 text-sm bg-odoo-surface text-odoo-text" placeholder="Search locations..." />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-odoo-muted block mb-1">Destination</label>
                        <input type="text" className="w-full border border-odoo-border rounded-md p-2 text-sm bg-odoo-surface text-odoo-text" placeholder="Search locations..." />
                      </div>
                      <div className="p-4 bg-odoo-info/10 text-odoo-info rounded-md text-sm mt-4 border border-odoo-info/20 flex gap-2">
                        <Activity className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p>Estimated distance: <strong>1,450 km</strong>. ETA: <strong>32 hours</strong> based on current traffic patterns.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {wizardStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <h3 className="font-semibold text-odoo-text">Assign Resource</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-odoo-muted block mb-1">Select Vehicle</label>
                        <select className="w-full border border-odoo-border rounded-md p-2 text-sm bg-odoo-surface text-odoo-text">
                          <option>MH 12 AB 1234 (Available)</option>
                          <option>DL 01 CD 5678 (On Trip - Warning)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-odoo-muted block mb-1">Select Driver</label>
                        <select className="w-full border border-odoo-border rounded-md p-2 text-sm bg-odoo-surface text-odoo-text">
                          <option>Rajesh Kumar (Available)</option>
                          <option>Sunil Das (On Leave - Error)</option>
                        </select>
                      </div>
                      <div className="p-3 bg-odoo-danger/10 text-odoo-danger rounded-md text-sm border border-odoo-danger/20 flex gap-2 items-start mt-2">
                        <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Business Validation Failed</strong>
                          <p className="mt-1">Driver Sunil Das is currently on leave. Vehicle DL 01 CD 5678 is assigned to TRP-0143.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {wizardStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <h3 className="font-semibold text-odoo-text">Cargo Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-odoo-muted block mb-1">Cargo Type</label>
                        <select className="w-full border border-odoo-border rounded-md p-2 text-sm bg-odoo-surface text-odoo-text">
                          <option>FMCG Goods</option>
                          <option>Electronics</option>
                          <option>Automotive Parts</option>
                          <option>Pharmaceuticals (Cold Chain)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-odoo-muted block mb-1">Weight (Tons)</label>
                        <input type="number" className="w-full border border-odoo-border rounded-md p-2 text-sm bg-odoo-surface text-odoo-text" placeholder="0.0" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-odoo-muted block mb-1">Client/Customer</label>
                        <input type="text" className="w-full border border-odoo-border rounded-md p-2 text-sm bg-odoo-surface text-odoo-text" placeholder="Search clients..." />
                      </div>
                    </div>
                  </motion.div>
                )}

                {wizardStep === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <h3 className="font-semibold text-odoo-text">Trip Summary</h3>
                    <div className="bg-odoo-muted-background rounded-lg p-4 border border-odoo-border space-y-3 text-sm">
                      <div className="flex justify-between border-b border-odoo-border pb-2">
                        <span className="text-odoo-muted">Route</span>
                        <span className="font-semibold text-right text-odoo-text">Pune Hub &rarr; Delhi Dist.</span>
                      </div>
                      <div className="flex justify-between border-b border-odoo-border pb-2">
                        <span className="text-odoo-muted">Distance / ETA</span>
                        <span className="font-semibold text-right text-odoo-text">1,450 km / ~32 hours</span>
                      </div>
                      <div className="flex justify-between border-b border-odoo-border pb-2">
                        <span className="text-odoo-muted">Assigned Vehicle</span>
                        <span className="font-semibold text-right text-odoo-text">MH 12 AB 1234 (Available)</span>
                      </div>
                      <div className="flex justify-between border-b border-odoo-border pb-2">
                        <span className="text-odoo-muted">Assigned Driver</span>
                        <span className="font-semibold text-right text-odoo-text">Rajesh Kumar (Available)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-odoo-muted">Estimated Fuel</span>
                        <span className="font-semibold text-right text-odoo-text">380 Liters (₹34,200)</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="p-6 border-t border-odoo-border bg-odoo-muted-background flex justify-between mt-auto">
                <Button variant="outline" onClick={() => setWizardStep(prev => Math.max(1, prev - 1))} disabled={wizardStep === 1}>
                  Back
                </Button>
                {wizardStep < 4 ? (
                  <Button onClick={() => setWizardStep(prev => Math.min(4, prev + 1))} className="shadow-enterprise">
                    Next Step
                  </Button>
                ) : (
                  <Button onClick={() => { 
                    setIsWizardOpen(false); 
                    setWizardStep(1);
                    toast.success('Trip planned successfully!');
                  }} className="bg-odoo-success hover:bg-odoo-success/90 text-white shadow-enterprise">
                    Confirm & Plan Trip
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
