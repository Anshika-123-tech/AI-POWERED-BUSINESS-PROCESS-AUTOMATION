import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { ArrowLeft, User, Lock, Bell, LogOut } from 'lucide-react';

export default function Settings() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card h-16 flex items-center px-6">
        <Link
          to="/customer/dashboard"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
      </header>

      {/* Content */}
      <main className="p-6 max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and settings
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Account Settings */}
          <div className="glass-card">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Account</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.name || ''}
                  disabled
                  className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground disabled:opacity-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground disabled:opacity-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Customer ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={user?.customerId || ''}
                    disabled
                    className="flex-1 px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground font-mono disabled:opacity-50 cursor-not-allowed"
                  />
                  <button className="px-4 py-2.5 border-2 border-border rounded-lg font-medium hover:bg-secondary/50 transition-all">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="glass-card">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Security</h2>
            </div>

            <div className="space-y-3">
              <button className="w-full px-4 py-3 border-2 border-border rounded-lg font-medium text-foreground hover:bg-secondary/50 transition-all text-left">
                Change Password
              </button>
              <button className="w-full px-4 py-3 border-2 border-border rounded-lg font-medium text-foreground hover:bg-secondary/50 transition-all text-left">
                Two-Factor Authentication
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-card">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Notifications</h2>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Email notifications for new updates', defaultChecked: true },
                { label: 'Ticket status change notifications', defaultChecked: true },
                { label: 'Marketing emails', defaultChecked: false },
              ].map((notification, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={notification.defaultChecked}
                    className="w-5 h-5 rounded border-border accent-primary"
                  />
                  <span className="text-foreground">{notification.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="glass-card border-2 border-destructive/20">
            <h2 className="text-xl font-bold text-destructive mb-4">Danger Zone</h2>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to logout?')) {
                  logout();
                  window.location.href = '/auth';
                }
              }}
              className="w-full px-4 py-3 bg-destructive/10 border-2 border-destructive text-destructive rounded-lg font-semibold hover:bg-destructive/20 transition-all inline-flex items-center gap-2 group justify-center"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
