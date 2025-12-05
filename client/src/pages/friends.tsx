import { Layout } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FRIENDS, formatCurrency } from "@/lib/mock-data";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function FriendsPage() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">Friends</h1>
          <p className="text-muted-foreground text-sm md:text-base">Manage your friendships and balances.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button className="flex-1 md:flex-none gap-2 h-10 md:h-11">
             <UserPlus className="w-4 h-4" />
             Add Friend
          </Button>
        </div>
      </div>

      <div className="relative mb-6 md:mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input placeholder="Search friends by name or email..." className="pl-10 h-12 bg-card border-border/50 text-base md:text-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {FRIENDS.map((friend) => (
          <Card key={friend.id} className="overflow-hidden hover:shadow-md transition-all duration-200 border-border/50 group">
            <CardContent className="p-0">
              <div className="h-20 bg-gradient-to-r from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors" />
              <div className="px-4 md:px-6 pb-6">
                <div className="flex justify-between items-start">
                  <div className="-mt-10 mb-4">
                    <img 
                      src={friend.avatar || ""} 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-4 border-white shadow-sm object-cover bg-white" 
                    />
                  </div>
                  <div className="mt-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Settle up</DropdownMenuItem>
                        <DropdownMenuItem>Remind</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove friend</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-bold text-lg">{friend.name}</h3>
                  <p className="text-sm text-muted-foreground">{friend.email}</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border/50">
                  <span className="text-sm font-medium text-muted-foreground">Balance</span>
                  {friend.balance > 0 ? (
                    <span className="font-bold text-primary">Owes you {formatCurrency(friend.balance, friend.currency)}</span>
                  ) : friend.balance < 0 ? (
                    <span className="font-bold text-destructive">You owe {formatCurrency(Math.abs(friend.balance), friend.currency)}</span>
                  ) : (
                    <span className="font-medium text-muted-foreground">Settled up</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
