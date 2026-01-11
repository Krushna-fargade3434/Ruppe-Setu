import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { BookOpen, Plus, ArrowUpRight, ArrowDownLeft, Trash2, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';

interface LendBorrowEntry {
  id: string;
  type: 'lend' | 'borrow';
  personName: string;
  amount: number;
  note: string;
  date: string;
  settled: boolean;
  settledDate?: string;
}

const STORAGE_KEY = 'paisa-vault-lend-borrow';

// Helper function to get entries from localStorage
const getStoredEntries = (userId: string): LendBorrowEntry[] => {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY}-${userId}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper function to save entries to localStorage
const setStoredEntries = (userId: string, entries: LendBorrowEntry[]) => {
  localStorage.setItem(`${STORAGE_KEY}-${userId}`, JSON.stringify(entries));
};

const LendBorrowNotebook = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LendBorrowEntry[]>(() => {
    // Initialize from localStorage if user is already available
    if (user?.id) {
      return getStoredEntries(user.id);
    }
    return [];
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    type: 'lend' as 'lend' | 'borrow',
    personName: '',
    amount: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Load entries from localStorage when user changes
  useEffect(() => {
    if (user?.id) {
      const stored = getStoredEntries(user.id);
      setEntries(stored);
    }
  }, [user?.id]);

  // Save entries to localStorage - memoized to prevent unnecessary re-renders
  const saveEntries = useCallback((newEntries: LendBorrowEntry[]) => {
    if (user?.id) {
      setStoredEntries(user.id, newEntries);
      setEntries(newEntries);
    }
  }, [user?.id]);

  const handleAddEntry = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!form.personName || !form.amount) return;

    const newEntry: LendBorrowEntry = {
      id: crypto.randomUUID(),
      type: form.type,
      personName: form.personName,
      amount: parseFloat(form.amount),
      note: form.note,
      date: form.date,
      settled: false,
    };

    setEntries(prev => {
      const newEntries = [newEntry, ...prev];
      if (user?.id) {
        setStoredEntries(user.id, newEntries);
      }
      return newEntries;
    });
    
    setForm({
      type: 'lend',
      personName: '',
      amount: '',
      note: '',
      date: new Date().toISOString().split('T')[0],
    });
    setDialogOpen(false);
    toast({
      title: form.type === 'lend' ? 'Money lent recorded!' : 'Borrowed money recorded!',
    });
  }, [form, user?.id]);

  const toggleSettled = useCallback((id: string) => {
    setEntries(prev => {
      const updated = prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              settled: !entry.settled,
              settledDate: !entry.settled ? new Date().toISOString() : undefined,
            }
          : entry
      );
      if (user?.id) {
        setStoredEntries(user.id, updated);
      }
      const toggledEntry = updated.find((e) => e.id === id);
      toast({
        title: toggledEntry?.settled ? 'Marked as settled!' : 'Marked as pending',
      });
      return updated;
    });
  }, [user?.id]);

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => {
      const newEntries = prev.filter((entry) => entry.id !== id);
      if (user?.id) {
        setStoredEntries(user.id, newEntries);
      }
      return newEntries;
    });
    toast({ title: 'Entry deleted' });
  }, [user?.id]);

  // Memoize computed values to prevent unnecessary re-renders
  const { pendingEntries, settledEntries, totalLent, totalBorrowed } = useMemo(() => {
    const pending = entries.filter((e) => !e.settled);
    const settled = entries.filter((e) => e.settled);
    
    const lent = pending
      .filter((e) => e.type === 'lend')
      .reduce((sum, e) => sum + e.amount, 0);

    const borrowed = pending
      .filter((e) => e.type === 'borrow')
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      pendingEntries: pending,
      settledEntries: settled,
      totalLent: lent,
      totalBorrowed: borrowed,
    };
  }, [entries]);

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-display">
            <BookOpen className="w-5 h-5 text-primary" />
            Lend & Borrow Notebook
          </CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="gap-1">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Entry</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Add Entry</DialogTitle>
                <DialogDescription>
                  Record money you lent to someone or borrowed from someone.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEntry} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(value: 'lend' | 'borrow') =>
                      setForm({ ...form, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lend">
                        <span className="flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4 text-orange-500" />
                          Money I Lent (Given)
                        </span>
                      </SelectItem>
                      <SelectItem value="borrow">
                        <span className="flex items-center gap-2">
                          <ArrowDownLeft className="w-4 h-4 text-blue-500" />
                          Money I Borrowed (Taken)
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="person-name">Person Name</Label>
                  <Input
                    id="person-name"
                    placeholder="Who did you lend/borrow from?"
                    value={form.personName}
                    onChange={(e) => setForm({ ...form, personName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entry-amount">Amount (₹)</Label>
                  <Input
                    id="entry-amount"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entry-date">Date</Label>
                  <Input
                    id="entry-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entry-note">Note (optional)</Label>
                  <Textarea
                    id="entry-note"
                    placeholder="What was it for?"
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  className={`w-full ${
                    form.type === 'lend'
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  Add Entry
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-orange-500/10 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">To Receive</p>
            <p className="text-lg font-bold text-orange-500">₹{totalLent.toFixed(2)}</p>
          </div>
          <div className="bg-blue-500/10 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">To Pay</p>
            <p className="text-lg font-bold text-blue-500">₹{totalBorrowed.toFixed(2)}</p>
          </div>
        </div>

        {/* Entries List */}
        <ScrollArea className="h-[200px] pr-2">
          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-8">
              <BookOpen className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">No entries yet</p>
              <p className="text-xs">Track money you lend or borrow</p>
            </div>
          ) : (
            <div className="space-y-2">
              {pendingEntries.length > 0 && (
                <>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Pending ({pendingEntries.length})
                  </p>
                  {pendingEntries.map((entry) => (
                    <EntryItem
                      key={entry.id}
                      entry={entry}
                      onToggleSettled={toggleSettled}
                      onDelete={deleteEntry}
                    />
                  ))}
                </>
              )}
              {settledEntries.length > 0 && (
                <>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-4">
                    Settled ({settledEntries.length})
                  </p>
                  {settledEntries.slice(0, 3).map((entry) => (
                    <EntryItem
                      key={entry.id}
                      entry={entry}
                      onToggleSettled={toggleSettled}
                      onDelete={deleteEntry}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

interface EntryItemProps {
  entry: LendBorrowEntry;
  onToggleSettled: (id: string) => void;
  onDelete: (id: string) => void;
}

const EntryItem = memo(({ entry, onToggleSettled, onDelete }: EntryItemProps) => {
  return (
    <div
      className={`flex items-center justify-between p-2 rounded-lg border ${
        entry.settled ? 'bg-muted/30 opacity-60' : 'bg-card'
      }`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div
          className={`p-1.5 rounded-full ${
            entry.type === 'lend' ? 'bg-orange-500/20' : 'bg-blue-500/20'
          }`}
        >
          {entry.type === 'lend' ? (
            <ArrowUpRight className="w-3 h-3 text-orange-500" />
          ) : (
            <ArrowDownLeft className="w-3 h-3 text-blue-500" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium truncate">{entry.personName}</p>
            {entry.settled && (
              <Badge variant="outline" className="text-[10px] px-1 py-0">
                Settled
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {entry.note || format(new Date(entry.date), 'MMM d, yyyy')}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 ml-2">
        <span
          className={`text-sm font-semibold whitespace-nowrap ${
            entry.type === 'lend' ? 'text-orange-500' : 'text-blue-500'
          }`}
        >
          ₹{entry.amount.toFixed(0)}
        </span>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={() => onToggleSettled(entry.id)}
        >
          {entry.settled ? (
            <X className="w-3.5 h-3.5" />
          ) : (
            <Check className="w-3.5 h-3.5 text-green-500" />
          )}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 text-destructive hover:text-destructive"
          onClick={() => onDelete(entry.id)}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
});

EntryItem.displayName = 'EntryItem';

export default LendBorrowNotebook;
