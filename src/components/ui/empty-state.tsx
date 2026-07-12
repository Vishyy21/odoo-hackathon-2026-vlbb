import React from 'react';

import { cn } from '../../utils/cn';
import type { LucideIcon } from 'lucide-react';
import { Button } from './button';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon: Icon, title, description, actionLabel, onAction, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-odoo-border rounded-enterprise bg-odoo-background/50',
          className
        )}
        {...props}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-odoo-surface shadow-sm mb-4">
          <Icon className="h-8 w-8 text-odoo-primary" />
        </div>
        <h3 className="text-lg font-medium text-odoo-text">{title}</h3>
        <p className="mt-2 text-sm text-odoo-muted max-w-sm">{description}</p>
        {actionLabel && onAction && (
          <div className="mt-6">
            <Button onClick={onAction}>{actionLabel}</Button>
          </div>
        )}
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';
