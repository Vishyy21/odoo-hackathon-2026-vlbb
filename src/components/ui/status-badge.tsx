import React from 'react';

import { cn } from '../../utils/cn';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'success' | 'warning' | 'danger' | 'info' | 'default';
  label: string;
}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, label, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
          {
            'bg-odoo-success/10 text-odoo-success border-odoo-success/20': status === 'success',
            'bg-odoo-warning/10 text-odoo-warning border-odoo-warning/20': status === 'warning',
            'bg-odoo-danger/10 text-odoo-danger border-odoo-danger/20': status === 'danger',
            'bg-odoo-info/10 text-odoo-info border-odoo-info/20': status === 'info',
            'bg-odoo-muted-background text-odoo-text border-gray-200': status === 'default',
          },
          className
        )}
        {...props}
      >
        {label}
      </span>
    );
  }
);
StatusBadge.displayName = 'StatusBadge';
