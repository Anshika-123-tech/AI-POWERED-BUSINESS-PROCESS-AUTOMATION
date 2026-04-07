import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import {
  LogOut,
  Menu,
  X,
  Brain,
  LayoutDashboard,
  Plus,
  ListTodo,
  Settings,
  Ticket,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
} from 'lucide-react';

type NavItem = 'dashboard' | 'create-ticket' | 'my-tickets' | 'settings';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const stats = [
    {
      icon: Ticket,
      label: 'Total Tickets',
      value: '24',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      icon: AlertCircle,
      label: 'Open Tickets',
      value: '8',
      color: 'text-status-open',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
    },
    {
      icon: Clock,
      label: 'In Progress',
      value: '5',
      color: 'text-status-in-progress',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    },
    {
      icon: CheckCircle,
      label: 'Resolved',
      value: '11',
      color: 'text-status-resolved',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
  ];

const recentActivity = [
  {
    id: 1,
    title: 'Ticket #001 created',
    time: new Date(Date.now() - 3600000).toLocaleString(),
  },
  {
    id: 2,
    title: 'Ticket #002 updated',
    time: new Date(Date.now() - 7200000).toLocaleString(),
  },
  {
    id: 3,
    title: 'Ticket #003 resolved',
    time: new Date(Date.now() - 86400000).toLocaleString(),
  },
];
{recentActivity.map((a, i) => (
  <div key={i}>
    <p>{a.title}</p>
    <span>{a.time}</span>
  </div>
))}

  const navigationItems: Array<{ id: NavItem; label: string; icon: typeof LayoutDashboard }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create-ticket', label: 'Create Ticket', icon: Plus },
    { id: 'my-tickets', label: 'My Tickets', icon: ListTodo },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  const handleNavClick = (id: NavItem) => {
    setActiveNav(id);
    if (id === 'create-ticket') {
      navigate('/customer/create-ticket');
    } else if (id === 'my-tickets') {
      navigate('/customer/tickets');
    } else if (id === 'settings') {
      navigate('/customer/settings');
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-card border-r border-border transition-all duration-300 flex flex-col overflow-hidden fixed md:relative md:w-64 h-full z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gradient hidden sm:inline">Workflo AI</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeNav === item.id
                  ? 'gradient-primary text-white shadow-lg'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="px-3 py-2 text-xs">
            <p className="text-muted-foreground mb-1">Customer ID</p>
            <p className="font-mono text-sm font-semibold text-foreground break-all">{user?.customerId}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-destructive hover:bg-destructive/10 rounded-lg font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card h-16 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="flex-1"></div>

          <div className="flex items-center gap-6">
            <button
              className="p-2 hover:bg-secondary rounded-lg transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-status-open rounded-full"></span>
            </button>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name?.split(' ')[0] || 'Customer'}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-secondary rounded-lg transition-colors md:hidden"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-destructive" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-muted-foreground">
                Here's a summary of your support ticket activity
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-card flex flex-col items-start gap-3 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="glass-card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
                    <Link
                      to="/customer/tickets"
                      className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors"
                    >
                      View all →
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {recentActivity.length > 0 ? (
                      recentActivity.map(activity => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0 hover:bg-primary/5 p-2 rounded-lg transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{activity.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No recent activity yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="glass-card">
                  <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>

                  <div className="space-y-3">
                    <Link
                      to="/customer/create-ticket"
                      className="block w-full p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-gradient-primary/10 transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-3">
                        <Plus className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                            New Ticket
                          </p>
                          <p className="text-xs text-muted-foreground">Create a support request</p>
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/customer/tickets"
                      className="block w-full p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-gradient-primary/10 transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-3">
                        <ListTodo className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                            My Tickets
                          </p>
                          <p className="text-xs text-muted-foreground">Track all requests</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="glass-card">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-status-resolved" />
                    <h3 className="font-semibold text-foreground">Your Performance</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs text-muted-foreground font-medium">Resolution Rate</p>
                        <p className="text-sm font-bold text-foreground">92%</p>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-status-resolved to-status-resolved h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs text-muted-foreground font-medium">Avg Response Time</p>
                        <p className="text-sm font-bold text-foreground">2.4h</p>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div className="gradient-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
