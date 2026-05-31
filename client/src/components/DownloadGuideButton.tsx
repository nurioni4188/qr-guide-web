import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Loader2, Share2, Image, FileText } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DownloadGuideButtonProps {
  serviceId: string;
  serviceName: string;
  service: any;
}

export function DownloadGuideButton({
  serviceId,
  serviceName,
  service,
}: DownloadGuideButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    try {
      if (!contentRef.current) return;

      // HTML을 Canvas로 변환
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      // Canvas를 PDF로 변환
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let yPosition = 0;
      let pageHeight = pdf.internal.pageSize.getHeight();

      // 여러 페이지에 걸쳐 이미지 추가
      while (yPosition < imgHeight) {
        if (yPosition > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "PNG", 0, -yPosition, imgWidth, imgHeight);
        yPosition += pageHeight;
      }

      // PDF 다운로드
      pdf.save(`${serviceName}-${new Date().toLocaleDateString("ko-KR")}.pdf`);
      toast.success("PDF가 다운로드되었습니다!");
      setShowDialog(false);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("PDF 생성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScreenshot = async () => {
    setIsLoading(true);
    try {
      if (!contentRef.current) return;

      // HTML을 Canvas로 변환
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      // Canvas를 이미지로 다운로드
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${serviceName}-${new Date().toLocaleDateString("ko-KR")}.png`;
      link.click();

      toast.success("이미지가 다운로드되었습니다!");
      setShowDialog(false);
    } catch (error) {
      console.error("Failed to capture screenshot:", error);
      toast.error("화면 캡처에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      if (!contentRef.current) return;

      // 텍스트 콘텐츠 추출
      const text = contentRef.current.innerText;

      // 클립보드에 복사
      await navigator.clipboard.writeText(text);
      toast.success("안내문이 복사되었습니다!");
      setShowDialog(false);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      toast.error("복사에 실패했습니다.");
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        disabled={isLoading}
        variant="outline"
        className="w-full gap-2 py-5 text-base font-semibold sm:py-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            처리 중...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            안내문 저장하기
          </>
        )}
      </Button>

      {/* 저장 방식 선택 모달 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              안내문 저장하기
            </DialogTitle>
            <DialogDescription>
              원하는 방식으로 안내문을 저장하세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            {/* PDF 다운로드 */}
            <button
              onClick={handleDownloadPDF}
              disabled={isLoading}
              className="w-full flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <FileText className="h-6 w-6 text-[#2d7dd2] flex-shrink-0 mt-1" />
              <div className="text-left">
                <div className="font-semibold text-slate-900">PDF로 저장</div>
                <div className="text-sm text-slate-600">
                  휴대폰에 PDF 파일로 저장됩니다
                </div>
              </div>
            </button>

            {/* 이미지 다운로드 */}
            <button
              onClick={handleScreenshot}
              disabled={isLoading}
              className="w-full flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <Image className="h-6 w-6 text-[#f0a500] flex-shrink-0 mt-1" />
              <div className="text-left">
                <div className="font-semibold text-slate-900">
                  이미지로 저장
                </div>
                <div className="text-sm text-slate-600">
                  화면을 이미지로 저장합니다
                </div>
              </div>
            </button>

            {/* 텍스트 복사 */}
            <button
              onClick={handleCopyToClipboard}
              disabled={isLoading}
              className="w-full flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <Share2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <div className="font-semibold text-slate-900">텍스트 복사</div>
                <div className="text-sm text-slate-600">
                  안내문을 텍스트로 복사합니다
                </div>
              </div>
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900">
            💡 <strong>팁:</strong> 휴대폰 화면 캡처 기능으로도 저장할 수 있습니다
          </div>
        </DialogContent>
      </Dialog>

      {/* 숨겨진 콘텐츠 (PDF/이미지 생성용) */}
      <div ref={contentRef} className="hidden">
        <div className="p-8 bg-white">
          <h1 className="text-2xl font-bold mb-4">{serviceName}</h1>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">이 민원은 무엇인가요?</h2>
            <p className="text-sm text-slate-700">{service.whatIsIt}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">방문 전 준비하세요</h2>
            <p className="text-sm text-slate-700">{service.guidance}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">필수 서류</h2>
            <ul className="text-sm text-slate-700 space-y-1">
              {service.requiredDocuments.map((doc: string, idx: number) => (
                <li key={idx}>
                  {idx + 1}. {doc}
                </li>
              ))}
            </ul>
          </div>

          {service.helpfulDocuments && service.helpfulDocuments.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">
                있으면 도움이 되는 자료
              </h2>
              <ul className="text-sm text-slate-700 space-y-1">
                {service.helpfulDocuments.map((doc: string, idx: number) => (
                  <li key={idx}>• {doc}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">
              창구에서 이렇게 말해보세요
            </h2>
            <p className="text-sm text-slate-700 bg-blue-50 p-3 rounded">
              "{service.talkingPoints}"
            </p>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-slate-600">
              <strong>면책 문구:</strong> {service.disclaimer}
            </p>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            저장 일시: {new Date().toLocaleString("ko-KR")}
          </div>
        </div>
      </div>
    </>
  );
}
