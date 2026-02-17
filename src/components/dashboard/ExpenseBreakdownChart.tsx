import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useFinanceData } from '@/hooks/useFinanceData';
import { ExpenseCategory } from '@/types/finance';
import { TrendingUp } from 'lucide-react';

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: '#f97316',
  Travel: '#3b82f6',
  Study: '#8b5cf6',
  Personal: '#ec4899',
  Other: '#64748b',
};

const ExpenseBreakdownChart = () => {
  const { expenseData } = useFinanceData();

  // Calculate category totals
  const categoryTotals = expenseData.reduce((acc, expense) => {
    const category = expense.category;
    acc[category] = (acc[category] || 0) + Number(expense.amount);
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
    percentage: 0, // Will calculate after
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  chartData.forEach(item => {
    item.percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
  });

  if (chartData.length === 0) {
    return null;
  }

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="font-display text-base sm:text-lg flex items-center gap-2">
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 flex-shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          Expense Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as ExpenseCategory]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `₹${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[item.name as ExpenseCategory] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-semibold">₹{item.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseBreakdownChart;
