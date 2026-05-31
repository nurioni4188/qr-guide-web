import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DocumentList from "@/components/DocumentList";
import Header from "@/components/Header";
import InfoBox from "@/components/InfoBox";
import { SaveGuideButton } from "@/components/SaveGuideButton";
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
    { serviceId },
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
                {service.name}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {/* What is it? */}
        <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-bold text-[#1a2533]">
            이 민원은 무엇인가요?
          </h2>
          <p className="text-sm leading-relaxed text-[#1a2533] sm:text-base">
            {service.whatIsIt}
          </p>
        </Card>

        {/* Guidance */}
        <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-bold text-[#1a2533]">
            방문 전 준비하세요
          </h2>
          <p className="text-sm leading-relaxed text-[#1a2533] sm:text-base">
            {service.guidance}
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          {service.onlineLink && (
            <a
              href={service.onlineLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full gap-2 bg-[#2d7dd2] py-5 text-base font-semibold hover:bg-[#1a5fa8] sm:py-6">
                {service.onlineLink.text}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          )}
          <div className="flex-1">
            <SaveGuideButton
              serviceId={serviceId}
              serviceName={service.name}
              content={`${service.name}\n\n${service.whatIsIt}\n\n필수 서류:\n${service.documents.join("\n")}\n\n${service.talkingPoints}`}
            />
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-8">
          <DocumentList documents={service.documents} />
        </div>

        {/* Talking Points */}
        <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-bold text-[#1a2533]">
            창구에서 이렇게 말해보세요
          </h2>
          <p className="rounded-lg bg-[#eaf2fd] p-4 text-sm font-semibold text-[#1a3a5c] sm:text-base">
            "{service.talkingPoints}"
          </p>
        </Card>

        {/* Notes */}
        {service.notes && service.notes.length > 0 && (
          <div className="mb-8">
            <InfoBox type="warning" title="유의사항">
              <ul className="space-y-1">
                {service.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </InfoBox>
          </div>
        )}

        {/* Additional Info */}
        <Card className="border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[#607d8b]">
            ℹ️ 공통 안내
          </div>
          <p className="text-sm text-[#1a2533]">
            본 안내는 방문 민원인의 편의를 위한 사전 안내 자료입니다. 실제 처리 가능 여부와 세부 판단은 관련 법령, 제출자료, 담당자 확인에 따라 달라질 수 있습니다.
          </p>
        </Card>
      </main>
    </div>
  );
}
