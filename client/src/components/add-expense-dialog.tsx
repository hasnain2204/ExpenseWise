import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, CalendarIcon, DollarSign, Users, X } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FRIENDS, GROUPS, CURRENCIES } from "@/lib/mock-data";
import { useIsMobile } from "@/hooks/use-mobile";

export function AddExpenseDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [splitType, setSplitType] = useState("equal");
  const [currency, setCurrency] = useState("USD");

  const currentCurrencySymbol = CURRENCIES.find(c => c.code === currency)?.symbol || "$";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setOpen(false);
    setAmount("");
    setDescription("");
  };

  const FormContent = () => (
    <>
      <div className="bg-primary p-6 text-white shrink-0 transition-all duration-300">
          <DialogHeader className="hidden md:block">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              Add an expense
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-2 md:mt-8 flex items-start gap-4">
            <div className="relative">
               <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="h-10 w-auto min-w-[80px] bg-white/20 border-transparent text-white font-bold hover:bg-white/30 focus:ring-0 focus:ring-offset-0 px-3 rounded-lg">
                  <SelectValue>{currency}</SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  {CURRENCIES.map(c => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code} - {c.name} ({c.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 flex items-baseline gap-1 border-b border-white/30 pb-2 transition-colors focus-within:border-white">
              <span className="text-4xl font-medium opacity-80">{currentCurrencySymbol}</span>
              <Input 
                type="number" 
                placeholder="0.00"
                className="text-5xl font-bold bg-transparent border-none text-white placeholder:text-white/50 focus-visible:ring-0 p-0 h-auto shadow-none selection:bg-white/30 w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 bg-card space-y-6 overflow-y-auto max-h-[60vh] md:max-h-none">
          <div className="space-y-2">
            <Label>Description</Label>
            <Input 
              placeholder="What's this for?" 
              className="h-12 text-lg bg-muted/30 border-muted focus:bg-white transition-colors"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Payer</Label>
              <Select defaultValue="you">
                <SelectTrigger className="h-12 bg-muted/30 border-muted">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="you">You</SelectItem>
                  {FRIENDS.map(f => (
                    <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Split</Label>
              <Select value={splitType} onValueChange={setSplitType}>
                <SelectTrigger className="h-12 bg-muted/30 border-muted">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equal">Equally</SelectItem>
                  <SelectItem value="exact">Exact Amount</SelectItem>
                  <SelectItem value="percent">Percentage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
             <Label>With</Label>
             <div className="flex flex-wrap gap-2">
               {FRIENDS.slice(0,3).map((friend) => (
                 <div key={friend.id} className="flex items-center gap-2 bg-muted/50 pl-1 pr-3 py-1 rounded-full border border-border/50 hover:bg-muted cursor-pointer transition-colors">
                   <img src={friend.avatar || ""} className="w-6 h-6 rounded-full bg-gray-200" />
                   <span className="text-sm font-medium">{friend.name}</span>
                   <X className="w-3 h-3 text-muted-foreground hover:text-destructive ml-1" />
                 </div>
               ))}
               <Button variant="outline" size="sm" className="rounded-full h-8 border-dashed">
                 <Plus className="w-3 h-3 mr-1" /> Add
               </Button>
             </div>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal bg-muted/30 border-muted",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="pt-4 flex gap-3 sticky bottom-0 bg-card pb-safe">
            <Button type="button" variant="outline" className="flex-1 h-12" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1 h-12 font-semibold text-md shadow-lg shadow-primary/20">Save Expense</Button>
          </div>
        </form>
    </>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {children || (
             <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 font-semibold px-6">
                <Plus className="w-5 h-5 mr-2" />
                Add Expense
             </Button>
          )}
        </DrawerTrigger>
        <DrawerContent className="h-[85vh] p-0 gap-0 overflow-hidden rounded-t-[2rem]">
          <DrawerHeader className="text-left sr-only">
            <DrawerTitle>Add Expense</DrawerTitle>
          </DrawerHeader>
          <FormContent />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 font-semibold px-6">
            <Plus className="w-5 h-5 mr-2" />
            Add Expense
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0 border-none shadow-2xl">
        <FormContent />
      </DialogContent>
    </Dialog>
  );
}
