import React from 'react';

import { cn } from '../../utils/cn';

export interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LoadingSkeleton = React.forwardRef<HTMLDivElement, LoadingSkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('animate-pulse rounded-md bg-odoo-border/60', className)}
        {...props}
      />
    );
  }
);
LoadingSkeleton.displayName = 'LoadingSkeleton';

export const TableSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <LoadingSkeleton className="h-10 w-64" />
      <LoadingSkeleton className="h-10 w-32" />
    </div>
    <div className="border border-odoo-border rounded-enterprise overflow-hidden">
      <div className="h-12 bg-odoo-background border-b border-odoo-border flex items-center px-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <LoadingSkeleton key={i} className="h-4 w-24 mr-8" />
        ))}
      </div>
      <div className="divide-y divide-odoo-border">
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="h-16 bg-odoo-surface flex items-center px-4">
            {[1, 2, 3, 4, 5].map((col) => (
              <LoadingSkeleton key={col} className="h-4 w-full mr-8 max-w-[120px]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);
