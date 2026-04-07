import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { ArrowRight, Brain, Check, Copy } from 'lucide-react';

type FormStep = 'form' | 'confirmation';

export default function NewCustomer() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState<FormStep>('form');
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const { customerId: newCustomerId } = signup(
      formData.fullName,
      formData.email,
      formData.password
    );

    setCustomerId(newCustomerId);
    setStep('confirmation');
    setLoading(false);
  };

  const handleCopyCustomerId = () => {
    navigator.clipboard.writeText(customerId);
  };

  const handleContinueToDashboard = () => {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Join teams using Workflo AI for smart support automation</p>
        </div>

        {step === 'form' ? (
          /* Sign-up Form */
          <form onSubmit={handleSubmit} className="glass-card">
            {/* Full Name */}
            <div className="mb-6">
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="input-field"
              />
              {errors.fullName && (
                <p className="text-destructive text-sm mt-2">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="input-field"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-2">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-8">
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
              />
              {errors.password && (
                <p className="text-destructive text-sm mt-2">{errors.password}</p>
              )}
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Terms */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        ) : (
          /* Confirmation Screen */
          <div className="glass-card text-center animate-scale-in">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-status-resolved/20 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-status-resolved" />
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Account Created Successfully!
            </h2>
            <p className="text-muted-foreground mb-8">
              Your account is ready to use. Save your Customer ID for future logins.
            </p>

            {/* Customer ID */}
            <div className="bg-secondary/50 rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-3">Your Customer ID</p>
              <div className="flex items-center gap-3 mb-3">
                <code className="flex-1 text-center text-2xl font-mono font-bold text-primary">
                  {customerId}
                </code>
                <button
                  onClick={handleCopyCustomerId}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Click the icon to copy to clipboard</p>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinueToDashboard}
              className="w-full py-3 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 inline-flex items-center justify-center gap-2 group"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
