import { useState, useEffect, useMemo  } from 'react';
import { PageHeader } from '../components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { StatusBadge } from '../components/ui/status-badge';
import { Plus, FileDown, MoreVertical, IndianRupee, FileText, CreditCard, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { ExpenseService } from '../services/expense.service';
import type { Expense } from '../mocks/expense.mock';
import { toast } from 'sonner';
import { DataTable } from '../components/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';


const expenseData = [
  { name: 'Week 1', tolls: 15000, food: 22000, repairs: 8000 },
  { name: 'Week 2', tolls: 18000, food: 25000, repairs: 12000 },
  { name: 'Week 3', tolls: 14000, food: 18000, repairs: 5000 },
  { name: 'Week 4', tolls: 22000, food: 28000, repairs: 19000 },
];

export const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ExpenseService.getExpenses().then((data) => {
      setExpenses(data);
      setIsLoading(false);
    }).catch(() => {
      toast.error('Failed to fetch expenses');
      setIsLoading(false);
    });
  }, []);

  const handleExport = () => {
    toast.info('Downloading CSV export...');
  };

  const columns = useMemo<ColumnDef<Expense>[]>(() => [
    {
      accessorKey: 'category',
      header: 'Category / Amount',
      cell: ({ row }) => {
        const exp = row.original;
        return (
          <>
            <span className="font-semibold text-odoo-text block">{exp.category}</span>
            <span className="text-xs text-odoo-primary font-bold">₹{exp.amount.toLocaleString()}</span> <span className="text-xs text-odoo-muted">({exp.tripId})</span>
          </>
        );
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => <span className="text-odoo-text">{row.original.date}</span>,
    },
    {
      accessorKey: 'driverId',
      header: 'Driver',
      cell: ({ row }) => <span className="text-odoo-text">{row.original.driverId}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const exp = row.original;
        return (
          <StatusBadge status={exp.status.toLowerCase().replace(' ', '-') as any} label={exp.status} />
        );
      },
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <div className="text-right">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full" onClick={() => toast.info('Expense options opened')}>
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
        title="Expense Management" 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Expenses' }]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm" onClick={handleExport}>
              <FileDown className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="shadow-enterprise" onClick={() => toast.info('New Expense dialog opened.')}>
              <Plus className="w-4 h-4 mr-2" />
              New Expense
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Expenses (MTD)', value: '₹4.2L', icon: IndianRupee, color: 'text-odoo-primary' },
          { label: 'Pending Approval', value: '₹45k', icon: FileText, color: 'text-odoo-warning' },
          { label: 'Tolls & Taxes', value: '₹1.1L', icon: CreditCard, color: 'text-odoo-info' },
          { label: 'Avg per Trip', value: '₹12,400', icon: PieChart, color: 'text-odoo-success' },
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-12 shadow-sm">
          <CardHeader>
            <CardTitle>Expense Trends (Monthly)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dx={-10} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="tolls" name="Tolls" stackId="a" fill="#3B82F6" radius={[0, 0, 4, 4]} />
                <Bar dataKey="food" name="Food & Lodging" stackId="a" fill="#F59E0B" />
                <Bar dataKey="repairs" name="Repairs" stackId="a" fill="#714B67" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-12 shadow-sm p-4">
          <CardHeader className="px-0 pt-0 pb-4">
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          {isLoading ? (
            <div className="p-8 text-center text-odoo-muted animate-pulse">Loading expenses...</div>
          ) : (
            <DataTable columns={columns} data={expenses} searchPlaceholder="Search expenses by category or trip ID..." />
          )}
        </Card>
      </div>
    </motion.div>
  );
};
