import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DocumentList from "@/components/DocumentList";
import Header from "@/components/Header";
import InfoBox from "@/components/InfoBox";
import { ExternalLink } from "lucide-react";
import { useLocation } from "wouter";

interface ServiceContent {
  name: string;
  badge: string;
  icon: string;
  description: string;
  guidance: string;
  documents: string[];
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
    guidance:
      "방문 전 준비하실 서류를 확인해 주세요. 온라인 신청이 가능한 경우 아래 바로가기를 이용하실 수 있습니다.",
    documents: [
      "요양급여신청서 (소정 양식)",
      "진단서 또는 초진소견서",
      "사고 경위서 (사업주 확인)",
      "신분증 (본인 방문 시)",
      "대리 신청 시: 위임장 + 대리인 신분증",
    ],
    onlineLink: {
      text: "온라인 신청 바로가기",
      url: "https://www.kcomwel.or.kr",
    },
    notes: [
      "직업병의 경우 추가 서류가 상이할 수 있습니다. 창구에서 확인해 주세요.",
    ],
  },
  "insured-status": {
    name: "피보험자격",
    badge: "피보험자격",
    icon: "👤",
    description: "피보험자격 관련 서류 및 안내",
    guidance:
      "아래 서류를 미리 준비하시면 창구 대기 시간을 줄일 수 있습니다.",
    documents: [
      "고용보험·산재보험 취득/상실/변경 신고서",
      "사업자등록증 사본 (사업장 문의 시)",
      "근로자: 신분증, 근로계약서",
      "사업장: 관리번호 또는 사업장 정보 확인 자료",
    ],
    notes: [
      "취득/상실/변경에 따라 필요 서류가 상이합니다.",
    ],
  },
  certificate: {
    name: "증명서 발급",
    badge: "증명서발급",
    icon: "📄",
    description: "증명서 발급 관련 서류 및 안내",
    guidance:
      "온라인 발급이 가능한 증명서는 토탈서비스에서 즉시 발급받으실 수 있습니다. 방문 시 신분증을 반드시 지참해 주세요.",
    documents: [
      "신분증 (본인 확인 필수)",
      "발급 대상 증명서명 사전 확인",
      "대리 발급: 위임장 + 위임인·대리인 신분증",
      "온라인 발급 가능 여부 먼저 확인 권장",
    ],
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
    guidance:
      "보험료 조회·납부는 고용·산재보험 토탈서비스에서 편리하게 이용하실 수 있습니다. 사업장 관리번호를 미리 확인해 주세요.",
    documents: [
      "사업장 관리번호",
      "납부 확인: 납부영수증 또는 통보 문서",
      "정정 요청: 정정 사유 관련 증빙자료",
      "사업자등록증 (사업장 문의 기본 확인용)",
    ],
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
    guidance:
      "창구 방문 없이 집에서 편리하게 처리하실 수 있는 온라인 서비스를 안내합니다. 아래 바로가기 버튼을 눌러 시작하세요.",
    documents: [
      "별도 서류 없음",
      "고용·산재보험 토탈서비스 이용 방법 안내",
      "공동인증서 또는 간편 로그인 방법 안내",
      "주요 온라인 서비스: 자격확인, 증명서발급, 보험료 납부, 신청서 제출",
    ],
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
        {/* Guidance */}
        <Card className="mb-8 border-[1.5px] border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-[#1a2533] sm:text-base">
            {service.guidance}
          </p>
        </Card>

        {/* Online Link */}
        {service.onlineLink && (
          <div className="mb-8">
            <a
              href={service.onlineLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full gap-2 bg-[#2d7dd2] py-5 text-base font-semibold hover:bg-[#1a5fa8] sm:py-6">
                {service.onlineLink.text}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        )}

        {/* Documents Section */}
        <div className="mb-8">
          <DocumentList documents={service.documents} />
        </div>

        {/* Notes */}
        {service.notes && service.notes.length > 0 && (
          <div className="mb-8">
            <InfoBox type="warning" title="주의사항">
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
            ℹ️ 추가 정보
          </div>
          <ul className="space-y-2 text-sm text-[#1a2533]">
            <li className="flex gap-2">
              <span className="flex-shrink-0">✓</span>
              <span>위 안내는 일반적인 참고용입니다.</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0">✓</span>
              <span>세부 요건은 담당 창구에서 최종 확인해 주세요.</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0">✓</span>
              <span>대리 신청 시 필요한 서류가 추가될 수 있습니다.</span>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  );
}
