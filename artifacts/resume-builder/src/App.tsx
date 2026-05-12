import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ResumeProvider } from "@/contexts/ResumeContext";

import HomePage from "@/pages/HomePage";
import BuilderPage from "@/pages/BuilderPage";
import SharePage from "@/pages/SharePage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/builder" component={BuilderPage} />
      <Route path="/share/:id" component={SharePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ResumeProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ResumeProvider>
    </QueryClientProvider>
  );
}

export default App;
