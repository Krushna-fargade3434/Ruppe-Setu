import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Income, Expense, ExpenseCategory } from '@/types/finance';
import { toast } from '@/hooks/use-toast';

export const useFinanceData = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch income
  const { data: incomeData = [], isLoading: incomeLoading } = useQuery({
    queryKey: ['income', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('income')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      return data as Income[];
    },
    enabled: !!user,
  });

  // Fetch expenses
  const { data: expenseData = [], isLoading: expenseLoading } = useQuery({
    queryKey: ['expenses', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      return data as Expense[];
    },
    enabled: !!user,
  });

  // Add income
  const addIncomeMutation = useMutation({
    mutationFn: async (income: { amount: number; description?: string; source?: string; date: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('income')
        .insert({
          user_id: user.id,
          amount: income.amount,
          description: income.description || null,
          source: income.source || 'Parents',
          date: income.date,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] });
      toast({ title: 'Income added successfully!' });
    },
    onError: (error) => {
      toast({ title: 'Error adding income', description: error.message, variant: 'destructive' });
    },
  });

  // Add expense
  const addExpenseMutation = useMutation({
    mutationFn: async (expense: { amount: number; category: ExpenseCategory; description?: string; date: string }) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('expenses')
        .insert({
          user_id: user.id,
          amount: expense.amount,
          category: expense.category,
          description: expense.description || null,
          date: expense.date,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({ title: 'Expense added successfully!' });
    },
    onError: (error) => {
      toast({ title: 'Error adding expense', description: error.message, variant: 'destructive' });
    },
  });

  // Update income
  const updateIncomeMutation = useMutation({
    mutationFn: async ({ id, amount, description, source, date }: { id: string; amount: number; description?: string; source?: string; date: string }) => {
      const { data, error } = await supabase
        .from('income')
        .update({
          amount,
          description: description || null,
          source: source || 'Parents',
          date,
        })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] });
      toast({ title: 'Income updated successfully!' });
    },
    onError: (error) => {
      toast({ title: 'Error updating income', description: error.message, variant: 'destructive' });
    },
  });

  // Update expense
  const updateExpenseMutation = useMutation({
    mutationFn: async ({ id, amount, category, description, date }: { id: string; amount: number; category?: ExpenseCategory; description?: string; date: string }) => {
      const { data, error } = await supabase
        .from('expenses')
        .update({
          amount,
          category: category || undefined,
          description: description || null,
          date,
        })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({ title: 'Expense updated successfully!' });
    },
    onError: (error) => {
      toast({ title: 'Error updating expense', description: error.message, variant: 'destructive' });
    },
  });

  // Delete income
  const deleteIncomeMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('income').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] });
      toast({ title: 'Income deleted' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting income', description: error.message, variant: 'destructive' });
    },
  });

  // Delete expense
  const deleteExpenseMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('expenses').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({ title: 'Expense deleted' });
    },
    onError: (error) => {
      toast({ title: 'Error deleting expense', description: error.message, variant: 'destructive' });
    },
  });

  // Calculate totals
  const totalIncome = incomeData.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + Number(item.amount), 0);
  const balance = totalIncome - totalExpenses;

  return {
    incomeData,
    expenseData,
    isLoading: incomeLoading || expenseLoading,
    totalIncome,
    totalExpenses,
    balance,
    addIncome: addIncomeMutation.mutate,
    addExpense: addExpenseMutation.mutate,
    updateIncome: updateIncomeMutation.mutate,
    updateExpense: updateExpenseMutation.mutate,
    deleteIncome: deleteIncomeMutation.mutate,
    deleteExpense: deleteExpenseMutation.mutate,
    isAddingIncome: addIncomeMutation.isPending,
    isAddingExpense: addExpenseMutation.isPending,
  };
};
