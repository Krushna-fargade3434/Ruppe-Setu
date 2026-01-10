import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, TrendingUp, PiggyBank, Wallet } from 'lucide-react';
import paisaVaultLogo from '@/assets/paisa-vault-logo.png';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <img src={paisaVaultLogo} alt="Paisa Vault" className="w-12 h-12 object-contain" />
            <span className="font-display font-bold text-xl">Paisa Vault</span>
          </div>
          <Button onClick={() => navigate('/auth')} variant="outline">
            Sign In
          </Button>
        </header>

        {/* Main Hero */}
        <main className="flex flex-col lg:flex-row items-center gap-12 py-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Money,
              <br />
              <span className="text-primary">Your Control</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Track your expenses and income effortlessly. Paisa Vault helps you take charge of your finances with simple, intuitive tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="gap-2 text-lg px-8"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <img 
              src={paisaVaultLogo} 
              alt="Paisa Vault Logo" 
              className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl animate-fade-in"
            />
          </div>
        </main>

        {/* Features */}
        <section className="py-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">
            Why Choose Paisa Vault?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl shadow-lg text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Track Expenses</h3>
              <p className="text-muted-foreground">
                Log your daily expenses quickly and see where your money goes.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-lg text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-income/10 rounded-xl flex items-center justify-center">
                <PiggyBank className="w-7 h-7 text-income" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Monitor Income</h3>
              <p className="text-muted-foreground">
                Keep track of all your income sources in one place.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-lg text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-expense/10 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-expense" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your financial data is encrypted and only accessible by you.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Ready to take control of your finances?
            </h2>
            <p className="text-muted-foreground mb-8">
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
