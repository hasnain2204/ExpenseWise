import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddExpenseDialog } from "@/components/add-expense-dialog";
import { ExpenseList } from "@/components/expense-list";
import { CURRENT_USER, FRIENDS, formatCurrency } from "@/lib/mock-data";
import { ArrowUpRight, ArrowDownLeft, Wallet, ChevronRight, Bell } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base">Welcome back, {CURRENT_USER.name} 👋</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none gap-2 h-10 md:h-11">
             <Bell className="w-4 h-4" />
             Reminders
          </Button>
          <div className="hidden md:block">
            <AddExpenseDialog />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        <Card className="bg-card border-none shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
             <Wallet className="w-24 h-24 text-primary" />
          </div>
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Balance</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{formatCurrency(CURRENT_USER.balance, CURRENT_USER.currency)}</div>
            <p className="text-xs md:text-sm text-primary font-medium flex items-center">
              <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              Overall, you are owed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-none shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">You Owe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold text-destructive mb-1">{formatCurrency(50.25, "USD")}</div>
            <p className="text-xs md:text-sm text-muted-foreground flex items-center">
              <ArrowDownLeft className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              to 1 friend
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-none shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">You are Owed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{formatCurrency(500.75, "USD")}</div>
            <p className="text-xs md:text-sm text-muted-foreground flex items-center">
              <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              from 2 friends
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-bold">Recent Activity</h2>
            <Link href="/activity">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <ExpenseList limit={5} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-lg md:text-xl font-bold">Friends</h2>
             <Link href="/friends">
               <Button variant="ghost" size="sm">View all</Button>
             </Link>
          </div>
          
          <div className="space-y-3">
            {FRIENDS.map(friend => (
              <div key={friend.id} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 hover:border-border transition-colors group hover:shadow-sm cursor-pointer">
                <div className="flex items-center gap-3">
                  <img src={friend.avatar || ""} className="w-10 h-10 rounded-full object-cover bg-muted border border-border" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors truncate">{friend.name}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[120px]">{friend.email}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  {friend.balance > 0 ? (
                    <p className="text-sm font-bold text-primary">owes {formatCurrency(friend.balance, friend.currency)}</p>
                  ) : friend.balance < 0 ? (
                    <p className="text-sm font-bold text-destructive">owe {formatCurrency(Math.abs(friend.balance), friend.currency)}</p>
                  ) : (
                    <p className="text-sm font-medium text-muted-foreground">settled</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-primary to-emerald-600 text-white border-none overflow-hidden relative">
            <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
            <CardContent className="p-6 relative">
              <h3 className="font-bold text-lg mb-2">Go Premium</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">Get advanced charts, receipt scanning, and currency conversion.</p>
              <Button variant="secondary" className="w-full text-primary font-bold shadow-lg">Upgrade Plan</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
