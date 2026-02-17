import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useFinanceData } from '@/hooks/useFinanceData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Loader2, User, Smartphone, Info, TrendingUp, Calendar, Shield, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import MonthlyExpensesSummary from '@/components/dashboard/MonthlyExpensesSummary';
import { APP_VERSION, APP_NAME } from '@/lib/version';
import { format } from 'date-fns';

const Profile = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const { expenseData } = useFinanceData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (user) {
      setDisplayName(user.user_metadata?.display_name || '');
      setAvatarUrl(user.user_metadata?.avatar_url || '');
    } else if (!authLoading) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await updateProfile({
        displayName,
        avatarUrl,
      });

      if (error) throw error;

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error updating profile',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const memberSince = user.created_at ? format(new Date(user.created_at), 'MMMM yyyy') : 'Recently';
  const totalTransactions = expenseData.length;
  const totalExpenses = expenseData.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6 gap-2 text-sm sm:text-base"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* Profile Header Card */}
        <Card className="card-shadow mb-6">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-background shadow-xl">
                <AvatarImage src={avatarUrl} className="object-cover" />
                <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                  {displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left space-y-2">
                <h1 className="text-2xl sm:text-3xl font-display font-bold">
                  {displayName || 'User'}
                </h1>
                <p className="text-muted-foreground flex items-center gap-2 justify-center sm:justify-start">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Badge variant="secondary" className="gap-1">
                    <Calendar className="w-3 h-3" />
                    Member since {memberSince}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Shield className="w-3 h-3" />
                    Verified Account
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <Card className="card-shadow mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Your Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 space-y-1">
                <p className="text-xs text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold">{totalTransactions}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 space-y-1">
                <p className="text-xs text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-expense">₹{totalExpenses.toFixed(0)}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 space-y-1 col-span-2 sm:col-span-1">
                <p className="text-xs text-muted-foreground">Account Status</p>
                <p className="text-2xl font-bold text-income">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <Card className="card-shadow mb-6">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Profile Settings</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Update your personal information and profile appearance.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Choose Avatar</Label>
                  <div className="grid grid-cols-5 gap-2 sm:gap-4">
                    {[1, 2, 3, 4, 5].map((num) => {
                      const imgPath = `/profileimg/${num}.png`;
                      return (
                        <div
                          key={num}
                          onClick={() => setAvatarUrl(imgPath)}
                          className={`
                            relative cursor-pointer rounded-full overflow-hidden aspect-square border-2 transition-all active:scale-95
                            ${avatarUrl === imgPath ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent hover:border-primary/50'}
                          `}
                        >
                          <img
                            src={imgPath}
                            alt={`Avatar ${num}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-sm sm:text-base">Display Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="pl-9 text-sm sm:text-base h-10 sm:h-11"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      value={user.email}
                      disabled
                      className="pl-9 bg-muted text-muted-foreground text-sm sm:text-base h-10 sm:h-11"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>
              </div>

              <Separator />
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={loading} className="gradient-primary min-w-[120px] sm:min-w-[140px] h-10 sm:h-11 text-sm sm:text-base">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Monthly Expenses Section */}
        <div className="mt-6 sm:mt-8">
          <MonthlyExpensesSummary expenseData={expenseData} />
        </div>

        {/* App Version Info */}
        <Card className="mt-6 sm:mt-8 card-shadow border-primary/20">
          <CardContent className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{APP_NAME}</p>
                  <p className="text-xs text-muted-foreground">Version {APP_VERSION}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Info className="w-4 h-4" />
                <span className="hidden sm:inline">Auto-updates on deploy</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
