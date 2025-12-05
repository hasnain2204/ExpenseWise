import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EXPENSES, CATEGORY_ICONS, CURRENT_USER, formatCurrency } from "@/lib/mock-data";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function ExpenseList({ limit }: { limit?: number }) {
  const expenses = limit ? EXPENSES.slice(0, limit) : EXPENSES;

  return (
    <div className="space-y-4">
      {expenses.map((expense) => {
        const Icon = CATEGORY_ICONS[expense.category] || CATEGORY_ICONS.Other;
        const isPayer = expense.payerId === CURRENT_USER.id;
        
        return (
          <div 
            key={expense.id} 
            className="group flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Icon className="w-6 h-6" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-foreground truncate pr-4">{expense.description}</h4>
                <span className={cn(
                  "font-bold tabular-nums",
                  isPayer ? "text-primary" : "text-destructive"
                )}>
                  {isPayer ? "+" : "-"}{formatCurrency(expense.amount, expense.currency)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  {isPayer ? "You paid" : "Someone paid"}
                  {expense.group && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mx-1" />
                      {expense.group}
                    </>
                  )}
                </span>
                <span>{format(new Date(expense.date), "MMM d")}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
