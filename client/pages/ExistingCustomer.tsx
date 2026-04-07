import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { ArrowRight, Brain, AlertCircle } from 'lucide-react';

export default function ExistingCustomer() {
  const navigate = useNavigate();
  const { login, validateCustomerId } = useAuth();
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerId(e.target.value.toUpperCase());
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!customerId.trim()) {
      setError('Please enter your Customer ID');
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!validateCustomerId(customerId)) {
      setError('Invalid Customer ID. Please check and try again.');
      setLoading(false);
      return;
    }

    // Login with the customer ID
    login(customerId);

    // Navigate to dashboard
    navigate('/customer/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center px-4 py-12">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Access your Workflo AI dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Customer ID Input */}
          <div className="mb-8">
            <label htmlFor="customerId" className="block text-sm font-medium text-foreground mb-2">
              Customer ID
            </label>
            <input
              id="customerId"
              type="text"
              value={customerId}
              onChange={handleChange}
              placeholder="CUST-2026-XXXX"
              className={`input-field ${error ? 'border-destructive focus:ring-destructive' : ''}`}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Enter the Customer ID you received when creating your account
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">New to Workflo AI?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <a
            href="/customer/new"
            className="block w-full text-center py-3 border-2 border-border text-foreground rounded-lg font-semibold hover:bg-secondary/50 transition-all duration-200"
          >
            Create an Account
          </a>
        </form>

        {/* Help Text */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Lost your Customer ID?{' '}
          <a href="#" className="text-primary font-semibold hover:underline">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
