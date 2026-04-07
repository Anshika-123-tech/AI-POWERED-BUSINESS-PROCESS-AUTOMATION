import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { ArrowLeft } from 'lucide-react';

type FormStep = 'form' | 'success';

export default function CreateTicket() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState<FormStep>('form');
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    issueType: 'technical',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please describe your issue';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ FINAL FIXED SUBMIT FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      let newTicketId = `TKT-${Date.now().toString().slice(-6)}`;

      // 🔁 TRY API (OPTIONAL)
      try {
        const res = await fetch("https://n8n18.app.n8n.cloud/webhook/b51b8c46-e4e2-4923-93cb-d8a096cd96ab", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id: user?.customerId,
            title: formData.message,
            description:formData.message,
            category:formData.issueType,
          }),
        });

        const result = await res.json();
        console.log("API response:", result);

        if (result?.ticket_id) {
          newTicketId = result.ticket_id;
        }
      } catch (err) {
        console.warn("API failed, using localStorage only");
      }

      // ✅ ALWAYS SAVE LOCALLY
      const existingTickets = JSON.parse(localStorage.getItem("tickets") || "[]");

      const newTicket = {
        id: newTicketId,
        customerId: user?.customerId,
        name: formData.name,
        email: formData.email,
        issueType: formData.issueType,
        message: formData.message,
        status: "open",
        createdAt: new Date().toISOString(),
      };

      existingTickets.push(newTicket);
      localStorage.setItem("tickets", JSON.stringify(existingTickets));

      console.log("Saved locally:", newTicket);

      setTicketId(newTicketId);
      setStep("success");

    } catch (error) {
      console.error(error);
      setErrors({ submit: "Failed to create ticket." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card h-16 flex items-center px-6">
        <button
          onClick={() => navigate('/customer/dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </header>

      <main className="p-6 max-w-2xl mx-auto">
        {step === 'form' ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Create Ticket</h1>

            {errors.submit && <p className="text-red-500">{errors.submit}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2 w-full"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 w-full"
              />

              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                className="border p-2 w-full"
              >
                <option value="billing">Billing</option>
                <option value="technical">Technical</option>
                <option value="general">General</option>
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe issue"
                className="border p-2 w-full"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 w-full"
              >
                {loading ? "Creating..." : "Create Ticket"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold">Success 🎉</h2>
            <p>Ticket ID: {ticketId}</p>

            <button
              onClick={() => navigate('/customer/tickets')}
              className="mt-4 bg-green-500 text-white px-4 py-2"
            >
              View Tickets
            </button>
          </div>
        )}
      </main>
    </div>
  );
}