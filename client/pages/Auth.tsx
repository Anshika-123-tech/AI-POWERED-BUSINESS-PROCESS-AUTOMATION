import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, Brain } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();

  // Redirect to select-user after a brief moment
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/select-user');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center px-4">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="relative z-10 text-center max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center animate-scale-in">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in">Welcome to Workflo AI</h1>
        <p className="text-lg text-muted-foreground mb-12 animate-fade-in">
          Smart AI-powered ticket management and support automation
        </p>

        {/* Loading animation */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-muted-foreground ml-2">Loading...</span>
          </div>
        </div>

        {/* Manual button */}
        <button
          onClick={() => navigate('/select-user')}
          className="group inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
        >
          Continue
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
