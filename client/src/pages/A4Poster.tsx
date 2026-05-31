import { Button } from "@/components/ui/button";
import { ChevronLeft, Printer } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

interface A4PosterProps {
  params: {
    serviceId: string;
  };
}

export default function A4Poster({ params }: A4PosterProps) {
  const [, navigate] = useLocation();
  const serviceId = params.serviceId;

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
            포스터를 찾을 수 없습니다.
          </p>
          <Button onClick={handleGoBack} className="bg-[#2d7dd2]">
            돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-4 px-2 sm:py-8 sm:px-4">
      {/* 컨트롤 바 */}
      <div className="mb-4 flex items-center justify-between max-w-4xl mx-auto">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-sm font-semibold text-[#2d7dd2] hover:text-[#1a5fa8]"
        >
          <ChevronLeft className="h-4 w-4" />
          돌아가기
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-[#2d7dd2] text-white rounded-lg hover:bg-[#1a5fa8] font-semibold text-sm"
        >
          <Printer className="h-4 w-4" />
          인쇄하기
        </button>
      </div>

      {/* A4 포스터 */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
        {/* A4 용지 크기: 210mm x 297mm */}
        <div className="w-full bg-white" style={{ aspectRatio: "210/297" }}>
          {/* 포스터 콘텐츠 */}
          <div className="h-full flex flex-col p-6 sm:p-12 bg-gradient-to-br from-[#1a3a5c] to-[#0f2a47] text-white">
            {/* 헤더 */}
            <div className="mb-8 text-center">
              <div className="text-xs font-bold uppercase tracking-widest text-[#f0a500] mb-2">
                근로복지공단 서울동부지사
              </div>
              <h1 className="text-3xl sm:text-4xl font-black mb-2">
                {service.title}
              </h1>
              <p className="text-sm text-white/80 max-w-2xl mx-auto">
                {service.subtitle}
              </p>
            </div>

            {/* QR 코드 영역 (실제 QR 코드는 인쇄 시 추가) */}
            <div className="flex-1 flex items-center justify-center mb-8">
              <div className="border-2 border-dashed border-white/50 rounded-lg p-8 text-center">
                <div className="text-sm text-white/70 mb-2">QR 코드</div>
                <div className="w-32 h-32 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-white/50 text-xs">QR 코드 삽입</span>
                </div>
              </div>
            </div>

            {/* 안내 정보 */}
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h2 className="font-bold mb-2 text-[#f0a500]">이 민원은 무엇인가요?</h2>
              <p className="text-sm text-white/90 leading-relaxed">
                {service.whatIsThis}
              </p>
            </div>

            {/* 필수 서류 미리보기 */}
            <div className="bg-white/10 rounded-lg p-4">
              <h2 className="font-bold mb-2 text-[#f0a500]">필수 서류</h2>
              <ul className="text-xs text-white/90 space-y-1">
                {service.preparationMaterials.required.slice(0, 5).map((doc, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="flex-shrink-0">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
                {service.preparationMaterials.required.length > 5 && (
                  <li className="text-white/70 italic">
                    외 {service.preparationMaterials.required.length - 5}개 항목
                  </li>
                )}
              </ul>
            </div>

            {/* 하단 정보 */}
            <div className="mt-auto pt-6 border-t border-white/20 text-xs text-white/70 text-center">
              <p>자세한 안내는 QR 코드를 스캔하거나 근로복지공단 홈페이지를 방문하세요</p>
              <p className="mt-1">www.kcomwel.or.kr</p>
            </div>
          </div>
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
