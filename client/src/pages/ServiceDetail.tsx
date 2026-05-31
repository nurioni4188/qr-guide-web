import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DocumentList from "@/components/DocumentList";
import Header from "@/components/Header";
import InfoBox from "@/components/InfoBox";
import { SaveGuideButton } from "@/components/SaveGuideButton";
import { ExternalLink } from "lucide-react";
import { useLocation } from "wouter";

interface ServiceContent {
  name: string;
  badge: string;
  icon: string;
  description: string;
  whatIsIt: string;
  guidance: string;
  documents: string[];
  talkingPoints: string;
  onlineLink?: {
    text: string;
    url: string;
  };
  notes?: string[];
}

const serviceData: Record<string, ServiceContent> = {
  "workers-compensation": {
    name: "산재 보상 신청",
    badge: "산재보상",
    icon: "🏥",
    description: "산재 보상 신청 관련 서류 및 안내",
    whatIsIt:
      "일하다 다치거나 질병이 발생한 경우 산재 신청 가능 여부와 절차를 상담하는 민원입니다.",
    guidance:
      "방문 전 준비하실 서류를 확인해 주세요. 온라인 신청이 가능한 경우 아래 바로가기를 이용하실 수 있습니다.",
    documents: [
      "요양급여신청서 (소정 양식)",
      "진단서 또는 초진소견서",
      "사고 경위서 (사업주 확인)",
      "신분증 (본인 방문 시)",
      "대리 신청 시: 위임장 + 대리인 신분증",
    ],
    talkingPoints:
      "업무 중 다친 일로 산재 신청 절차와 필요한 서류를 상담받고 싶습니다.",
    onlineLink: {
      text: "온라인 신청 바로가기",
      url: "https://www.kcomwel.or.kr",
    },
    notes: [
      "업무상 재해 인정 여부는 제출자료와 조사 결과에 따라 달라질 수 있습니다.",
    ],
  },
  "insured-status": {
    name: "피보험자격",
    badge: "피보험자격",
    icon: "👤",
    description: "피보험자격 관련 서류 및 안내",
    whatIsIt:
      "근무 이력, 고용보험 취득 또는 상실 신고 여부, 가입 기간이 실제와 맞는지 확인하는 민원입니다.",
    guidance:
      "아래 서류를 미리 준비하시면 창구 대기 시간을 줄일 수 있습니다.",
    documents: [
      "신분증",
      "근무한 사업장명과 근무기간",
      "급여명세서, 근로계약서, 출퇴근 기록 등 보유 자료",
      "문자, 이메일, 통지서 등 관련 자료",
    ],
    talkingPoints:
      "고용보험 취득 또는 상실 이력이 실제 근무 내용과 맞는지 확인하고 싶습니다.",
    notes: [
      "사실관계 확인을 위해 추가 자료 제출이나 사업장 확인 절차가 필요할 수 있습니다.",
    ],
  },
  certificate: {
    name: "증명서 발급",
    badge: "증명서발급",
    icon: "📄",
    description: "증명서 발급 관련 서류 및 안내",
    whatIsIt:
      "고용보험, 산재보험 가입 증명서 등 필요한 증명서를 발급받는 민원입니다.",
    guidance:
      "온라인 발급이 가능한 증명서는 토탈서비스에서 즉시 발급받으실 수 있습니다. 방문 시 신분증을 반드시 지참해 주세요.",
    documents: [
      "신분증 (본인 확인 필수)",
      "발급 대상 증명서명 사전 확인",
      "대리 발급: 위임장 + 위임인·대리인 신분증",
      "온라인 발급 가능 여부 먼저 확인 권장",
    ],
    talkingPoints:
      "온라인에서 발급받을 수 있는 증명서가 있는지 확인하고, 필요한 증명서를 발급받고 싶습니다.",
    onlineLink: {
      text: "증명서 온라인 발급",
      url: "https://www.kcomwel.or.kr",
    },
    notes: [
      "발급 종류: 고용보험 가입증명, 산재보험 가입증명 등",
    ],
  },
  "insurance-premium": {
    name: "보험료 관련",
    badge: "보험료",
    icon: "💰",
    description: "보험료 관련 서류 및 안내",
    whatIsIt:
      "사업장의 고용·산재보험 보험료 조회, 납부, 정정과 관련된 민원입니다.",
    guidance:
      "보험료 조회·납부는 고용·산재보험 토탈서비스에서 편리하게 이용하실 수 있습니다. 사업장 관리번호를 미리 확인해 주세요.",
    documents: [
      "사업장 관리번호",
      "납부 확인: 납부영수증 또는 통보 문서",
      "정정 요청: 정정 사유 관련 증빙자료",
      "사업자등록증 (사업장 문의 기본 확인용)",
    ],
    talkingPoints:
      "사업장 보험료 관련 내용을 확인하고 싶습니다.",
    onlineLink: {
      text: "보험료 조회·납부",
      url: "https://www.kcomwel.or.kr",
    },
    notes: [
      "보험료 조회·납부는 온라인 우선 이용을 권장합니다.",
    ],
  },
  "online-service": {
    name: "온라인 서비스 안내",
    badge: "온라인안내",
    icon: "🌐",
    description: "온라인 서비스 이용 방법 안내",
    whatIsIt:
      "창구 방문 없이 집에서 편리하게 처리하실 수 있는 온라인 서비스를 안내합니다.",
    guidance:
      "아래 바로가기 버튼을 눌러 고용·산재보험 토탈서비스를 이용하세요.",
    documents: [
      "별도 서류 없음",
      "공동인증서 또는 간편 로그인 준비",
      "주요 온라인 서비스: 자격확인, 증명서발급, 보험료 납부, 신청서 제출",
    ],
    talkingPoints:
      "온라인으로 처리할 수 있는 서비스가 있는지 확인하고 싶습니다.",
    onlineLink: {
      text: "고용·산재보험 토탈서비스",
      url: "https://www.kcomwel.or.kr",
    },
  },
};

export default function ServiceDetail() {
  const [location, navigate] = useLocation();
  const serviceId = location.split("/").pop() || "";
  const service = serviceData[serviceId];

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-[#1a2533]">
            서비스를 찾을 수 없습니다.
          </p>
          <Button onClick={() => navigate("/")} className="bg-[#2d7dd2]">
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header
        title={service.name}
        badge={service.badge}
        icon={service.icon}
        showBackButton
      />

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
