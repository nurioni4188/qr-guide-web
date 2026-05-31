import { publicProcedure, router } from "../_core/trpc";

const COMMON_DISCLAIMER =
  "본 안내는 방문 전 준비를 돕기 위한 일반 안내입니다. 실제 처리 여부와 결과는 관련 법령, 사실관계, 제출자료, 담당기관 확인에 따라 달라질 수 있습니다. 구체적인 신청 가능 여부는 공식 민원 안내 또는 담당 지사를 통해 확인하시기 바랍니다.";

interface GuideService {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  description: string;
  typicalCases: string[];
  applicationTypes?: string[];
  whatIsThis: string;
  whoApplies: string;
  preparationMaterials: {
    required: string[];
    helpful?: string[];
  };
  checklist: string[];
  procedure?: {
    step: number;
    description: string;
  }[];
  onlineInfo: string;
  cautions: string;
  onlineLink?: string;
  disclaimer: string;
}

const guides: Record<string, GuideService> = {
  "workers-compensation": {
    id: "workers-compensation",
    title: "산재보상 신청 안내",
    subtitle: "업무 중 다치거나 업무로 인해 질병이 발생한 경우, 방문 전 필요한 서류와 신청 절차를 확인할 수 있습니다.",
    badge: "산재보상",
    icon: "🏥",
    description: "산재보상 신청 관련 서류 및 안내",
    typicalCases: [
      "업무 중 발생한 사고",
      "출장 또는 외근 중 발생한 사고",
      "출퇴근 중 발생한 사고",
      "장시간 반복 업무로 인한 질병",
      "유해물질, 소음, 중량물 취급 등 업무환경과 관련된 질병",
      "업무상 사고 이후 장해가 남은 경우",
      "업무상 사유로 사망한 경우",
    ],
    applicationTypes: [
      "요양급여 신청",
      "휴업급여 신청",
      "장해급여 신청",
      "유족급여 신청",
      "간병급여 신청",
      "출퇴근 재해 신청",
    ],
    whatIsThis:
      "업무 중 발생한 사고나 질병으로 인한 치료비, 휴업 중 생활비, 장해 또는 사망 시 보상을 받을 수 있는 제도입니다.",
    whoApplies: "업무 중 다친 근로자 또는 업무로 인한 질병이 발생한 근로자",
    preparationMaterials: {
      required: [
        "신분증",
        "사고 또는 질병 발생일자",
        "사고 장소",
        "당시 작업내용",
        "사업장명과 사업장 연락처",
        "치료받은 병원명",
        "진단명 또는 상병명",
        "사고 경위 메모",
        "요양급여신청서",
        "초진소견서 또는 진단서",
        "의무기록 또는 검사자료",
      ],
      helpful: [
        "목격자 진술서",
        "사고 현장 사진 또는 관련 자료",
        "업무지시 문자",
        "출퇴근 기록",
        "작업 사진",
        "4대보험 관련 자료",
      ],
    },
    checklist: [
      "사고일자와 시간을 알고 있다.",
      "사고 장소를 설명할 수 있다.",
      "사고 당시 어떤 일을 하고 있었는지 설명할 수 있다.",
      "치료받은 병원과 진단명을 알고 있다.",
      "사업장명과 연락처를 알고 있다.",
      "사고 경위를 간단히 메모했다.",
      "관련 사진, 문자, 진술서, 진료자료가 있으면 준비했다.",
      "온라인 신청이 가능한지 확인했다.",
    ],
    procedure: [
      { step: 1, description: "병원 진료 및 진단 확인" },
      { step: 2, description: "신청서류 준비" },
      { step: 3, description: "방문, 우편 또는 온라인 접수" },
      { step: 4, description: "사실관계 및 업무관련성 확인" },
      { step: 5, description: "필요 시 추가자료 제출" },
      { step: 6, description: "승인 여부 결정" },
      { step: 7, description: "승인 후 관련 급여 신청" },
    ],
    onlineInfo: "근로복지공단 홈페이지에서 온라인 신청 가능 여부를 확인하세요.",
    cautions:
      "산재 승인 여부는 업무관련성, 의학적 소견, 사실관계 확인 등을 종합하여 판단됩니다. 서류가 부족한 경우 추가 제출이 필요할 수 있습니다.",
    onlineLink: "https://www.kcomwel.or.kr",
    disclaimer: COMMON_DISCLAIMER,
  },
  "employment-insurance-status": {
    id: "employment-insurance-status",
    title: "고용보험 피보험자격 확인청구 안내",
    subtitle:
      "고용보험 취득 또는 상실 여부가 실제 근무사실과 다를 때, 확인청구 전 필요한 자료를 확인할 수 있습니다.",
    badge: "피보험자격",
    icon: "👤",
    description: "고용보험 피보험자격 확인청구 관련 서류 및 안내",
    typicalCases: [
      "실제 근무했지만 고용보험 취득 신고가 되어 있지 않은 경우",
      "퇴사일과 고용보험 상실일이 다른 경우",
      "사업장에서 신고한 내용과 실제 근무기간이 다른 경우",
      "실업급여 신청 전 고용보험 이력이 다르게 확인되는 경우",
      "사업주와 근로자 사이에 근무기간에 대한 이견이 있는 경우",
    ],
    whatIsThis:
      "고용보험 취득 또는 상실 기록이 실제 근무사실과 다를 때 이를 확인하고 정정하는 절차입니다.",
    whoApplies: "고용보험 기록이 실제 근무사실과 다른 근로자",
    preparationMaterials: {
      required: [
        "신분증",
        "근무한 사업장명",
        "사업장 주소 또는 연락처",
        "실제 입사일과 퇴사일",
        "담당했던 업무 내용",
        "임금 지급 내역",
      ],
      helpful: [
        "근로계약서",
        "급여명세서",
        "통장 입금내역",
        "출퇴근 기록",
        "문자, 카카오톡, 이메일 등 업무지시 자료",
        "사원증, 근무표, 출입기록",
        "동료 진술자료",
      ],
    },
    checklist: [
      "실제 입사일과 퇴사일을 알고 있다.",
      "근무한 사업장명을 알고 있다.",
      "임금 지급 내역을 확인했다.",
      "근로계약서 또는 급여명세서가 있는지 확인했다.",
      "출퇴근 기록 또는 업무지시 자료가 있는지 확인했다.",
      "고용보험 이력에서 어떤 부분이 다른지 확인했다.",
      "실업급여 신청과 관련이 있는 경우 관련 일정을 확인했다.",
    ],
    procedure: [
      { step: 1, description: "고용보험 이력 확인" },
      { step: 2, description: "실제 근무사실 정리 및 자료 준비" },
      { step: 3, description: "확인청구 신청" },
      { step: 4, description: "사업장 및 근로자 확인" },
      { step: 5, description: "확인 결과 통보" },
    ],
    onlineInfo: "고용보험 토탈서비스에서 온라인 확인청구 가능 여부를 확인하세요.",
    cautions:
      "고용보험 피보험자격 확인 여부는 실제 근무사실, 임금 지급 내역, 사업장 신고자료 등을 종합하여 판단됩니다. 근무사실을 확인할 수 있는 자료를 함께 준비하는 것이 좋습니다.",
    onlineLink: "https://www.kcomwel.or.kr",
    disclaimer: COMMON_DISCLAIMER,
  },
  "business-insurance": {
    id: "business-insurance",
    title: "사업장 고용·산재보험 가입 및 변경 안내",
    subtitle: "사업장 보험관계 성립, 변경, 소멸 등 방문 전 필요한 정보를 확인할 수 있습니다.",
    badge: "사업장보험",
    icon: "🏢",
    description: "사업장 고용·산재보험 가입 및 변경 관련 서류 및 안내",
    typicalCases: [
      "사업장을 새로 시작한 경우",
      "근로자를 처음 고용한 경우",
      "사업장 주소가 변경된 경우",
      "대표자 또는 사업자 정보가 변경된 경우",
      "사업을 폐업하거나 근로자를 더 이상 고용하지 않는 경우",
      "보험관계 성립 또는 소멸 여부를 확인해야 하는 경우",
    ],
    whatIsThis:
      "사업장을 운영하면서 근로자를 고용할 때 필수적으로 가입해야 하는 고용보험과 산재보험의 신규 가입, 변경, 소멸 절차입니다.",
    whoApplies: "근로자를 고용하는 사업주 또는 담당자",
    preparationMaterials: {
      required: [
        "사업자등록증",
        "대표자 신분증",
        "사업장 주소",
        "사업 개시일",
        "근로자 고용일",
        "근로자 수",
        "담당자 연락처",
      ],
      helpful: [
        "근로계약서",
        "임금대장",
        "출근부 또는 근무표",
        "급여 지급 내역",
        "사업자등록 정정자료",
        "폐업사실증명원",
        "사업장 이전 관련 자료",
        "대표자 변경 관련 자료",
      ],
    },
    checklist: [
      "사업자등록증을 준비했다.",
      "사업 개시일을 알고 있다.",
      "근로자 고용 여부를 확인했다.",
      "근로자 수와 고용일을 정리했다.",
      "사업장 주소와 연락처가 정확하다.",
      "변경 신고인지, 신규 신고인지, 폐업 관련 신고인지 구분했다.",
      "온라인 신고 가능 여부를 확인했다.",
    ],
    procedure: [
      { step: 1, description: "신규 신고 또는 변경 신고 구분" },
      { step: 2, description: "필요 서류 준비" },
      { step: 3, description: "방문, 우편 또는 온라인 신고" },
      { step: 4, description: "신고 내용 확인" },
      { step: 5, description: "보험관계 성립 또는 변경 완료" },
    ],
    onlineInfo: "고용·산재보험 토탈서비스에서 온라인 신고 가능 여부를 확인하세요.",
    cautions:
      "사업장의 보험관계는 근로자 고용 여부, 사업 규모, 산업 분류에 따라 달라질 수 있습니다. 정확한 신고를 위해 담당 지사에 문의하는 것이 좋습니다.",
    onlineLink: "https://www.kcomwel.or.kr",
    disclaimer: COMMON_DISCLAIMER,
  },
  "visit-checklist": {
    id: "visit-checklist",
    title: "지사 방문 전 준비 안내",
    subtitle: "방문 전 담당 지사, 신분증, 신청서류, 접수 가능 여부를 확인하세요.",
    badge: "방문준비",
    icon: "📋",
    description: "지사 방문 전 준비 관련 안내",
    typicalCases: [
      "처음 방문하는 경우",
      "어떤 서류를 준비해야 하는지 모르는 경우",
      "담당 지사가 어디인지 모르는 경우",
      "온라인 신청이 가능한지 확인하고 싶은 경우",
      "대리인이 방문해야 하는 경우",
    ],
    whatIsThis: "근로복지공단 지사를 방문하기 전에 확인해야 할 기본 사항들을 안내합니다.",
    whoApplies: "근로복지공단 지사를 방문하려는 모든 민원인",
    preparationMaterials: {
      required: [
        "신분증",
        "신청인 연락처",
        "사업장명 또는 사업자등록번호",
        "민원 관련 기본정보",
      ],
      helpful: [
        "기존 접수번호가 있는 경우 접수번호",
        "문자 또는 안내문을 받은 경우 해당 화면",
        "대리 방문 시 위임장과 대리인 신분증",
      ],
    },
    checklist: [
      "방문할 지사를 확인했다.",
      "신분증을 준비했다.",
      "신청하려는 민원명을 알고 있다.",
      "관련 서류를 사진 또는 파일로 준비했다.",
      "온라인 신청이 가능한지 확인했다.",
      "대리 방문인 경우 위임장 필요 여부를 확인했다.",
      "접수번호 또는 안내문자가 있는 경우 준비했다.",
    ],
    onlineInfo: "많은 민원이 온라인으로 신청 가능합니다. 방문 전에 온라인 신청 가능 여부를 확인하세요.",
    cautions:
      "방문 전에 담당 지사와 필요 서류를 미리 확인하면 더 빠르고 정확한 처리가 가능합니다.",
    onlineLink: "https://www.kcomwel.or.kr",
    disclaimer: COMMON_DISCLAIMER,
  },
  "document-followup": {
    id: "document-followup",
    title: "서류 보완 및 처리상태 확인 안내",
    subtitle: "이미 접수한 민원의 보완 요청, 진행상태, 추가 제출자료를 확인하세요.",
    badge: "서류보완",
    icon: "📄",
    description: "서류 보완 및 처리상태 확인 관련 안내",
    typicalCases: [
      "접수 후 추가서류 제출 요청을 받은 경우",
      "처리상태가 궁금한 경우",
      "보완서류를 어디에 제출해야 하는지 모르는 경우",
      "문자 안내를 받았지만 내용을 이해하기 어려운 경우",
      "기존 신청내용을 정정하거나 추가 설명이 필요한 경우",
    ],
    whatIsThis:
      "이미 접수한 민원에 대해 추가 서류 제출이 필요하거나 처리 진행상태를 확인하는 절차입니다.",
    whoApplies: "이미 민원을 접수한 민원인",
    preparationMaterials: {
      required: [
        "신분증",
        "접수번호",
        "민원명",
        "신청일자",
        "담당 지사명",
      ],
      helpful: [
        "보완 요청 문자 또는 안내문",
        "추가 제출자료",
        "기존 제출서류 사본",
      ],
    },
    checklist: [
      "접수번호를 확인했다.",
      "어떤 민원인지 확인했다.",
      "보완 요청 문자를 준비했다.",
      "추가로 제출해야 할 자료를 확인했다.",
      "담당 지사 또는 담당 부서를 확인했다.",
      "온라인 제출이 가능한지 확인했다.",
      "기존 제출자료와 새로 제출할 자료를 구분했다.",
    ],
    procedure: [
      { step: 1, description: "보완 요청 안내문 또는 문자 확인" },
      { step: 2, description: "필요한 추가 서류 준비" },
      { step: 3, description: "온라인 또는 방문 제출" },
      { step: 4, description: "제출 완료 확인" },
      { step: 5, description: "처리 진행" },
    ],
    onlineInfo: "온라인으로 서류 제출 및 처리상태 확인이 가능합니다.",
    cautions:
      "보완 요청 기한을 놓치지 않도록 주의하세요. 기한 내에 제출하지 않으면 민원이 반려될 수 있습니다.",
    onlineLink: "https://www.kcomwel.or.kr",
    disclaimer: COMMON_DISCLAIMER,
  },
};

export const guidesRouter = router({
  listServices: publicProcedure.query(async () => {
    return Object.values(guides).map((guide) => ({
      id: guide.id,
      title: guide.title,
      subtitle: guide.subtitle,
      badge: guide.badge,
      icon: guide.icon,
      description: guide.description,
    }));
  }),

  getService: publicProcedure
    .input((input: unknown) => {
      if (typeof input !== "string") throw new Error("Invalid input");
      return input;
    })
    .query(async ({ input: serviceId }) => {
      const guide = guides[serviceId];
      if (!guide) {
        throw new Error(`Service ${serviceId} not found`);
      }
      return guide;
    }),
});
