import { ArrowUpCircle, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionList from '@/components/dashboard/TransactionList';
import { useFinanceData } from '@/hooks/useFinanceData';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const Dashboard = () => {
  const { totalExpenses, isLoading, expenseData } = useFinanceData();

  // Calculate this month's data
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthExpenses = expenseData
    .filter((exp) => {
      const date = new Date(exp.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-8">
        {/* Welcome & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold">Dashboard</h2>
            <p className="text-muted-foreground">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          <QuickActions />
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <StatCard
            title="Total Expenses"
            value={`₹${totalExpenses.toFixed(2)}`}
            icon={<ArrowUpCircle className="w-5 h-5 text-expense-foreground" />}
            variant="expense"
          />
          <StatCard
            title="This Month"
            value={`₹${thisMonthExpenses.toFixed(2)}`}
            icon={<TrendingUp className="w-5 h-5 text-primary" />}
            trend={format(new Date(), 'MMMM yyyy')}
          />
        </div>

        {/* Transaction List */}
        <TransactionList />
      </main>
    </div>
  );
};

export default Dashboard;
