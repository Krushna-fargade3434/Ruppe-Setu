export type ExpenseCategory = 'Food' | 'Travel' | 'Study' | 'Personal' | 'Other';

export interface Income {
  id: string;
  user_id: string;
  amount: number;
  description: string | null;
  source: string;
  date: string;
  created_at: string;
}

export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  category: ExpenseCategory;
  description: string | null;
  date: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  monthly_budget: number;
  created_at: string;
  updated_at: string;
}

