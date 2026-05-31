import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Download, Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

interface SaveGuideButtonProps {
  serviceId: string;
  serviceName: string;
  content: string;
}

export function SaveGuideButton({
  serviceId,
  serviceName,
  content,
}: SaveGuideButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { isAuthenticated } = useAuth();
  const saveGuideMutation = trpc.guides.saveGuide.useMutation();

  const handleSaveGuide = async () => {
    // 로그인 확인
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    setIsLoading(true);
    try {
      const fileName = `${serviceName}-${new Date().toLocaleDateString("ko-KR")}.pdf`;

      await saveGuideMutation.mutateAsync({
        serviceId,
        serviceName,
        fileName,
        content,
      });

      toast.success("가이드가 저장되었습니다!");
    } catch (error) {
      console.error("Failed to save guide:", error);
      toast.error("가이드 저장에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleSaveGuide}
        disabled={isLoading}
        variant="outline"
        className="w-full gap-2 py-5 text-base font-semibold sm:py-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            저장 중...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            가이드 저장
          </>
        )}
      </Button>

      {/* 로그인 필요 모달 */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              로그인 필요
            </DialogTitle>
            <DialogDescription>
              가이드를 저장하려면 로그인이 필요합니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-sm text-slate-600">
              로그인하면 다음 기능을 사용할 수 있습니다:
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="flex-shrink-0">✓</span>
                <span>민원 안내 가이드 저장</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">✓</span>
                <span>저장한 가이드 목록 관리</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">✓</span>
                <span>개인화된 서비스 이용</span>
              </li>
            </ul>
          </div>

          <DialogFooter className="flex gap-2 sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setShowLoginDialog(false)}
              className="flex-1"
            >
              취소
            </Button>
            <a href={getLoginUrl()} className="flex-1">
              <Button className="w-full bg-[#2d7dd2] hover:bg-[#1a5fa8]">
                로그인하기
              </Button>
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
