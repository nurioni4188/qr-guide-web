import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import ServiceDetail from "@/pages/ServiceDetail";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  // 공개 라우트 (모든 방문자 접근 가능)
  return (
    <Switch>
      {/* 공개 라우트 */}
      <Route path={"/"} component={Home} />
      <Route path={"/guide/:serviceId"} component={ServiceDetail} />
      <Route path={"/service/:serviceId"} component={ServiceDetail} /> {/* 하위호환성 */}
      
      {/* 404 */}
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
