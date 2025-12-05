import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, User, Activity, Settings, LogOut, Menu, X, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CURRENT_USER } from "@/lib/mock-data";
import { AddExpenseDialog } from "@/components/add-expense-dialog";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/groups", label: "Groups", icon: Users },
    { href: "/friends", label: "Friends", icon: User },
    { href: "/activity", label: "Activity", icon: Activity },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-foreground">SplitFair</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                  isActive
                    ? "bg-primary/10 text-primary font-medium shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 mt-auto">
        <div className="bg-sidebar-accent rounded-2xl p-4 flex items-center gap-3 mb-4 border border-sidebar-border">
           <img 
            src={CURRENT_USER.avatar} 
            alt="User" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" 
           />
           <div className="flex-1 min-w-0">
             <p className="text-sm font-bold truncate">{CURRENT_USER.name}</p>
             <p className="text-xs text-muted-foreground truncate">{CURRENT_USER.email}</p>
           </div>
        </div>
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 border-r border-border bg-sidebar fixed inset-y-0 z-20">
        <NavContent />
      </aside>

      {/* Mobile Top Bar (only shown if needed, but we are moving to bottom nav, so keeping minimal branding or removing) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-border z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="font-bold text-lg">SplitFair</span>
        </div>
        <div className="flex items-center gap-2">
           <img src={CURRENT_USER.avatar} className="w-8 h-8 rounded-full border border-border" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 pt-16 pb-24 md:pt-0 md:pb-0 min-h-screen transition-all duration-300 ease-in-out">
        <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-border z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className="flex flex-col items-center justify-center w-16 h-full cursor-pointer active:scale-95 transition-transform">
                  <item.icon 
                    className={cn(
                      "w-6 h-6 mb-1 transition-colors", 
                      isActive ? "text-primary stroke-[2.5px]" : "text-muted-foreground"
                    )} 
                  />
                  <span className={cn(
                    "text-[10px] font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Mobile Floating Action Button for Add Expense */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <AddExpenseDialog>
          <Button size="icon" className="w-14 h-14 rounded-full shadow-xl shadow-primary/30 bg-primary hover:bg-primary/90 active:scale-95 transition-all duration-200">
            <Plus className="w-7 h-7 text-white" />
          </Button>
        </AddExpenseDialog>
      </div>
    </div>
  );
}
