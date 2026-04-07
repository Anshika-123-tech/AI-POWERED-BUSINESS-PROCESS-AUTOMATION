import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MessageCircle } from 'lucide-react';

export default function TicketDetails() {
  const { id } = useParams<{ id: string }>();

  // Load ticket from localStorage
  const allTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
  const ticket = allTickets.find((t: any) => t.id === id);

  if (!ticket) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Ticket Not Found</h1>
          <p className="text-muted-foreground mb-6">The ticket you're looking for doesn't exist.</p>
          <Link
            to="/customer/tickets"
            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-all"
          >
            Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-50 dark:bg-red-950/20 text-status-open';
      case 'in-progress':
        return 'bg-amber-50 dark:bg-amber-950/20 text-status-in-progress';
      case 'resolved':
        return 'bg-green-50 dark:bg-green-950/20 text-status-resolved';
      default:
        return 'bg-gray-50 dark:bg-gray-950/20 text-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card h-16 flex items-center px-6">
        <Link
          to="/customer/tickets"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Tickets</span>
        </Link>
      </header>

      {/* Content */}
      <main className="p-6 max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{ticket.id}</h1>
              <p className="text-muted-foreground">{ticket.message}</p>
            </div>
            <span className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${getStatusColor(ticket.status)}`}>
              {getStatusLabel(ticket.status)}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Issue Type */}
          <div className="glass-card">
            <p className="text-sm text-muted-foreground mb-1">Issue Type</p>
            <p className="text-lg font-semibold text-foreground capitalize">{ticket.issueType}</p>
          </div>

          {/* Created Date */}
          <div className="glass-card">
            <p className="text-sm text-muted-foreground mb-1">Created</p>
            <p className="text-lg font-semibold text-foreground">
              {new Date(ticket.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Status */}
          <div className="glass-card">
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <p className="text-lg font-semibold text-foreground capitalize">{getStatusLabel(ticket.status)}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Description */}
          <div className="lg:col-span-2">
            <div className="glass-card">
              <h2 className="text-xl font-bold text-foreground mb-4">Issue Description</h2>
              <p className="text-foreground leading-relaxed">{ticket.message}</p>
            </div>

            {/* Timeline / Updates */}
            <div className="glass-card mt-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Updates</h2>

              <div className="space-y-6">
                {/* Initial submission */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary mt-1.5"></div>
                    <div className="w-0.5 h-12 bg-border"></div>
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-foreground">Ticket Created</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                    <p className="text-foreground mt-2 text-sm">Your support ticket has been created and assigned to our team.</p>
                  </div>
                </div>

                {/* Status update based on ticket status */}
                {ticket.status !== 'open' && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-status-in-progress"></div>
                      <div className="w-0.5 h-12 bg-border"></div>
                    </div>
                    <div className="pb-6">
                      <p className="font-semibold text-foreground">Status Updated</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                      <p className="text-foreground mt-2 text-sm">Your ticket is now being investigated by our support team.</p>
                    </div>
                  </div>
                )}

                {ticket.status === 'resolved' && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-status-resolved"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Ticket Resolved</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                      <p className="text-foreground mt-2 text-sm">Thank you for contacting us. Your issue has been resolved.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Contact Information */}
            <div className="glass-card mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Name</p>
                  <p className="font-medium text-foreground">{ticket.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-foreground break-all">{ticket.email}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Actions</h3>
              <button className="w-full px-4 py-2 border-2 border-border text-foreground rounded-lg font-medium hover:bg-secondary/50 transition-all mb-2">
                <MessageCircle className="w-4 h-4 inline-block mr-2" />
                Add Comment
              </button>
              <button className="w-full px-4 py-2 border-2 border-destructive text-destructive rounded-lg font-medium hover:bg-destructive/10 transition-all">
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
