import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { FORM_DB } from "@/data/formDB";

export default function Home() {
  const [, navigate] = useLocation();

  // L1 기준으로 그룹화 (중복 제거)
  const groupedByL1 = FORM_DB.categories.reduce(
    (acc, category) => {
      const existing = acc.find((item) => item.l1 === category.l1);
      if (!existing) {
        acc.push({
          l1: category.l1,
          id: category.id,
          description: category.description,
          warning: category.warning,
          formCount: category.forms.length,
        });
      }
      return acc;
    },
    [] as Array<{
      l1: string;
      id: string;
      description?: string;
      warning?: string;
      formCount: number;
    }>
  );

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2a47] px-4 py-12 text-white sm:px-6 sm:py-16">
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2d7dd2] opacity-10 blur-3xl" />
        <div className="absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-[#f0a500] opacity-5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <div className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#f0a500]">
            근로복지공단 서울동부지사
          </div>

          <h1 className="mb-3 text-3xl font-black leading-tight sm:text-4xl">
            방문 민원 <span className="text-[#f0a500]">QR 길잡이</span>
          </h1>

          <p className="mb-6 text-sm leading-relaxed text-white/70 sm:text-base">
            아래 민원 유형을 선택하시면 필요한 서류와 온라인 이용 경로를 확인할 수 있습니다.
          </p>

          <p className="text-xs text-white/60">
            안내 내용은 일반적인 참고용이며, 세부 요건은 담당 창구에서 최종 확인해 주세요.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Service Grid */}
        <div className="space-y-3">
          {groupedByL1.map((service) => (
            <Card
              key={service.id}
              className="group cursor-pointer overflow-hidden border-[1.5px] border-slate-200 transition-all duration-200 hover:border-[#2d7dd2] hover:shadow-lg"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="flex items-center justify-between p-5 sm:p-6">
                <div className="flex flex-1 items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <div className="inline-block rounded-full bg-[#eaf2fd] px-2.5 py-0.5 text-xs font-bold text-[#1a3a5c]">
                        {service.formCount}개 서식
                      </div>
                      {service.warning && (
                        <div className="inline-block rounded-full bg-[#fff8e1] px-2.5 py-0.5 text-xs font-bold text-[#f0a500]">
                          ⚠ 주의
                        </div>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#1a2533] sm:text-lg">
                      {service.l1}
                    </h3>
                    {service.description && (
                      <p className="text-xs text-[#607d8b] sm:text-sm">
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0 text-[#b0bec5] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#2d7dd2]">
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 rounded-lg border border-[#e8ecf2] bg-[#f4f6fa] p-4 sm:p-6">
          <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[#607d8b]">
            📋 이용 안내
          </div>
          <ul className="space-y-2 text-sm text-[#1a2533]">
            <li className="flex gap-2">
              <span className="flex-shrink-0">✓</span>
              <span>위 민원 유형을 선택하면 필요한 서류 목록을 확인할 수 있습니다.</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0">✓</span>
              <span>각 서식별로 온라인 신청, 서식 확인, 법정서식 보기 링크를 제공합니다.</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0">✓</span>
              <span>대리 신청 시 필요한 서류는 담당 창구에 확인해 주세요.</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0">✓</span>
              <span>
                온라인 신청이 불가능한 경우 지사 방문 시 안내받을 수 있습니다.
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
