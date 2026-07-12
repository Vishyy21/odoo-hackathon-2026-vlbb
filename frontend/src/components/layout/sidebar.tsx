
import { cn } from '../../utils/cn';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { toast } from 'sonner';
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  Map, 
  Wrench, 
  Fuel, 
  Receipt, 
  BarChart3, 
  Bell, 
  Settings,
  LogOut
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Fleet', href: '/vehicles', icon: Truck },
  { label: 'Drivers', href: '/drivers', icon: Users },
  { label: 'Trips', href: '/trips', icon: Map, badge: 12 },
  { label: 'Maintenance', href: '/maintenance', icon: Wrench },
  { label: 'Fuel Logs', href: '/fuel', icon: Fuel },
  { label: 'Expenses', href: '/expenses', icon: Receipt },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Notifications', href: '/notifications', icon: Bell, badge: 5 },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('auth_token');
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (err) {
      toast.error('Failed to log out');
    }
  };

  return (
    <aside className="w-64 bg-odoo-surface border-r border-odoo-border flex flex-col h-screen sticky top-0 left-0 z-20 transition-colors duration-300">
      <div className="h-16 flex items-center px-6 border-b border-odoo-border">
        <div className="flex items-center gap-2 text-odoo-primary">
          <Truck className="h-6 w-6" />
          <span className="font-bold text-lg tracking-tight">Odoo TransitOps</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              'flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive 
                ? 'bg-odoo-primary/10 text-odoo-primary' 
                : 'text-odoo-text hover:bg-odoo-background'
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 opacity-75" />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="bg-odoo-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-odoo-border">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-odoo-danger hover:bg-odoo-danger/10 rounded-md transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
        <div className="mt-4 text-center">
          <span className="text-[10px] text-odoo-muted font-medium uppercase tracking-wider">
            Powered by Odoo Hackathon 2026
          </span>
        </div>
      </div>
    </aside>
  );
};
