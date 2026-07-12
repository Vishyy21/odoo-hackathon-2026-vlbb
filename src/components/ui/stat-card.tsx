import React from 'react';

import { Card, CardContent } from './card';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  sparkline?: React.ReactNode;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, title, value, icon: Icon, trend, sparkline, ...props }, ref) => {
    return (
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Card ref={ref} className={cn("overflow-hidden relative group", className)} {...props}>
          <CardContent className="p-5 flex flex-col h-full relative z-10 bg-odoo-surface group-hover:bg-odoo-background/10 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium text-odoo-muted truncate">{title}</p>
                <h3 className="text-2xl font-bold text-odoo-text mt-1">{value}</h3>
                {trend && (
                  <p className={cn("text-xs mt-2 font-semibold flex items-center gap-1", trend.isPositive ? "text-odoo-success" : "text-odoo-danger")}>
                    <span className={cn("px-1.5 py-0.5 rounded-sm", trend.isPositive ? "bg-odoo-success/10" : "bg-odoo-danger/10")}>
                      {trend.isPositive ? "+" : "-"}{trend.value}%
                    </span>
                    <span className="text-odoo-muted font-normal ml-1">vs last month</span>
                  </p>
                )}
              </div>
              <div className="p-2.5 bg-odoo-primary/10 rounded-lg shrink-0">
                <Icon className="h-5 w-5 text-odoo-primary" />
              </div>
            </div>
            
            {sparkline && (
              <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 pt-4 pointer-events-none z-0">
                {sparkline}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);
StatCard.displayName = 'StatCard';
