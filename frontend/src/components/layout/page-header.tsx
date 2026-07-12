import React from 'react';

import { Breadcrumb } from '../ui/breadcrumb';

export interface PageHeaderProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, action }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <Breadcrumb items={breadcrumbs} className="mb-2" />
        <h1 className="text-2xl font-bold text-odoo-text tracking-tight">{title}</h1>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
