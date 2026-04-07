import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, ArrowRight, Brain, ArrowLeft, UserPlus, LogIn } from 'lucide-react';

type SelectionStep = 'role' | 'customer-type';

export default function SelectUser() {
  const [step, setStep] = useState<SelectionStep>('role');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex flex-col items-center justify-center px-4 py-12">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="relative z-10 max-w-3xl w-full">
        {/* Back Button */}
        {step === 'customer-type' && (
          <button
            onClick={() => setStep('role')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {step === 'role' ? 'Select Your Panel' : 'Choose Your Account Type'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {step === 'role'
              ? 'Choose your role to access the appropriate dashboard'
              : 'Are you a new user or returning customer?'}
          </p>
        </div>

        {/* Content */}
        {step === 'role' ? (
          /* Role Selection */
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Customer Panel Card */}
            <button
              onClick={() => setStep('customer-type')}
              className="group glass-card hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col text-left"
            >
              <div className="mb-6">
                <div className="w-14 h-14 gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
                  <Users className="w-7 h-7 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Customer Panel</h2>
              <p className="text-muted-foreground mb-6 flex-grow">
                Create support tickets, track their status, and manage your account. Get instant notifications and collaborate with our support team.
              </p>
              <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Access Panel
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* HR Panel Card */}
            <Link
              to="/hr/dashboard"
              className="group glass-card hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col"
            >
              <div className="mb-6">
                <div className="w-14 h-14 gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">HR Panel</h2>
              <p className="text-muted-foreground mb-6 flex-grow">
                Manage all customer tickets, view team performance metrics, and monitor support quality. Access advanced analytics and insights.
              </p>
              <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Access Panel
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        ) : (
          /* Customer Type Selection */
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* New Customer Card */}
            <Link
              to="/customer/new"
              className="group glass-card hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col"
            >
              <div className="mb-6">
                <div className="w-14 h-14 gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
                  <UserPlus className="w-7 h-7 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">New User</h2>
              <p className="text-muted-foreground mb-6 flex-grow">
                Create an account to get started with Workflo AI's powerful ticket management and support automation features.
              </p>
              <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Sign Up
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Existing Customer Card */}
            <Link
              to="/customer/existing"
              className="group glass-card hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col"
            >
              <div className="mb-6">
                <div className="w-14 h-14 gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
                  <LogIn className="w-7 h-7 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Existing User</h2>
              <p className="text-muted-foreground mb-6 flex-grow">
                Access your dashboard and manage your support tickets using your Customer ID or email address.
              </p>
              <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Continue
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        )}

        {/* Additional Info */}
        <div className="text-center text-muted-foreground text-sm">
          <p>
            {step === 'role'
              ? 'Need help deciding? '
              : 'Already have an account? '}{' '}
            <a href="#" className="text-primary font-semibold hover:underline">
              {step === 'role' ? 'Learn more about roles' : 'Use your Customer ID'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
