import React from 'react';

import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        className={cn(
          'flex h-10 w-full rounded-md border bg-odoo-surface px-3 py-2 text-sm text-odoo-text placeholder:text-odoo-muted transition-colors focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-odoo-background disabled:opacity-50',
          error ? 'border-odoo-danger focus:border-odoo-danger focus:ring-odoo-danger' : 'border-odoo-border focus:border-odoo-primary focus:ring-odoo-primary',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border bg-odoo-surface px-3 py-2 text-sm text-odoo-text placeholder:text-odoo-muted transition-colors focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-odoo-background disabled:opacity-50',
          error ? 'border-odoo-danger focus:border-odoo-danger focus:ring-odoo-danger' : 'border-odoo-border focus:border-odoo-primary focus:ring-odoo-primary',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
