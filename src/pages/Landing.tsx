import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, TrendingUp, PiggyBank, Wallet } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const paisaVaultLogo = '/paisa-vault-logo.png';

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 sm:mb-12 lg:mb-16 gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img src={paisaVaultLogo} alt="Paisa Vault" className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0" />
            <span className="font-display font-bold text-lg sm:text-xl truncate">Paisa Vault</span>
          </div>
          <Button onClick={() => navigate('/auth')} variant="outline" className="text-xs sm:text-sm px-3 sm:px-4">
            Sign In
          </Button>
        </header>

        {/* Main Hero */}
        <main className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-6 sm:py-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Your Money,
              <br />
              <span className="text-primary">Your Control</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              Track your expenses and income effortlessly. Paisa Vault helps you take charge of your finances with simple, intuitive tools.
            </p>
            <div className="flex flex-col gap-3 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="gap-2 text-sm sm:text-base px-6 sm:px-8 w-full sm:w-auto justify-center sm:justify-start"
              >
                Get Started <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center w-full">
            <img 
              src={paisaVaultLogo} 
              alt="Paisa Vault Logo" 
              className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl animate-fade-in"
            />
          </div>
        </main>

        {/* Features */}
        <section className="py-8 sm:py-12 lg:py-16">
          <h2 className="font-display text-2xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12">
            Why Choose Paisa Vault?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-base sm:text-lg mb-2">Track Expenses</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Log your daily expenses quickly and see where your money goes.
              </p>
            </div>
            <div className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-income/10 rounded-xl flex items-center justify-center">
                <PiggyBank className="w-6 h-6 sm:w-7 sm:h-7 text-income" />
              </div>
              <h3 className="font-display font-semibold text-base sm:text-lg mb-2">Monitor Income</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Keep track of all your income sources in one place.
              </p>
            </div>
            <div className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg text-center sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-expense/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-expense" />
              </div>
              <h3 className="font-display font-semibold text-base sm:text-lg mb-2">Secure & Private</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Your financial data is encrypted and only accessible by you.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 sm:py-12 lg:py-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-6 sm:p-10 lg:p-12">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Ready to take control of your finances?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-6 sm:mb-8">
              Start tracking your expenses today. It's free!
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="gap-2 text-lg px-8"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-muted-foreground text-sm border-t">
          <p>© 2026 Paisa Vault. Your Money, Your Control.</p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
