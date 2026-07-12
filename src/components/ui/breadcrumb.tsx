import React from 'react';

import { cn } from '../../utils/cn';

export interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav className={cn('flex items-center text-sm font-medium text-odoo-muted', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-odoo-border">/</span>}
            {item.href ? (
              <a href={item.href} className="hover:text-odoo-text transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-odoo-text">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
