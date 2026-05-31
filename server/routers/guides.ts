import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";

// 민원 유형 데이터 (MVP - 서버 저장 없음)
const servicesData = [
  {
    id: "workers-compensation",
    name: "산재 보상 신청",
    badge: "산재보상",
    icon: "🏥",
    description: "산재 보상 신청 관련 서류 및 안내",
    whatIsIt: "일하다 다치거나 질병이 발생한 경우 산재 신청 가능 여부와 절차를 상담하는 민원입니다.",
    guidance: "방문 전 준비하실 서류를 확인해 주세요. 온라인 신청이 가능한 경우 아래 바로가기를 이용하실 수 있습니다.",
    requiredDocuments: [
      "요양급여신청서 (소정 양식)",
      "진단서 또는 초진소견서",
      "사고 경위서 (사업주 확인)",
      "신분증 (본인 방문 시)",
      "대리 신청 시: 위임장 + 대리인 신분증",
    ],
    helpfulDocuments: [
      "사고 당시 상황을 설명하는 추가 자료",
      "병원 진료 기록",
      "사업주 의견서",
    ],
    talkingPoints: "업무 중 다친 일로 산재 신청 절차와 필요한 서류를 상담받고 싶습니다.",
    onlineLink: {
      text: "온라인 신청 바로가기",
      url: "https://www.kcomwel.or.kr",
    },
    disclaimer: "본 안내는 방문 전 준비를 돕기 위한 참고자료입니다. 실제 접수 가능 여부와 처리 결과는 담당 창구 상담 및 관련 법령·내부 기준에 따라 달라질 수 있습니다.",
  },
  {
    id: "insured-status",
    name: "피보험자격",
    badge: "피보험자격",
    icon: "👤",
    description: "피보험자격 관련 서류 및 안내",
    whatIsIt: "근로자의 산재보험 가입 여부와 피보험자격을 확인하는 민원입니다.",
    guidance: "사업장 정보와 근로자 정보를 준비해 주세요.",
    requiredDocuments: [
      "신분증",
      "사업장 정보 (사업장명, 사업자등록번호)",
      "근무 사실 확인 자료",
      "임금 지급 확인 자료",
      "본인 연락처 정보",
    ],
    helpfulDocuments: [
      "업무지시 문자",
      "출퇴근 기록",
      "작업 사진",
      "4대보험 관련 자료",
      "일용직·아르바이트·플랫폼 노동 관련 계약자료",
    ],
    talkingPoints: "현재 다니고 있는 회사의 산재보험 가입 여부를 확인하고 싶습니다.",
    onlineLink: {
      text: "온라인 확인 바로가기",
      url: "https://www.kcomwel.or.kr",
    },
    disclaimer: "본 안내는 방문 전 준비를 돕기 위한 참고자료입니다. 실제 접수 가능 여부와 처리 결과는 담당 창구 상담 및 관련 법령·내부 기준에 따라 달라질 수 있습니다.",
  },
  {
    id: "certificate",
    name: "증명서 발급",
    badge: "증명서발급",
    icon: "📄",
    description: "증명서 발급 관련 서류 및 안내",
    whatIsIt: "산재보험 관련 각종 증명서를 발급받는 민원입니다.",
    guidance: "증명서 종류에 따라 필요한 서류가 다릅니다. 미리 확인하고 방문해 주세요.",
    requiredDocuments: [
      "신분증",
      "증명서 신청 양식",
      "필요시 위임장 및 대리인 신분증",
    ],
    helpfulDocuments: [
      "사업장 정보",
      "근로계약서",
      "급여 명세서",
    ],
    talkingPoints: "산재보험 가입 증명서를 발급받고 싶습니다.",
    onlineLink: {
      text: "온라인 발급 바로가기",
      url: "https://www.kcomwel.or.kr",
    },
    disclaimer: "본 안내는 방문 전 준비를 돕기 위한 참고자료입니다. 실제 접수 가능 여부와 처리 결과는 담당 창구 상담 및 관련 법령·내부 기준에 따라 달라질 수 있습니다.",
  },
  {
    id: "insurance-premium",
    name: "보험료 관련",
    badge: "보험료",
    icon: "💰",
    description: "보험료 관련 서류 및 안내",
    whatIsIt: "산재보험료 납부, 조정, 환급 등 보험료 관련 민원입니다.",
    guidance: "사업장 정보와 보험료 관련 서류를 준비해 주세요.",
    requiredDocuments: [
      "사업자등록증",
      "보험료 고지서",
      "신분증",
    ],
    helpfulDocuments: [
      "근로자 명부",
      "급여 명세서",
      "사업 실적 자료",
    ],
    talkingPoints: "보험료 납부 현황을 확인하고 싶습니다.",
    onlineLink: {
      text: "온라인 조회 바로가기",
      url: "https://www.kcomwel.or.kr",
    },
    disclaimer: "본 안내는 방문 전 준비를 돕기 위한 참고자료입니다. 실제 접수 가능 여부와 처리 결과는 담당 창구 상담 및 관련 법령·내부 기준에 따라 달라질 수 있습니다.",
  },
  {
    id: "online-service",
    name: "온라인 서비스 안내",
    badge: "온라인안내",
    icon: "🌐",
    description: "온라인 서비스 이용 방법 안내",
    whatIsIt: "근로복지공단의 온라인 서비스 이용 방법을 안내하는 민원입니다.",
    guidance: "온라인으로 처리 가능한 민원을 확인하고 이용해 주세요.",
    requiredDocuments: [
      "신분증 (온라인 본인인증용)",
    ],
    helpfulDocuments: [
      "민원 관련 서류",
      "사업장 정보",
    ],
    talkingPoints: "온라인으로 처리할 수 있는 민원이 무엇인지 알고 싶습니다.",
    onlineLink: {
      text: "온라인 서비스 바로가기",
      url: "https://www.kcomwel.or.kr",
    },
    disclaimer: "본 안내는 방문 전 준비를 돕기 위한 참고자료입니다. 실제 접수 가능 여부와 처리 결과는 담당 창구 상담 및 관련 법령·내부 기준에 따라 달라질 수 있습니다.",
  },
];

export const guidesRouter = router({
  // ============ 공개 API (비로그인 접근 가능) ============

  // 공개 API: 민원 유형 목록 조회
  listServices: publicProcedure.query(async () => {
    return servicesData;
  }),

  // 공개 API: 민원 상세 정보 조회
  getService: publicProcedure
    .input(z.object({ serviceId: z.string() }))
    .query(async ({ input }) => {
      const service = servicesData.find((s) => s.id === input.serviceId);
      if (!service) {
        throw new Error("민원 유형을 찾을 수 없습니다.");
      }
      return service;
    }),
});
