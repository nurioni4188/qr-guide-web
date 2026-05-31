import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Download, Printer } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface InternalReportProps {
  params: {
    serviceId: string;
  };
}

export default function InternalReport({ params }: InternalReportProps) {
  const [, navigate] = useLocation();
  const serviceId = params.serviceId;
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const { data: service, isLoading, error } = trpc.guides.getService.useQuery(
    serviceId,
    { enabled: !!serviceId }
  );

  const handleGoBack = () => {
    navigate(`/service/${serviceId}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    try {
      if (!reportRef.current) return;

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let yPosition = 0;
      let pageHeight = pdf.internal.pageSize.getHeight();

      while (yPosition < imgHeight) {
        if (yPosition > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "PNG", 0, -yPosition, imgWidth, imgHeight);
        yPosition += pageHeight;
      }

      pdf.save(`${service?.title}-내부보고-${new Date().toLocaleDateString("ko-KR")}.pdf`);
      toast.success("보고서가 다운로드되었습니다!");
    } catch (error) {
      console.error("Failed to generate report:", error);
      toast.error("보고서 생성에 실패했습니다.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d7dd2]" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-[#1a2533]">
            보고서를 찾을 수 없습니다.
          </p>
          <Button onClick={handleGoBack} className="bg-[#2d7dd2]">
            돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      {/* 컨트롤 바 */}
      <div className="mb-6 flex items-center justify-between max-w-4xl mx-auto">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-sm font-semibold text-[#2d7dd2] hover:text-[#1a5fa8]"
        >
          <ChevronLeft className="h-4 w-4" />
          돌아가기
        </button>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-[#2d7dd2] text-white rounded-lg hover:bg-[#1a5fa8] font-semibold text-sm"
          >
            <Printer className="h-4 w-4" />
            인쇄하기
          </button>
          <button
            onClick={handleDownloadReport}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 bg-[#f0a500] text-white rounded-lg hover:bg-[#d48a00] font-semibold text-sm disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                다운로드 중...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                PDF 다운로드
              </>
            )}
          </button>
        </div>
      </div>

      {/* 보고서 */}
      <div
        ref={reportRef}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 print:shadow-none print:rounded-none"
      >
        {/* 헤더 */}
        <div className="mb-8 pb-6 border-b-2 border-[#1a3a5c]">
          <div className="text-xs font-bold uppercase tracking-widest text-[#2d7dd2] mb-2">
            근로복지공단 서울동부지사
          </div>
          <h1 className="text-3xl font-black text-[#1a3a5c] mb-2">
            민원 안내 내부 보고서
          </h1>
          <p className="text-sm text-slate-600">
            {new Date().toLocaleDateString("ko-KR")} 작성
          </p>
        </div>

        {/* 민원 정보 */}
        <Card className="mb-8 border-[1.5px] border-slate-200 p-6 bg-[#f4f6fa]">
          <h2 className="text-lg font-bold text-[#1a3a5c] mb-4">1. 민원 정보</h2>
          <div className="space-y-3">
            <div className="flex gap-4">
              <span className="font-semibold text-[#1a3a5c] w-32 flex-shrink-0">
                민원명
              </span>
              <span className="text-slate-700">{service.title}</span>
            </div>
            <div className="flex gap-4">
              <span className="font-semibold text-[#1a3a5c] w-32 flex-shrink-0">
                분류
              </span>
              <span className="text-slate-700">{service.badge}</span>
            </div>
            <div className="flex gap-4">
              <span className="font-semibold text-[#1a3a5c] w-32 flex-shrink-0">
                설명
              </span>
              <span className="text-slate-700">{service.subtitle}</span>
            </div>
          </div>
        </Card>

        {/* 민원 개요 */}
        <Card className="mb-8 border-[1.5px] border-slate-200 p-6">
          <h2 className="text-lg font-bold text-[#1a3a5c] mb-4">2. 민원 개요</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#1a3a5c] mb-2">
                민원 설명
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {service.whatIsThis}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1a3a5c] mb-2">
                신청 대상
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {service.whoApplies}
              </p>
            </div>
          </div>
        </Card>

        {/* 전형적인 사례 */}
        {service.typicalCases && service.typicalCases.length > 0 && (
          <Card className="mb-8 border-[1.5px] border-slate-200 p-6">
            <h2 className="text-lg font-bold text-[#1a3a5c] mb-4">
              3. 전형적인 사례
            </h2>
            <ul className="space-y-2">
              {service.typicalCases.map((caseItem, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-700">
                  <span className="flex-shrink-0 font-semibold text-[#2d7dd2]">
                    {idx + 1}.
                  </span>
                  <span>{caseItem}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* 필수 서류 */}
        <Card className="mb-8 border-[1.5px] border-slate-200 p-6">
          <h2 className="text-lg font-bold text-[#1a3a5c] mb-4">
            4. 필수 서류 (총 {service.preparationMaterials.required.length}개)
          </h2>
          <ul className="space-y-2">
            {service.preparationMaterials.required.map((doc, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-700">
                <span className="flex-shrink-0 font-semibold text-[#2d7dd2]">
                  {idx + 1}.
                </span>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* 도움이 되는 자료 */}
        {service.preparationMaterials.helpful &&
          service.preparationMaterials.helpful.length > 0 && (
            <Card className="mb-8 border-[1.5px] border-slate-200 p-6 bg-[#f9fafb]">
              <h2 className="text-lg font-bold text-[#1a3a5c] mb-4">
                5. 도움이 되는 자료 (총{" "}
                {service.preparationMaterials.helpful.length}개)
              </h2>
              <ul className="space-y-2">
                {service.preparationMaterials.helpful.map((doc, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-700">
                    <span className="flex-shrink-0 font-semibold text-[#f0a500]">
                      •
                    </span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

        {/* 체크리스트 */}
        <Card className="mb-8 border-[1.5px] border-slate-200 p-6">
          <h2 className="text-lg font-bold text-[#1a3a5c] mb-4">
            6. 방문 전 체크리스트
          </h2>
          <ul className="space-y-2">
            {service.checklist.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-700">
                <span className="flex-shrink-0 font-semibold text-[#2d7dd2]">
                  ☐
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* 신청 절차 */}
        {service.procedure && service.procedure.length > 0 && (
          <Card className="mb-8 border-[1.5px] border-slate-200 p-6">
            <h2 className="text-lg font-bold text-[#1a3a5c] mb-4">
              7. 신청 절차
            </h2>
            <div className="space-y-3">
              {service.procedure.map((proc, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2d7dd2] text-white flex items-center justify-center font-bold text-sm">
                    {proc.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm text-slate-700">
                      {proc.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 온라인 정보 및 주의사항 */}
        <Card className="mb-8 border-[1.5px] border-slate-200 p-6">
          <h2 className="text-lg font-bold text-[#1a3a5c] mb-4">
            8. 추가 정보
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#1a3a5c] mb-2">
                온라인 신청 안내
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {service.onlineInfo}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1a3a5c] mb-2">
                주의사항
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {service.cautions}
              </p>
            </div>
          </div>
        </Card>

        {/* 면책 문구 */}
        <Card className="border-[1.5px] border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-3">면책 문구</h2>
          <p className="text-sm text-amber-900 leading-relaxed">
            {service.disclaimer}
          </p>
        </Card>

        {/* 하단 정보 */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-500 text-center">
          <p>
            근로복지공단 서울동부지사 | 작성일:{" "}
            {new Date().toLocaleString("ko-KR")}
          </p>
          <p className="mt-1">
            본 보고서는 내부 참고용이며, 실제 민원 처리는 관련 법령에 따릅니다.
          </p>
        </div>
      </div>

      {/* 인쇄 스타일 */}
      <style>{`
        @media print {
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          .max-w-4xl {
            max-width: 100%;
          }
          .shadow-lg {
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}
