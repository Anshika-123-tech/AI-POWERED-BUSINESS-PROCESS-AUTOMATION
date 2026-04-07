import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  AlertCircle,
  Clock,
  CheckCircle
} from 'lucide-react';

type TicketStatus = 'open' | 'in-progress' | 'resolved';

interface Ticket {
  id: string;
  issueType: string;
  status: TicketStatus;
  createdAt: string;
  message: string;
}

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'status'>('newest');

  // ✅ FETCH FROM BACKEND (FIXED)
  useEffect(() => {
  const storedTickets = JSON.parse(localStorage.getItem("tickets") || "[]");

  console.log("Local tickets:", storedTickets);

  const formatted = storedTickets.map((t: any) => ({
    id: t.id,
    issueType: t.issueType || "general",
    status: t.status || "open",
    createdAt: t.createdAt || new Date().toISOString(),
    message: t.message || "",
  }));

  setTickets(formatted);
  setLoading(false);
}, []);

  // 🔍 FILTER
  let filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || ticket.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // 🔃 SORT
  if (sortBy === 'newest') {
    filteredTickets.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  } else if (sortBy === 'oldest') {
    filteredTickets.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
    );
  } else {
    const order = { open: 0, 'in-progress': 1, resolved: 2 };
    filteredTickets.sort((a, b) => order[a.status] - order[b.status]);
  }

  const getStatusIcon = (status: TicketStatus) => {
    if (status === 'open') return <AlertCircle className="w-4 h-4" />;
    if (status === 'in-progress') return <Clock className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">

      {/* Header */}
      <Link to="/customer/dashboard" className="flex items-center gap-2 mb-4">
        <ArrowLeft /> Back
      </Link>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">My Tickets</h1>

      {/* Search + Create */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link
          to="/customer/create-ticket"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          <Plus /> New
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="status">Status</option>
        </select>
      </div>

      {/* Table */}
      {filteredTickets.length > 0 ? (
        <table className="w-full border">
          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.message}</td>
                <td>{ticket.issueType}</td>
                <td>{ticket.status}</td>
                <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tickets found</p>
      )}
    </div>
  );
}