
import { Search, Bell, ChevronDown } from 'lucide-react';
import { Input } from '../ui/input';

export const TopNavbar = () => {
  return (
    <header className="h-16 bg-odoo-surface border-b border-odoo-border flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center flex-1">
        <div className="relative w-96 max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-odoo-muted" />
          </div>
          <Input 
            type="text" 
            placeholder="Search vehicles, trips, drivers..." 
            className="pl-10 bg-odoo-background/50 border-transparent focus:bg-odoo-surface focus:border-odoo-primary"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-odoo-muted hover:text-odoo-text hover:bg-odoo-background rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-odoo-danger border-2 border-odoo-surface"></span>
        </button>
        
        <div className="h-8 w-px bg-odoo-border mx-2"></div>
        
        <button className="flex items-center gap-2 hover:bg-odoo-background py-1 px-2 rounded-md transition-colors">
          <div className="h-8 w-8 rounded-full bg-odoo-primary text-white flex items-center justify-center font-semibold text-sm">
            AD
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-odoo-text leading-tight">Admin User</span>
            <span className="text-xs text-odoo-muted leading-tight">TransitOps HQ</span>
          </div>
          <ChevronDown className="h-4 w-4 text-odoo-muted ml-1" />
        </button>
      </div>
    </header>
  );
};
