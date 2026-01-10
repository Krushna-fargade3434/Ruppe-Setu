import { useState } from 'react';
import { format } from 'date-fns';
import { ArrowDownCircle, ArrowUpCircle, Trash2, Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFinanceData } from '@/hooks/useFinanceData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Income, Expense } from '@/types/finance';

const TransactionList = () => {
  const { incomeData, expenseData, deleteIncome, deleteExpense, updateIncome, updateExpense } = useFinanceData();
  
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editSource, setEditSource] = useState('');

  // Sort by date descending
  const sortedExpenses = [...expenseData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedIncome = [...incomeData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const openExpenseEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setEditAmount(String(expense.amount));
    setEditDescription(expense.description || '');
    setEditDate(expense.date);
  };

  const openIncomeEdit = (income: Income) => {
    setEditingIncome(income);
    setEditAmount(String(income.amount));
    setEditDescription(income.description || '');
    setEditDate(income.date);
    setEditSource(income.source || 'Parents');
  };

  const handleExpenseUpdate = () => {
    if (editingExpense && editAmount) {
      updateExpense({
        id: editingExpense.id,
        amount: parseFloat(editAmount),
        description: editDescription,
        date: editDate,
      });
      setEditingExpense(null);
    }
  };

  const handleIncomeUpdate = () => {
    if (editingIncome && editAmount) {
      updateIncome({
        id: editingIncome.id,
        amount: parseFloat(editAmount),
        description: editDescription,
        source: editSource,
        date: editDate,
      });
      setEditingIncome(null);
    }
  };

  return (
    <>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Expenses Section */}
        <Card className="card-shadow">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="font-display text-base sm:text-lg flex items-center gap-2">
              <div className="p-1.5 sm:p-2 rounded-lg bg-expense/10 flex-shrink-0">
                <ArrowUpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-expense" />
              </div>
              <span className="truncate">Expenses</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1 sm:pr-2">
            {sortedExpenses.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                  No expenses recorded
                </p>
              ) : (
                sortedExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-expense">
                        ₹{Number(expense.amount).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(expense.date), 'MMM d, yyyy')}
                      </p>
                      {expense.description && (
                        <p className="text-xs text-muted-foreground truncate">
                          {expense.description}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-primary shrink-0"
                      onClick={() => openExpenseEdit(expense)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Income Section */}
        <Card className="card-shadow">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="font-display text-base sm:text-lg flex items-center gap-2">
              <div className="p-1.5 sm:p-2 rounded-lg bg-income/10 flex-shrink-0">
                <ArrowDownCircle className="w-4 h-4 sm:w-5 sm:h-5 text-income" />
              </div>
              <span className="truncate">Income</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1 sm:pr-2">
            {sortedIncome.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                  No income recorded
                </p>
              ) : (
                sortedIncome.map((income) => (
                  <div
                    key={income.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors animate-fade-in"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-income">
                        ₹{Number(income.amount).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(income.date), 'MMM d, yyyy')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {income.source}
                        {income.description && ` • ${income.description}`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-primary shrink-0"
                      onClick={() => openIncomeEdit(income)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => deleteIncome(income.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Expense Dialog */}
      <Dialog open={!!editingExpense} onOpenChange={() => setEditingExpense(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              type="number"
              placeholder="Amount"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
            />
            <Input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
            <Input
              placeholder="Description (optional)"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <Button className="w-full" onClick={handleExpenseUpdate}>
              Update Expense
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Income Dialog */}
      <Dialog open={!!editingIncome} onOpenChange={() => setEditingIncome(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Income</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              type="number"
              placeholder="Amount"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
            />
            <Input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
            <Input
              placeholder="Source"
              value={editSource}
              onChange={(e) => setEditSource(e.target.value)}
            />
            <Input
              placeholder="Description (optional)"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <Button className="w-full" onClick={handleIncomeUpdate}>
              Update Income
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionList;
