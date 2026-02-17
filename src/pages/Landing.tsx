import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, TrendingUp, PiggyBank, Zap, CheckCircle2, Lock, Eye, Smartphone, BarChart3, Users, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const rupeeSetuLogo = '/Rupee-setu-logo.png';

const Landing = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, don't render landing page (will redirect)
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/30 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 hover:opacity-80 transition-opacity cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-white shadow-md">
              <img src={rupeeSetuLogo} alt="Rupee-Setu" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl truncate">Rupee-Setu</span>
          </div>
          <Button onClick={() => navigate('/auth')} variant="outline" className="text-xs sm:text-sm px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
            Sign In
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4">
        {/* Main Hero */}
        <main className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-8 sm:py-12 lg:py-16">
          <div className="flex-1 text-center lg:text-left space-y-6 animate-slide-up">
            <Badge className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              <Shield className="w-3 h-3" />
              No Bank Account Required • 100% Private
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Know Exactly Where
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
                Your Money Goes
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Built for <span className="font-semibold text-foreground">students & young professionals</span> who want simple expense tracking without linking bank accounts or sharing financial data.
            </p>
            
            {/* Key differentiators */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-base">Start tracking in 30 seconds — no setup needed</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-base">Zero ads, zero tracking, zero data selling</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-base">Free forever — built by students, for students</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="gap-2 text-base h-12 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                Start Tracking Free <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-base h-12 px-8 hover:bg-secondary transition-all duration-300"
              >
                See How It Works
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground pt-2">
              No credit card • No bank linking • No hidden fees
            </p>
          </div>
          
          <div className="flex-1 flex justify-center w-full relative min-h-[500px] lg:min-h-[600px]">
            <div className="relative w-full max-w-3xl h-full">
              {/* Main background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-income/15 to-expense/15 rounded-3xl blur-3xl opacity-60 animate-pulse" />
              
              {/* Floating Feature Badges - Top */}
              <div className="absolute -top-4 left-0 lg:left-8 z-20 animate-float">
                <div className="bg-card/95 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-income/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-income" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Saved</p>
                      <p className="text-lg font-bold text-income">₹15,280</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Feature Badge - Top Right */}
              <div className="absolute -top-2 right-0 lg:right-12 z-20 animate-float" style={{animationDelay: '1s'}}>
                <div className="bg-card/95 backdrop-blur-sm border border-expense/20 rounded-2xl p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Active Users</p>
                      <p className="text-base font-bold">500+</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Hero Image Container */}
              <div className="relative pt-12 pb-8 px-4">
                <img 
                  src="/landing-image.png" 
                  alt="Rupee-Setu Expense Tracker Interface" 
                  className="relative w-full h-auto object-contain drop-shadow-2xl rounded-2xl animate-float z-10"
                  style={{animationDelay: '0.5s'}}
                />
              </div>

              {/* Floating Info Badge - Bottom Left */}
              <div className="absolute bottom-4 left-0 lg:left-6 z-20 animate-float" style={{animationDelay: '2s'}}>
                <div className="bg-card/95 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Easy Setup</p>
                      <p className="text-xs text-muted-foreground">30 sec signup</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Security Badge - Bottom Right */}
              <div className="absolute bottom-8 right-0 lg:right-8 z-20 animate-float" style={{animationDelay: '1.5s'}}>
                <div className="bg-card/95 backdrop-blur-sm border border-income/20 rounded-2xl p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-income" />
                    <div>
                      <p className="text-sm font-semibold">100% Secure</p>
                      <p className="text-xs text-muted-foreground">Bank-level encryption</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute top-1/4 -left-8 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-1/3 -right-8 w-24 h-24 bg-income/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}} />
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-expense/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}} />
            </div>
          </div>
        </main>

        {/* Problem Statement */}
        <section className="py-8 sm:py-12 bg-muted/30 -mx-4 px-4 rounded-3xl">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Most Students Don't Know Where Their Money Actually Goes
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pocket money disappears. Unexpected expenses pile up. Month-end stress repeats. 
              <span className="block mt-2 font-medium text-foreground">
                You're not bad with money — you just need visibility.
              </span>
            </p>
          </div>
        </section>

        {/* Features as Benefits */}
        <section id="features" className="py-8 sm:py-12">
          <div className="text-center mb-10 space-y-3">
            <Badge className="inline-flex px-4 py-1.5 bg-secondary text-secondary-foreground border-0">
              Why Rupee-Setu?
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Simple Tracking, Powerful Insights
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need. Nothing you don't.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="group bg-card p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20">
              <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Know Exactly Where Money Leaks</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                See which categories drain your budget every month. Spot patterns you never noticed before.
              </p>
            </div>

            <div className="group bg-card p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-income/20">
              <div className="w-12 h-12 mb-4 bg-income/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <PiggyBank className="w-6 h-6 text-income" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Track Lent & Borrowed Money</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Never forget who owes you or who you owe. Keep all your IOUs organized in one place.
              </p>
            </div>

            <div className="group bg-card p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-expense/20">
              <div className="w-12 h-12 mb-4 bg-expense/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-6 h-6 text-expense" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Visualize Your Spending Habits</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Clean charts and summaries help you understand your financial behavior at a glance.
              </p>
            </div>
          </div>

          {/* What we DON'T do - Trust Builder */}
          <div className="bg-card border-2 border-primary/10 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
            <h3 className="font-display font-semibold text-xl mb-4 text-center">What We <span className="text-primary">Don't</span> Do</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-sm font-medium">No Bank Sync</p>
                <p className="text-xs text-muted-foreground">Your accounts stay private</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-sm font-medium">No Ads</p>
                <p className="text-xs text-muted-foreground">Clean, distraction-free</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-sm font-medium">No Data Selling</p>
                <p className="text-xs text-muted-foreground">Your data is yours</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-8 sm:py-12 bg-muted/30 -mx-4 px-4 rounded-3xl">
          <div className="text-center mb-10 space-y-3">
            <Badge className="inline-flex px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              Simple Process
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Get Started in 3 Simple Steps
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="font-semibold text-lg">Sign Up Free</h3>
              <p className="text-sm text-muted-foreground">
                Create your account in seconds. No credit card, no verification delays.
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-income rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="font-semibold text-lg">Log Your First Transaction</h3>
              <p className="text-sm text-muted-foreground">
                Add an expense or income in one tap. Takes less than 10 seconds.
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-expense rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="font-semibold text-lg">Watch Your Insights Grow</h3>
              <p className="text-sm text-muted-foreground">
                See patterns emerge. Understand your spending. Make better decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Trust & Privacy */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 space-y-3">
              <Badge className="inline-flex px-4 py-1.5 bg-secondary text-secondary-foreground border-0">
                Privacy First
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">
                Your Data. Your Control. Always.
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-card border rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Bank-Grade Security</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your financial data is encrypted and protected with industry-standard row-level security. We can't see your transactions — only you can.
                </p>
              </div>
              
              <div className="bg-card border rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 bg-income/10 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-income" />
                </div>
                <h3 className="font-semibold text-lg">Built by Students, For Students</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Created by people who understand student finances. No corporate agenda, no profit-first mentality. Just a tool that works.
                </p>
              </div>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              Rupee-Setu is open, transparent, and student-focused. We don't require bank access because we respect your privacy. Manual tracking = full control.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8 sm:py-12">
          <div className="text-center mb-10 space-y-3">
            <Badge className="inline-flex px-4 py-1.5 bg-secondary text-secondary-foreground border-0">
              Questions
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Everything You Need to Know
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real answers to real questions.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Is Rupee-Setu really free forever?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes, completely free. No hidden charges, no premium tiers, no paid features. We built this for students like us, and we believe financial tracking should be accessible to everyone.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Why should I trust a student-built product?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Because we use it ourselves every day. We built Rupee-Setu to solve our own problem — losing track of pocket money. No corporate agenda means no pressure to monetize your data or add unnecessary features.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Is my data stored locally or in the cloud?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Your data is securely stored in the cloud (Supabase) with bank-grade encryption and row-level security. This means you can access it from any device, but only YOU can see your transactions — we can't access your personal financial data.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Do I need to connect my bank account?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  No! Rupee-Setu is a manual tracker. You log transactions yourself, which gives you complete control and privacy. No bank passwords, no automated syncing, no financial institution access required.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Can I use it on mobile?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes! Rupee-Setu is a Progressive Web App (PWA) that works beautifully on mobile. You can install it like a native app on your phone for quick access anytime.</AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-card border rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What happens if I stop using it?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Your data stays safe in your account. You can return anytime and pick up exactly where you left off. There's no penalty, no account deletion, no data loss. We don't send guilt-trip emails either.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-card border rounded-xl px-6 shadow-sm">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Who should NOT use Rupee-Setu?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  If you need automatic bank syncing, advanced investment tracking, or tax preparation features, Rupee-Setu might not be for you. We focus on simple, manual expense tracking — perfect for students and young professionals who want clarity without complexity.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 sm:py-12 mb-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary to-emerald-600 rounded-3xl p-8 sm:p-12 lg:p-14 text-center text-white shadow-2xl">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
                Start Tracking Your Money Today
              </h2>
              <p className="text-primary-foreground/90 text-lg sm:text-xl max-w-2xl mx-auto">
                Join hundreds of students who've taken control of their finances. Simple, private, and completely free.
              </p>
              
              {/* Trust signals */}
              <div className="flex flex-wrap justify-center gap-6 pt-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Free Forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No Bank Connection</span>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth')}
                  variant="secondary"
                  className="gap-2 text-lg h-14 px-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-semibold text-primary"
                >
                  Get Started in 30 Seconds <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-white shadow-md">
                    <img src={rupeeSetuLogo} alt="Rupee-Setu" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-display font-bold text-lg">Rupee-Setu</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Simple expense tracking for students & young professionals. Built by students, for students.
                </p>
              </div>

              {/* Product */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Product</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground transition-colors">
                      Features
                    </button>
                  </li>
                  <li>
                    <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground transition-colors">
                      How It Works
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate('/auth')} className="hover:text-foreground transition-colors">
                      Get Started
                    </button>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">About Us</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="mailto:support@rupee-setu.app" className="hover:text-foreground transition-colors flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <button onClick={() => document.querySelector('[value="item-1"]')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground transition-colors">
                      FAQ
                    </button>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors">Help Center</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© 2026 Rupee-Setu. Built with ❤️ for students everywhere.</p>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Your data is private and secure</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
