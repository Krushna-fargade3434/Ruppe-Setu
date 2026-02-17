import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionList from '@/components/dashboard/TransactionList';
import LendBorrowNotebook from '@/components/dashboard/LendBorrowNotebook';
import { useFinanceData } from '@/hooks/useFinanceData';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpCircle, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const Dashboard = () => {
  const { totalExpenses, isLoading, expenseData } = useFinanceData();
  const { user } = useAuth();

  // Calculate this month's expenses
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
        <main className="container py-8 px-3 sm:px-4">
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
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
      
      <main className="container py-4 sm:py-8 space-y-6 sm:space-y-8 px-3 sm:px-4">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {getGreeting()}, {user?.user_metadata?.display_name || 'User'}
          </h1>
        </div>

        {/* Quick Actions */}
        <div className="w-full">
          <QuickActions />
        </div>

        {/* Expense Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <StatCard
            title="Total Expenses"
            value={`₹${totalExpenses.toFixed(2)}`}
            icon={<ArrowUpCircle className="w-5 h-5 text-expense-foreground" />}
            variant="expense"
          />
          <StatCard
            title="This Month Expenses"
            value={`₹${thisMonthExpenses.toFixed(2)}`}
            icon={<TrendingUp className="w-5 h-5 text-primary" />}
            trend={format(new Date(), 'MMMM yyyy')}
          />
        </div>

        {/* Lend & Borrow Notebook */}
        <LendBorrowNotebook />

        {/* Transaction List */}
        <TransactionList />
      </main>
    </div>
  );
};

export default Dashboard;
