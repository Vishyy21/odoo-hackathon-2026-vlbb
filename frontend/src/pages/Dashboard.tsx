
import { PageHeader } from '../components/layout/page-header';
import { StatCard } from '../components/ui/stat-card';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Truck, Users, Map, Wrench, AlertCircle, Droplet, TrendingUp, IndianRupee, Activity, Navigation, FileText, Bell } from 'lucide-react';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/ui/status-badge';
import { mockDashboardData } from '../lib/mock-data';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, CartesianGrid, Legend } from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-odoo-surface border border-odoo-border p-3 rounded-lg shadow-enterprise-md text-sm z-50 relative">
        <p className="font-semibold text-odoo-text mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const Dashboard = () => {
  const { kpis, recentTrips, alerts, timeline, charts } = mockDashboardData;

  const sparklineData = [
    { value: 10 }, { value: 15 }, { value: 8 }, { value: 20 }, { value: 25 }, { value: 18 }, { value: 30 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="pb-10 space-y-6"
    >
      <PageHeader 
        title="Operations Command Center" 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="hidden sm:flex shadow-sm hover:shadow-md transition-shadow">
              <FileText className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="shadow-enterprise hover:shadow-enterprise-md transition-shadow">
              <Map className="w-4 h-4 mr-2" />
              New Trip (Ctrl+K)
            </Button>
          </div>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          title="Total Fleet" 
          value={kpis.totalFleet.value} 
          icon={Truck} 
          trend={{ value: kpis.totalFleet.trend, isPositive: kpis.totalFleet.isPositive }}
          sparkline={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line type="monotone" dataKey="value" stroke="#714B67" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          }
        />
        <StatCard 
          title="Active Trips" 
          value={kpis.activeTrips.value} 
          icon={Map} 
          trend={{ value: kpis.activeTrips.trend, isPositive: kpis.activeTrips.isPositive }}
          sparkline={
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.trips}>
                <Area type="monotone" dataKey="completed" stroke="#22C55E" fill="#22C55E" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          }
        />
        <StatCard 
          title="Drivers Available" 
          value={kpis.driversAvailable.value} 
          icon={Users} 
          trend={{ value: kpis.driversAvailable.trend, isPositive: kpis.driversAvailable.isPositive }}
          sparkline={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          }
        />
        <StatCard 
          title="Fleet Health" 
          value={kpis.fleetHealth.value + '%'} 
          icon={Activity} 
          trend={{ value: kpis.fleetHealth.trend, isPositive: kpis.fleetHealth.isPositive }}
          sparkline={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          }
        />
        <StatCard 
          title="Fuel Cost (MTD)" 
          value={kpis.fuelCost.value} 
          icon={Droplet} 
          trend={{ value: kpis.fuelCost.trend, isPositive: kpis.fuelCost.isPositive }}
          sparkline={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.fuel}>
                <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          }
        />
        <StatCard 
          title="Maintenance Cost" 
          value={kpis.maintenanceCost.value} 
          icon={Wrench} 
          trend={{ value: kpis.maintenanceCost.trend, isPositive: kpis.maintenanceCost.isPositive }}
          sparkline={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          }
        />
        <StatCard 
          title="Revenue (MTD)" 
          value={kpis.revenue.value} 
          icon={IndianRupee} 
          trend={{ value: kpis.revenue.trend, isPositive: kpis.revenue.isPositive }}
          sparkline={
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          }
        />
        <StatCard 
          title="Efficiency Score" 
          value={kpis.efficiency.value + '%'} 
          icon={TrendingUp} 
          trend={{ value: kpis.efficiency.trend, isPositive: kpis.efficiency.isPositive }}
          sparkline={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line type="monotone" dataKey="value" stroke="#714B67" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          }
        />
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Trips Overview</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">This Week</Button>
            </div>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.trips} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#714B67" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#714B67" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDelayed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="completed" name="Completed" stroke="#714B67" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" />
                <Area type="monotone" dataKey="delayed" name="Delayed" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorDelayed)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="flex-1 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Fleet Utilization</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] flex flex-col justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.utilization}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {charts.utilization.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {charts.utilization.map((entry, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-odoo-text">
                    <span className="h-3 w-3 rounded-full block" style={{ backgroundColor: entry.color }} />
                    {entry.name}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Operational Feed & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden flex flex-col shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-odoo-border bg-odoo-muted-background/50">
            <CardTitle className="text-base font-semibold">Active Trips</CardTitle>
            <Button variant="ghost" size="sm" className="text-odoo-primary">View All Trips &rarr;</Button>
          </CardHeader>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-odoo-muted bg-odoo-surface uppercase border-b border-odoo-border">
                <tr>
                  <th className="px-6 py-3 font-semibold">Trip ID</th>
                  <th className="px-6 py-3 font-semibold">Destination</th>
                  <th className="px-6 py-3 font-semibold">Driver</th>
                  <th className="px-6 py-3 font-semibold">Vehicle</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-odoo-border bg-odoo-surface">
                {recentTrips.map((trip) => (
                  <motion.tr 
                    key={trip.id} 
                    className="hover:bg-odoo-muted-background transition-colors cursor-pointer"
                    whileHover={{ scale: 1.001 }}
                  >
                    <td className="px-6 py-4 font-semibold text-odoo-primary">{trip.id}</td>
                    <td className="px-6 py-4 text-odoo-text font-medium flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-odoo-muted" />
                      {trip.destination}
                    </td>
                    <td className="px-6 py-4 text-odoo-text">{trip.driver}</td>
                    <td className="px-6 py-4 text-odoo-muted">{trip.vehicle}</td>
                    <td className="px-6 py-4">
                      <StatusBadge 
                        status={trip.status.toLowerCase().replace(' ', '-') as any} 
                        label={trip.status.charAt(0).toUpperCase() + trip.status.slice(1)} 
                      />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="flex-1 shadow-sm">
            <CardHeader className="border-b border-odoo-border bg-odoo-muted-background/50">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bell className="w-4 h-4 text-odoo-primary" />
                Alerts & Warnings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-odoo-border">
                {alerts.map(alert => (
                  <div key={alert.id} className="p-4 flex gap-3 hover:bg-odoo-muted-background transition-colors cursor-pointer">
                    <div className={`mt-0.5 rounded-full p-1.5 h-fit ${
                      alert.type === 'critical' ? 'bg-red-100 text-red-600' : 
                      alert.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-odoo-text">{alert.title}</h4>
                      <p className="text-xs text-odoo-muted mt-1 leading-relaxed">{alert.description}</p>
                      <span className="text-[10px] text-odoo-muted font-medium mt-2 block">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Activity Timeline */}
      <Card className="shadow-sm">
        <CardHeader className="border-b border-odoo-border bg-odoo-muted-background/50">
          <CardTitle className="text-base font-semibold">Activity Feed</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative border-l border-gray-200 ml-3 space-y-6">
            {timeline.map((item) => (
              <div key={item.id} className="relative pl-6">
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${
                  item.type === 'success' ? 'bg-green-500' :
                  item.type === 'warning' ? 'bg-amber-500' :
                  item.type === 'primary' ? 'bg-odoo-primary' : 'bg-blue-500'
                }`} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-odoo-text">{item.title}</h4>
                    <span className="text-xs text-odoo-muted">• {item.time}</span>
                  </div>
                  <p className="text-sm text-odoo-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
