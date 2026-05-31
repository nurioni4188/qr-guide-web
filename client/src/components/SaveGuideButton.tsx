import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

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
  const saveGuideMutation = trpc.guides.saveGuide.useMutation();

  const handleSaveGuide = async () => {
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
    <Button
      onClick={handleSaveGuide}
      disabled={isLoading}
      variant="outline"
      className="gap-2"
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
  );
}
