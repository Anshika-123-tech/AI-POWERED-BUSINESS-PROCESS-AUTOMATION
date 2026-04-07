import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Zap, Shield, BarChart3, Users, Brain } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Workflo AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/auth"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth"
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Gradient background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="relative">
            {/* Hero Content */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 leading-tight">
                <span className="block">Smart AI-Powered</span>
                <span className="text-gradient">Ticket Management</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Workflo AI automates customer support with intelligent ticket classification, workflow automation, and real-time collaboration. Scale your support team without the overhead.
              </p>

              <div className="flex gap-4 justify-center mb-12 flex-wrap">
                <Link
                  to="/auth"
                  className="px-8 py-3 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 inline-flex items-center gap-2 group shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#features"
                  className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all duration-200"
                >
                  Learn More
                </a>
              </div>

              {/* Hero Image / Graphic */}
              <div className="glass rounded-2xl p-8 mb-16 animate-slide-in">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 rounded-xl aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-primary mx-auto mb-4 opacity-30" />
                    <p className="text-muted-foreground">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Powerful AI Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to scale your customer support intelligently</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI Ticket Classification',
                description: 'Automatically categorize and prioritize tickets using advanced machine learning algorithms.',
              },
              {
                icon: Zap,
                title: 'Automated Workflows',
                description: 'n8n integration for powerful workflow automation. Route tickets intelligently and auto-assign.',
              },
              {
                icon: MessageCircle,
                title: 'Real-time Notifications',
                description: 'Instant alerts and updates keep your team in sync and customers informed every step of the way.',
              },
              {
                icon: BarChart3,
                title: 'Customer Dashboard',
                description: 'Intuitive customer portal for ticket tracking, updates, and self-service support options.',
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Seamless collaboration tools for your support team to resolve issues together faster.',
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-grade encryption and compliance certifications for complete data protection.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="glass-card group hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Workflo AI?</h2>
          </div>
          <div className="glass rounded-2xl p-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Workflo AI helps businesses automate their customer support operations using cutting-edge AI and intelligent workflow automation.
              By combining AI-powered ticket classification with n8n integration, we enable your support team to focus on what matters most —
              delivering exceptional customer experiences. Scale your support without scaling your headcount.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto gradient-accent rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Automate Your Support?</h2>
          <p className="text-lg text-white/90 mb-8">Start your free trial today. No credit card required.</p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 group shadow-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gradient">Workflo AI</span>
              </div>
              <p className="text-sm text-muted-foreground">Smart customer support automation powered by AI.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <div className="space-y-2">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">Pricing</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">Security</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">Contact</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">Blog</a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2026 Workflo AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
