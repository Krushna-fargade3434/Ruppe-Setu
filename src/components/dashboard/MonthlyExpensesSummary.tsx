import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingDown } from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Expense } from '@/types/finance';

interface MonthlyExpensesSummaryProps {
  expenseData: Expense[];
}

interface MonthlyData {
  month: string;
  year: number;
  total: number;
  count: number;
  startDate: Date;
  endDate: Date;
}

const MonthlyExpensesSummary = ({ expenseData }: MonthlyExpensesSummaryProps) => {
  const monthlyData = useMemo(() => {
    const monthMap = new Map<string, MonthlyData>();

    expenseData.forEach((expense) => {
      const date = new Date(expense.date);
      const monthKey = format(date, 'yyyy-MM');
      const monthName = format(date, 'MMMM');
      const year = date.getFullYear();

      if (!monthMap.has(monthKey)) {
        const startDate = startOfMonth(date);
        const endDate = endOfMonth(date);
        monthMap.set(monthKey, {
          month: monthName,
          year,
          total: 0,
          count: 0,
          startDate,
          endDate,
        });
      }

      const monthData = monthMap.get(monthKey);
      if (monthData) {
        monthData.total += Number(expense.amount);
        monthData.count += 1;
      }
    });

    // Convert to array and sort by date (newest first)
    return Array.from(monthMap.values()).sort((a, b) => {
      const dateA = new Date(b.year, new Date(b.startDate).getMonth());
      const dateB = new Date(a.year, new Date(a.startDate).getMonth());
      return dateA.getTime() - dateB.getTime();
    });
  }, [expenseData]);

  if (monthlyData.length === 0) {
    return (
      <Card className="card-shadow">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            Monthly Expense Records
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Your expense breakdown by month</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="text-center py-10 sm:py-12 text-muted-foreground">
            <TrendingDown className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
            <p className="text-sm sm:text-base font-medium">No expense records found</p>
            <p className="text-xs sm:text-sm mt-1">Start adding expenses to see your monthly breakdown</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Monthly Expense Records
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">Your expense breakdown by month</CardDescription>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {monthlyData.map((monthData) => (
            <div
              key={`${monthData.year}-${monthData.month}`}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-md bg-gradient-to-br from-card to-card/80"
            >
              <div className="flex-1 space-y-1.5">
                <div className="flex items-baseline gap-2">
                  <p className="font-semibold text-base sm:text-lg text-foreground">
                    {monthData.month} {monthData.year}
                  </p>
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {monthData.count}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {format(monthData.startDate, 'MMM d')} - {format(monthData.endDate, 'MMM d')}
                </p>
              </div>
              <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-1">
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  ₹{monthData.total.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground sm:text-right">
                  Total Expense
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyExpensesSummary;
