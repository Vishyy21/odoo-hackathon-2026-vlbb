import React from 'react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { AuthService } from '../services/auth.service';

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    
    try {
      const response = await AuthService.login({ email, password });
      // Depending on axios interceptor, response might directly be data
      const token = (response as any)?.token || (response as any)?.data?.token;
      if (token) {
        localStorage.setItem('auth_token', token);
        navigate('/');
      } else {
        setError('Login failed, no token received.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };


  return (
    <div className="min-h-screen flex bg-odoo-background">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-odoo-primary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 p-12 text-white max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <Truck className="h-10 w-10" />
            <h1 className="text-4xl font-bold tracking-tight">Odoo TransitOps</h1>
          </div>
          <h2 className="text-2xl font-medium leading-snug mb-4 text-white/90">
            Smart Fleet & Transport Operations Platform
          </h2>
          <p className="text-lg text-white/70">
            Enterprise-grade management for modern logistics. Streamline your fleet, drivers, and trips all in one place.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-odoo-surface p-8 rounded-enterprise shadow-enterprise-md border border-odoo-border">
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:hidden mb-6">
              <div className="h-12 w-12 rounded-full bg-odoo-primary/10 flex items-center justify-center">
                <Truck className="h-6 w-6 text-odoo-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-odoo-text">Sign in to your account</h2>
            <p className="mt-2 text-sm text-odoo-muted">
              Enter your enterprise credentials to access the platform.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm border border-red-200">{error}</div>}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-odoo-text mb-1">
                  Email address
                </label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  required 
                  placeholder="admin@transitops.com"
                  defaultValue="admin@transitops.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-odoo-text mb-1">
                  Password
                </label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  autoComplete="current-password" 
                  required 
                  defaultValue="password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-odoo-primary focus:ring-odoo-primary border-odoo-border rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-odoo-muted">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-odoo-primary hover:text-odoo-secondary">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" size="lg">
                Sign in to Odoo TransitOps
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-xs text-odoo-muted">
            Powered by Odoo Hackathon 2026
          </div>
        </div>
      </div>
    </div>
  );
};
