
import { PageHeader } from '../components/layout/page-header';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { FileDown, FileText, PieChart, TrendingUp, BarChart2, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export const Reports = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="pb-10 space-y-6"
    >
      <PageHeader 
        title="Executive Reports" 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Reports' }]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Fleet Utilization Report', desc: 'Detailed breakdown of active vs idle time.', icon: PieChart, color: 'bg-purple-100 text-purple-600' },
          { title: 'Revenue & Cost Analysis', desc: 'MTD profit margins and expense tracking.', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
          { title: 'Driver Performance', desc: 'Safety scores, on-time delivery rates.', icon: BarChart2, color: 'bg-blue-100 text-blue-600' },
          { title: 'Maintenance Logs', desc: 'Historical maintenance and repair costs.', icon: FileText, color: 'bg-amber-100 text-amber-600' },
        ].map((report, i) => (
          <Card key={i} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6 flex flex-col h-full">
              <div className={`w-12 h-12 rounded-lg ${report.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <report.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-odoo-text mb-2">{report.title}</h3>
              <p className="text-sm text-odoo-muted flex-1">{report.desc}</p>
              <Button variant="outline" className="w-full mt-4 justify-between group-hover:border-odoo-primary group-hover:text-odoo-primary transition-colors">
                Generate <FileDown className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm mt-8 border-dashed border-2 bg-odoo-muted-background/50">
        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
            <PieChart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-odoo-text mb-2">Custom Power BI Integration</h3>
          <p className="text-odoo-muted max-w-md mb-6">Connect your enterprise Power BI account to generate advanced operational intelligence dashboards directly within Odoo TransitOps.</p>
          <Button className="shadow-enterprise">Connect Data Source</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
