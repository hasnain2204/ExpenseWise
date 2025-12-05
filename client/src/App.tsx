import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import FriendsPage from "@/pages/friends";
import GroupsPage from "@/pages/groups";
import ActivityPage from "@/pages/activity";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/friends" component={FriendsPage} />
      <Route path="/groups" component={GroupsPage} />
      <Route path="/activity" component={ActivityPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
