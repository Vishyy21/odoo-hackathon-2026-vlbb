import { useState  } from 'react';
import { PageHeader } from '../components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Bell, User, Shield, Building, Key, Mail, Smartphone, AlertCircle, Palette, Moon, Sun, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'sonner';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('Appearance');
  const { theme, setTheme, primaryColor, setPrimaryColor, radius, setRadius } = useTheme();

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="pb-10 space-y-6"
    >
      <PageHeader 
        title="Organization Settings" 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Settings' }]}
        action={
          <Button className="shadow-enterprise" onClick={handleSave}>Save Changes</Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3 space-y-2">
          {[
            { label: 'Profile', icon: User },
            { label: 'Appearance', icon: Palette },
            { label: 'Organization', icon: Building },
            { label: 'Security', icon: Shield },
            { label: 'Notifications', icon: Bell },
            { label: 'API Keys', icon: Key },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.label
                ? 'bg-odoo-primary text-odoo-primary-foreground shadow-md' 
                : 'text-odoo-text hover:bg-odoo-muted-background'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-9 space-y-6">
          
          {activeTab === 'Appearance' && (
            <Card className="shadow-sm">
              <CardHeader className="border-b border-odoo-border bg-odoo-muted-background">
                <CardTitle>Theme Customizer</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                
                {/* Theme Mode */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-odoo-text">Theme Mode</label>
                  <div className="flex gap-4">
                    {[
                      { id: 'light', label: 'Light', icon: Sun },
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'system', label: 'System', icon: Monitor }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setTheme(mode.id as any)}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 w-28 transition-all ${
                          theme === mode.id ? 'border-odoo-primary bg-odoo-primary/5 text-odoo-primary' : 'border-odoo-border text-odoo-muted hover:border-odoo-primary/50'
                        }`}
                      >
                        <mode.icon className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Color */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-odoo-text">Primary Color</label>
                  <div className="flex gap-3">
                    {[
                      { id: '#714B67', label: 'Odoo Purple' },
                      { id: '#017E84', label: 'Teal' },
                      { id: '#2563EB', label: 'Blue' },
                      { id: '#16A34A', label: 'Green' },
                      { id: '#DC2626', label: 'Red' },
                      { id: '#EAB308', label: 'Yellow' }
                    ].map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setPrimaryColor(color.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${primaryColor === color.id ? 'ring-2 ring-offset-2 ring-odoo-text' : ''}`}
                        style={{ backgroundColor: color.id }}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Border Radius */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-odoo-text">Border Radius ({radius}px)</label>
                  <div className="flex gap-4">
                    {[0, 4, 8, 10, 16].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRadius(r)}
                        className={`px-4 py-2 border-2 text-sm font-medium transition-all ${
                          radius === r ? 'border-odoo-primary text-odoo-primary' : 'border-odoo-border text-odoo-muted hover:border-odoo-primary/50'
                        }`}
                        style={{ borderRadius: `${r}px` }}
                      >
                        {r}px
                      </button>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

          {activeTab === 'Profile' && (
            <>
              <Card className="shadow-sm">
                <CardHeader className="border-b border-odoo-border bg-odoo-muted-background">
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-odoo-border">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-odoo-primary-foreground text-2xl font-bold" style={{ backgroundColor: 'var(--color-primary)' }}>
                      VA
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="mb-2" onClick={() => toast.info('Avatar upload opened')}>Change Avatar</Button>
                      <p className="text-xs text-odoo-muted">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-odoo-text">First Name</label>
                      <input type="text" defaultValue="Vishesh" className="w-full border border-odoo-border bg-odoo-background text-odoo-text rounded-md p-2.5 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-odoo-text">Last Name</label>
                      <input type="text" defaultValue="Admin" className="w-full border border-odoo-border bg-odoo-background text-odoo-text rounded-md p-2.5 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-odoo-text flex items-center gap-2"><Mail className="w-4 h-4"/> Email Address</label>
                      <input type="email" defaultValue="vishesh@transitops.com" className="w-full border border-odoo-border rounded-md p-2.5 text-sm bg-odoo-muted-background text-odoo-muted" readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-odoo-text flex items-center gap-2"><Smartphone className="w-4 h-4"/> Phone Number</label>
                      <input type="tel" defaultValue="+91 98765 43210" className="w-full border border-odoo-border bg-odoo-background text-odoo-text rounded-md p-2.5 text-sm" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-odoo-danger/30">
                <CardHeader className="bg-odoo-danger/10 border-b border-odoo-danger/20">
                  <CardTitle className="text-odoo-danger flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-odoo-text">Deactivate Account</h4>
                    <p className="text-sm text-odoo-muted mt-1">This action cannot be undone. All data will be permanently lost.</p>
                  </div>
                  <Button variant="outline" className="text-odoo-danger border-odoo-danger/30 hover:bg-odoo-danger hover:text-white" onClick={() => toast.error('Account deactivation requested')}>Deactivate</Button>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab !== 'Appearance' && activeTab !== 'Profile' && (
            <Card className="shadow-sm">
              <CardContent className="p-12 text-center text-odoo-muted">
                <p>Content for {activeTab} will appear here.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
};
