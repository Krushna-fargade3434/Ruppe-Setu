import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, TrendingUp, PiggyBank } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const rupeeSetuLogo = '/Ruppe-setu-logo.png';

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
            <img src={rupeeSetuLogo} alt="Rupee-Setu" className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0" />
            <span className="font-display font-bold text-lg sm:text-xl truncate">Rupee-Setu</span>
          </div>
          <Button onClick={() => navigate('/auth')} variant="outline" className="text-xs sm:text-sm px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
            Sign In
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4">
        {/* Main Hero */}
        <main className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-12 sm:py-20 lg:py-24">
          <div className="flex-1 text-center lg:text-left space-y-6 animate-slide-up">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Your Money,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
                Your Control
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Track your expenses and income effortlessly. Rupee-Setu helps you take charge of your finances with simple, intuitive tools designed for modern life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="gap-2 text-base h-12 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-base h-12 px-8 hover:bg-secondary transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center w-full relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl transform scale-75 animate-pulse" />
            <img 
              src={rupeeSetuLogo} 
              alt="Rupee-Setu Logo" 
              className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl animate-float z-10"
            />
          </div>
        </main>

        {/* Features */}
        <section id="features" className="py-16 sm:py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Why Choose Rupee-Setu?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to manage your personal finances effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-card p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/20 hover:-translate-y-1">
              <div className="w-14 h-14 mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">Track Expenses</h3>
              <p className="text-muted-foreground leading-relaxed">
                Log your daily expenses quickly and visualize where your money goes with intuitive charts.
              </p>
            </div>

            <div className="group bg-card p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-income/20 hover:-translate-y-1">
              <div className="w-14 h-14 mb-6 bg-income/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <PiggyBank className="w-7 h-7 text-income" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-income transition-colors">Monitor Income</h3>
              <p className="text-muted-foreground leading-relaxed">
                Keep track of all your income sources in one place and manage your budget effectively.
              </p>
            </div>

            <div className="group bg-card p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-expense/20 hover:-translate-y-1">
              <div className="w-14 h-14 mb-6 bg-expense/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7 text-expense" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-expense transition-colors">Secure & Private</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your financial data is encrypted locally and stored securely. We prioritize your privacy.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 mb-16">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary to-emerald-600 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-center text-white shadow-2xl">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
                Ready to take control of your finances?
              </h2>
              <p className="text-primary-foreground/90 text-lg sm:text-xl">
                Join thousands of users who are already managing their money better. It's completely free.
              </p>
              <div className="pt-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth')}
                  variant="secondary"
                  className="gap-2 text-lg h-14 px-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-semibold text-primary"
                >
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-muted-foreground text-sm border-t">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img src={rupeeSetuLogo} alt="Rupee-Setu" className="w-6 h-6 object-contain" />
              <span className="font-display font-bold">Rupee-Setu</span>
            </div>
            <p>© 2026 Rupee-Setu. Your Money, Your Control.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
