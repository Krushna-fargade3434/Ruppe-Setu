import { useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFinanceData } from '@/hooks/useFinanceData';
import { ExpenseCategory } from '@/types/finance';

const QuickActions = () => {
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  
  const { addIncome, addExpense, isAddingIncome, isAddingExpense } = useFinanceData();

  const [incomeForm, setIncomeForm] = useState({
    amount: '',
    description: '',
    source: 'Parents',
    date: new Date().toISOString().split('T')[0],
  });

  const [expenseForm, setExpenseForm] = useState<{
    amount: string;
    description: string;
    date: string;
    category: ExpenseCategory;
  }>({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Other',
  });

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incomeForm.amount) return;
    
    addIncome({
      amount: parseFloat(incomeForm.amount),
      description: incomeForm.description,
      source: incomeForm.source,
      date: incomeForm.date,
    });
    
    setIncomeForm({
      amount: '',
      description: '',
      source: 'Parents',
      date: new Date().toISOString().split('T')[0],
    });
    setIncomeOpen(false);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseForm.amount) return;
    
    addExpense({
      amount: parseFloat(expenseForm.amount),
      category: expenseForm.category,
      description: expenseForm.description,
      date: expenseForm.date,
    });
    
    setExpenseForm({
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Other',
    });
    setExpenseOpen(false);
  };

  return (
    <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 w-full">
      <Dialog open={incomeOpen} onOpenChange={setIncomeOpen}>
        <DialogTrigger asChild>
          <Button className="gradient-income hover:opacity-90 transition-opacity gap-2 w-full xs:w-auto">
            <ArrowDownCircle className="w-4 h-4" />
            <span className="block xs:inline">Add Income</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Add Income</DialogTitle>
            <DialogDescription>
              Record money received from parents or other sources.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddIncome} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="income-amount">Amount (₹)</Label>
              <Input
                id="income-amount"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={incomeForm.amount}
                onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="income-source">Source</Label>
              <Select
                value={incomeForm.source}
                onValueChange={(value) => setIncomeForm({ ...incomeForm, source: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Parents">Parents</SelectItem>
                  <SelectItem value="Part-time Job">Part-time Job</SelectItem>
                  <SelectItem value="Scholarship">Scholarship</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="income-date">Date</Label>
              <Input
                id="income-date"
                type="date"
                value={incomeForm.date}
                onChange={(e) => setIncomeForm({ ...incomeForm, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="income-description">Note (optional)</Label>
              <Textarea
                id="income-description"
                placeholder="Add a note..."
                value={incomeForm.description}
                onChange={(e) => setIncomeForm({ ...incomeForm, description: e.target.value })}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full gradient-income hover:opacity-90" 
              disabled={isAddingIncome}
            >
              {isAddingIncome ? 'Adding...' : 'Add Income'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={expenseOpen} onOpenChange={setExpenseOpen}>
        <DialogTrigger asChild>
          <Button className="gradient-expense hover:opacity-90 transition-opacity gap-2 w-full xs:w-auto">
            <ArrowUpCircle className="w-4 h-4" />
            <span className="block xs:inline">Add Expense</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Add Expense</DialogTitle>
            <DialogDescription>
              Record your daily expense.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddExpense} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="expense-amount">Amount (₹)</Label>
              <Input
                id="expense-amount"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-category">Category</Label>
              <Select
                value={expenseForm.category}
                onValueChange={(value: ExpenseCategory) => setExpenseForm({ ...expenseForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Study">Study</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-date">Date</Label>
              <Input
                id="expense-date"
                type="date"
                value={expenseForm.date}
                onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-description">Description (optional)</Label>
              <Textarea
                id="expense-description"
                placeholder="What did you spend on?"
                value={expenseForm.description}
                onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full gradient-expense hover:opacity-90" 
              disabled={isAddingExpense}
            >
              {isAddingExpense ? 'Adding...' : 'Add Expense'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickActions;
