import { useState, useEffect } from 'react';
import { PageHeader } from '../components/layout/page-header';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { NotificationService } from '../services/notification.service';
import { toast } from 'sonner';

export const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    NotificationService.getNotifications().then((data: any) => {
      setNotifications(data);
      setIsLoading(false);
    }).catch(() => {
      toast.error('Failed to load notifications');
      setIsLoading(false);
    });
  }, []);

  const handleMarkAllRead = () => {
    toast.success('All notifications marked as read.');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="pb-10 space-y-6 max-w-4xl mx-auto"
    >
      <PageHeader 
        title="Notification Center" 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Notifications' }]}
        action={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm" onClick={handleMarkAllRead}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark All as Read
            </Button>
            <Button variant="outline" size="sm" className="shadow-sm" onClick={() => toast.info('Settings opened')}>
              <SettingsIcon className="w-4 h-4" />
            </Button>
          </div>
        }
      />

      <Card className="shadow-sm border-0 p-4">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-odoo-border bg-odoo-muted-background/50">
            <div className="flex gap-4">
              <button className="text-sm font-bold text-odoo-primary border-b-2 border-odoo-primary pb-1 px-1">All Alerts ({notifications.length})</button>
              <button className="text-sm font-medium text-odoo-muted hover:text-odoo-text transition-colors pb-1 px-1">Unread (4)</button>
              <button className="text-sm font-medium text-odoo-muted hover:text-odoo-text transition-colors pb-1 px-1">Critical (1)</button>
            </div>
          </div>
          <div className="divide-y divide-odoo-border">
            {isLoading ? (
              <div className="p-8 text-center text-odoo-muted animate-pulse">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-odoo-muted">No notifications found.</div>
            ) : (
              notifications.map(notification => {
                const Icon = notification.icon;
                return (
                  <div key={notification.id} className={`p-5 flex gap-4 hover:bg-odoo-muted-background transition-colors cursor-pointer ${notification.type === 'critical' ? 'bg-red-50/20' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-odoo-text">{notification.title}</h4>
                        <span className="text-xs font-semibold text-odoo-muted">{notification.time}</span>
                      </div>
                      <p className="text-sm text-odoo-muted">{notification.message}</p>
                      
                      {notification.type === 'critical' && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="bg-red-600 hover:bg-red-700 shadow-sm h-8" onClick={() => toast.info('Document opened')}>Review Document</Button>
                          <Button variant="outline" size="sm" className="h-8" onClick={() => toast.info('Dismissed')}>Dismiss</Button>
                        </div>
                      )}
                      {notification.type === 'warning' && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="h-8 bg-amber-500 hover:bg-amber-600 shadow-sm" onClick={() => toast.info('Route opened')}>View Route</Button>
                        </div>
                      )}
                    </div>
                    <div className="w-2 h-2 bg-odoo-primary rounded-full mt-2"></div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
