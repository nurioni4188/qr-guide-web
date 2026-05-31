import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-background">
          <div className="flex flex-col items-center w-full max-w-2xl p-8">
            <AlertTriangle
              size={48}
              className="text-destructive mb-6 flex-shrink-0"
            />

            <h2 className="text-xl mb-4 text-[#1a2533]">페이지를 불러올 수 없습니다.</h2>

            <p className="text-sm text-[#607d8b] mb-6 text-center">
              일시적인 오류가 발생했습니다. 페이지를 새로고침하거나 홈으로 돌아가주세요.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-[#2d7dd2] text-white",
                  "hover:bg-[#1a5fa8] cursor-pointer"
                )}
              >
                <RotateCcw size={16} />
                새로고침
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-slate-200 text-[#1a2533]",
                  "hover:bg-slate-300 cursor-pointer"
                )}
              >
                홈으로
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
