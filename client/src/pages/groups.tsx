import { Layout } from "@/components/layout";
import { GROUPS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Users, Home, Plane, Calendar } from "lucide-react";

export default function GroupsPage() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">Groups</h1>
          <p className="text-muted-foreground text-sm md:text-base">Shared expenses for trips, housemates, and more.</p>
        </div>
        <Button className="gap-2 h-10 md:h-11">
          <Plus className="w-4 h-4" />
          Create Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {GROUPS.map((group) => (
          <Card key={group.id} className="group cursor-pointer border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary border border-primary/10 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {group.image ? (
                    <img src={group.image} className="w-full h-full object-cover rounded-2xl opacity-90" />
                  ) : (
                    <Users className="w-8 h-8" />
                  )}
                </div>
                <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {group.type}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{group.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{group.members.length} members involved</p>
              
              <div className="flex -space-x-2 overflow-hidden">
                 {/* Mock member avatars */}
                 {[1,2,3].map(i => (
                   <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-gray-200" />
                 ))}
                 <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-background bg-muted text-[10px] font-bold text-muted-foreground">
                   +2
                 </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <button className="flex flex-col items-center justify-center h-full min-h-[200px] rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 gap-4 text-muted-foreground hover:text-primary">
          <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-semibold">Create new group</span>
        </button>
      </div>
    </Layout>
  );
}
