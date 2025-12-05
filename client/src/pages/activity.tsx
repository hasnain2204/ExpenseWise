import { Layout } from "@/components/layout";
import { ExpenseList } from "@/components/expense-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/mock-data";

export default function ActivityPage() {
  return (
    <Layout>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">Activity</h1>
        <p className="text-muted-foreground text-sm md:text-base">Recent transactions and updates.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <TabsList className="bg-muted/50 p-1 h-12 w-full md:w-auto overflow-x-auto justify-start md:justify-center">
                <TabsTrigger value="all" className="h-10 px-6 rounded-md flex-1 md:flex-none">All</TabsTrigger>
                <TabsTrigger value="you" className="h-10 px-6 rounded-md flex-1 md:flex-none">You</TabsTrigger>
                <TabsTrigger value="groups" className="h-10 px-6 rounded-md flex-1 md:flex-none">Groups</TabsTrigger>
              </TabsList>
              
              <div className="w-full md:w-auto">
                <Select defaultValue="latest">
                  <SelectTrigger className="w-full md:w-[180px] bg-card h-12 md:h-10">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="amount-high">Amount (High-Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="space-y-8">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">This Month</h3>
                <ExpenseList limit={3} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">April 2024</h3>
                <ExpenseList limit={2} />
              </div>
            </TabsContent>
            
             <TabsContent value="you">
              <div className="text-center py-12 text-muted-foreground">
                Filtered view for user activity
              </div>
            </TabsContent>
            <TabsContent value="groups">
               <div className="text-center py-12 text-muted-foreground">
                Filtered view for group activity
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full lg:w-80 space-y-6">
           <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
             <h3 className="font-bold mb-4">Monthly Summary</h3>
             <div className="space-y-4">
               <div className="flex justify-between text-sm">
                 <span className="text-muted-foreground">Total spent</span>
                 <span className="font-bold">{formatCurrency(450.20)}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-muted-foreground">Total received</span>
                 <span className="font-bold text-primary">{formatCurrency(120.00)}</span>
               </div>
               <div className="h-px bg-border" />
               <div className="flex justify-between text-sm">
                 <span className="text-muted-foreground">Net balance</span>
                 <span className="font-bold text-destructive">{formatCurrency(-330.20)}</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </Layout>
  );
}
