import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

const rupeeSetuLogo = '/Ruppe-setu-logo.png';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  displayName: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

type AuthMode = 'login' | 'signup' | 'forgot';

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  
  const { signIn, signUp, resetPassword, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  // Show loading spinner while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, don't render auth page (will redirect)
  if (user) {
    return null;
  }

  const validate = () => {
    try {
      if (mode === 'forgot') {
        z.string().email('Please enter a valid email address').parse(email);
        setErrors({});
        return true;
      }
      authSchema.parse({ 
        email, 
        password, 
        displayName: mode === 'login' ? undefined : displayName || undefined 
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          } else {
            newErrors['email'] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setErrors({});

    try {
      if (mode === 'forgot') {
        const { error } = await resetPassword(email);
        if (error) {
          setErrors({ form: error.message });
        } else {
          toast({
            title: 'Reset email sent!',
            description: 'Check your inbox for password reset instructions.',
          });
          setMode('login');
          setEmail('');
        }
      } else if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setErrors({ form: 'Invalid email or password. Please try again or sign up first.' });
          } else {
            setErrors({ form: error.message });
          }
        } else {
          // Successfully signed in - navigate will happen via useEffect
          toast({
            title: 'Welcome back!',
            description: 'You have been signed in successfully.',
          });
          navigate('/dashboard');
        }
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          if (error.message.includes('already registered')) {
            setErrors({ form: 'This email is already registered. Please sign in instead.' });
          } else {
            setErrors({ form: error.message });
          }
        } else {
          // Successfully signed up
          toast({
            title: 'Account created!',
            description: 'Please check your email to verify your account, or sign in now.',
          });
          // Switch to login mode
          setMode('login');
          setEmail(email);
          setPassword('');
          setDisplayName('');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome Back!';
      case 'signup': return 'Create Account';
      case 'forgot': return 'Reset Password';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'login': return 'Sign in to track your expenses';
      case 'signup': return 'Start managing your money today';
      case 'forgot': return 'Enter your email to receive a reset link';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-3 sm:p-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <Card className="w-full max-w-md animate-scale-in card-shadow relative">
        <CardHeader className="text-center space-y-3 sm:space-y-4 px-4 sm:px-6">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <img src={rupeeSetuLogo} alt="Rupee-Setu" className="w-full h-full object-contain" />
          </div>
          <div>
            <CardTitle className="text-xl sm:text-2xl font-display">
              {getTitle()}
            </CardTitle>
            <CardDescription className="mt-1 sm:mt-2 text-xs sm:text-sm">
              {getDescription()}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="displayName">Your Name</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="John Doe"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={errors.displayName ? 'border-destructive' : ''}
                />
                {errors.displayName && (
                  <p className="text-sm text-destructive">{errors.displayName}</p>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            
            {mode !== 'forgot' && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>
            )}

            {errors.form && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{errors.form}</p>
              </div>
            )}

            {mode === 'login' && (
              <button
                type="button"
                onClick={() => {
                  setMode('forgot');
                  setErrors({});
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Forgot password?
              </button>
            )}
            
            <Button 
              type="submit" 
              className="w-full gradient-primary hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Send Reset Link'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {mode === 'forgot' && (
              <Button
                type="button"
                variant="ghost"
                className="w-full gap-2"
                onClick={() => {
                  setMode('login');
                  setErrors({});
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Button>
            )}
          </form>
          
          {mode !== 'forgot' && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setErrors({});
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {mode === 'login' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"}
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
