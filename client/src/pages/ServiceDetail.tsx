import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DownloadGuideButton } from "@/components/DownloadGuideButton";
import { ExternalLink, Loader2, ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

interface ServiceDetailProps {
  params: {
    serviceId: string;
  };
}

export default function ServiceDetail({ params }: ServiceDetailProps) {
  const [, navigate] = useLocation();
  const serviceId = params.serviceId;

  // 백엔드에서 민원 상세 정보 조회
  const { data: service, isLoading, error } = trpc.guides.getService.useQuery(
    serviceId,
    { enabled: !!serviceId }
  );

  const handleGoBack = () => {
    navigate("/");
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
            서비스를 찾을 수 없습니다.
          </p>
          <Button onClick={handleGoBack} className="bg-[#2d7dd2]">
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header with back button */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2a47] px-4 py-8 text-white sm:px-6 sm:py-12">
        <div className="relative z-10 mx-auto max-w-2xl">
          <button
            onClick={handleGoBack}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            뒤로가기
          </button>

          <div className="flex items-start gap-4">
            <div className="text-4xl">{service.icon}</div>
            <div className="flex-1">
              <div className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#f0a500]">
                {service.badge}
              </div>
              <h1 className="text-3xl font-black leading-tight sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-2 text-sm text-white/80 sm:text-base">
                {service.subtitle}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {/* 1. 이 민원은 무엇인가요? */}
        <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-bold text-[#1a2533]">
            이 민원은 무엇인가요?
          </h2>
          <p className="text-sm leading-relaxed text-[#1a2533] sm:text-base">
            {service.whatIsThis}
          </p>
        </Card>

        {/* 2. 누가 신청하나요? */}
        <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-bold text-[#1a2533]">
            누가 신청하나요?
          </h2>
          <p className="text-sm leading-relaxed text-[#1a2533] sm:text-base">
            {service.whoApplies}
          </p>
        </Card>

        {/* 3. 전형적인 사례들 */}
        {service.typicalCases && service.typicalCases.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1a2533]">
              이런 경우에 신청합니다
            </h2>
            <Card className="border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
              <ul className="space-y-2">
                {service.typicalCases.map((caseItem, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 text-[#2d7dd2] font-bold">
                      •
                    </span>
                    <span className="text-sm text-[#1a2533] sm:text-base">
                      {caseItem}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {/* 4. 방문 전 체크리스트 */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-[#1a2533]">
            방문 전 체크리스트
          </h2>
          <Card className="border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
            <ul className="space-y-3">
              {service.checklist.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <input
                    type="checkbox"
                    className="flex-shrink-0 w-5 h-5 rounded border-slate-300 text-[#2d7dd2] cursor-pointer"
                    disabled
                  />
                  <span className="text-sm text-[#1a2533] sm:text-base pt-0.5">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* 5. 필수 서류 */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-[#1a2533]">필수 서류</h2>
          <Card className="border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
            <ul className="space-y-3">
              {service.preparationMaterials.required.map((doc, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 rounded-full bg-[#2d7dd2] text-white w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-[#1a2533] sm:text-base pt-0.5">
                    {doc}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* 6. 있으면 도움이 되는 자료 */}
        {service.preparationMaterials.helpful &&
          service.preparationMaterials.helpful.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-bold text-[#1a2533]">
                있으면 도움이 되는 자료
              </h2>
              <Card className="border-[1.5px] border-slate-200 bg-[#f9fafb] p-5 sm:p-6">
                <ul className="space-y-2">
                  {service.preparationMaterials.helpful.map((doc, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="flex-shrink-0 text-[#2d7dd2] font-bold">
                        •
                      </span>
                      <span className="text-sm text-[#607d8b] sm:text-base">
                        {doc}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

        {/* 7. 신청 절차 */}
        {service.procedure && service.procedure.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-[#1a2533]">
              신청 절차
            </h2>
            <Card className="border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
              <div className="space-y-4">
                {service.procedure.map((proc, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2d7dd2] text-white font-bold text-sm">
                        {proc.step}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm text-[#1a2533] sm:text-base">
                        {proc.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* 8. 온라인 정보 */}
        <Card className="mb-8 border-[1.5px] border-slate-200 bg-[#eaf2fd] p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-bold text-[#1a3a5c]">
            온라인 신청 안내
          </h2>
          <p className="text-sm leading-relaxed text-[#1a3a5c] sm:text-base">
            {service.onlineInfo}
          </p>
        </Card>

        {/* 9. 주의사항 */}
        <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-bold text-[#1a2533]">
            주의사항
          </h2>
          <p className="text-sm leading-relaxed text-[#1a2533] sm:text-base">
            {service.cautions}
          </p>
        </Card>

        {/* 10. 온라인 바로가기 및 저장하기 */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          {service.onlineLink && (
            <Button
              asChild
              className="flex-1 gap-2 bg-[#2d7dd2] py-5 text-base font-semibold hover:bg-[#1a5fa8] sm:py-6"
            >
              <a
                href={service.onlineLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                온라인 확인 바로가기
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          <div className="flex-1">
            <DownloadGuideButton
              serviceId={serviceId}
              serviceName={service.title}
              service={service}
            />
          </div>
        </div>

        {/* 11. A4 포스터 및 내부 보고서 */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={() => navigate(`/poster/${serviceId}`)}
            variant="outline"
            className="flex-1 gap-2 py-5 text-base font-semibold sm:py-6"
          >
            📄 A4 포스터 보기
          </Button>
          <Button
            onClick={() => navigate(`/report/${serviceId}`)}
            variant="outline"
            className="flex-1 gap-2 py-5 text-base font-semibold sm:py-6"
          >
            📋 내부 보고 요약
          </Button>
        </div>

        {/* 12. 면책 문구 */}
        <Card className="border-[1.5px] border-amber-200 bg-amber-50 p-5 sm:p-6">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-700">
            ⚠️ 면책 문구
          </div>
          <p className="text-sm text-amber-900 leading-relaxed">
            {service.disclaimer}
          </p>
        </Card>
      </main>
    </div>
  );
}
