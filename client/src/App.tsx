import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import ServiceDetail from "@/pages/ServiceDetail";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function TestBanner() {
  return (
    <div className="bg-amber-50 border-b-2 border-amber-300 px-4 py-3 text-center">
      <p className="text-sm font-semibold text-amber-900">
        🧪 <span className="font-bold">테스트 버전</span>입니다. 실제 민원 신청은 공단 방문 또는 온라인 신청 페이지를 이용해주세요.
      </p>
    </div>
  );
}

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
          <TestBanner />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
