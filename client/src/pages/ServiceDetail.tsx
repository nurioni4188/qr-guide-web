import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";
import { GUIDES_DATA } from "@/data/guides";

interface ServiceDetailProps {
  params: {
    serviceId: string;
  };
}

export default function ServiceDetail({ params }: ServiceDetailProps) {
  const [, navigate] = useLocation();
  const serviceId = params.serviceId;

  // 정적 데이터에서 민원 상세 정보 조회
  const service = GUIDES_DATA[serviceId];

  const handleGoBack = () => {
    navigate("/");
  };

  if (!service) {
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

        {/* 3. 전형적인 사례 */}
        {service.typicalCases && service.typicalCases.length > 0 && (
          <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="mb-3 text-lg font-bold text-[#1a2533]">
              전형적인 사례
            </h2>
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
        )}

        {/* 4. 방문 전 체크리스트 */}
        <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-bold text-[#1a2533]">
            방문 전 체크리스트
          </h2>
          <div className="space-y-3">
            {service.checklist.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <input
                  type="checkbox"
                  id={`checklist-${idx}`}
                  className="mt-1 h-4 w-4 rounded border-[#2d7dd2] text-[#2d7dd2] cursor-pointer"
                  disabled
                />
                <label
                  htmlFor={`checklist-${idx}`}
                  className="flex-1 text-sm text-[#1a2533] sm:text-base cursor-pointer"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* 5. 필수 서류 */}
        <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-bold text-[#1a2533]">
            필수 서류
          </h2>
          <ul className="space-y-2">
            {service.preparationMaterials.required.map((material, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex-shrink-0 text-red-500 font-bold">
                  ★
                </span>
                <span className="text-sm text-[#1a2533] sm:text-base">
                  {material}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* 6. 도움이 되는 서류 */}
        {service.preparationMaterials.helpful &&
          service.preparationMaterials.helpful.length > 0 && (
            <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="mb-3 text-lg font-bold text-[#1a2533]">
                도움이 되는 서류
              </h2>
              <ul className="space-y-2">
                {service.preparationMaterials.helpful?.map((material: string, idx: number) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 text-[#2d7dd2] font-bold">
                      ◆
                    </span>
                    <span className="text-sm text-[#1a2533] sm:text-base">
                      {material}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

        {/* 7. 신청 절차 */}
        {service.procedure && service.procedure.length > 0 && (
          <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="mb-3 text-lg font-bold text-[#1a2533]">
              신청 절차
            </h2>
            <div className="space-y-4">
              {service.procedure?.map((proc: any, idx: number) => (
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

        {/* 10. 버튼 영역 */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* 온라인 신청 바로가기 - 파란색 채움 */}
          {service.onlineLink && (
            <Button
              asChild
              className="gap-2 bg-[#2d7dd2] py-4 text-sm font-semibold hover:bg-[#1a5fa8] sm:py-5 sm:text-base"
            >
              <a
                href={service.onlineLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                온라인 신청
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}

          {/* 서식 확인 - 노란색 테두리 */}
          {service.formCheckUrl && (
            <Button
              asChild
              variant="outline"
              className="gap-2 border-2 border-[#f0a500] py-4 text-sm font-semibold text-[#f0a500] hover:bg-[#fffbf0] sm:py-5 sm:text-base"
            >
              <a
                href={service.formCheckUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                서식 확인
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}

          {/* 법정서식 보기 - 회색 테두리 */}
          {service.legalFormUrl && (
            <Button
              asChild
              variant="outline"
              className="gap-2 border-2 border-[#b0bec5] py-4 text-sm font-semibold text-[#607d8b] hover:bg-[#f5f5f5] sm:py-5 sm:text-base"
            >
              <a
                href={service.legalFormUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                법정서식 보기
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>

        {/* 11. 참고 고지문 */}
        <Card className="border-[1.5px] border-amber-200 bg-amber-50 p-5 sm:p-6">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-700">
            📋 참고 고지문
          </div>
          <p className="text-sm text-amber-900 leading-relaxed">
            {service.disclaimer}
          </p>
        </Card>
      </main>
    </div>
  );
}
