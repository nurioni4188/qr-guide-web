const COMMON_DISCLAIMER =
  "본 안내는 방문 전 준비를 돕기 위한 일반 안내입니다. 실제 처리 여부와 결과는 관련 법령, 사실관계, 제출자료, 담당기관 확인에 따라 달라질 수 있습니다. 구체적인 신청 가능 여부는 공식 민원 안내 또는 담당 지사를 통해 확인하시기 바랍니다.";

export interface GuideService {
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

export const GUIDES_DATA: Record<string, GuideService> = {
  "workers-compensation": {
    id: "workers-compensation",
    title: "산재 보상 신청",
    subtitle: "업무 중 다치거나 업무로 인해 질병이 발생한 경우",
    badge: "산재보상",
    icon: "🏥",
    description: "산재 보상 신청 관련 서류 및 안내",
    typicalCases: [
      "업무 중 발생한 사고",
      "출장 또는 외근 중 발생한 사고",
      "출퇴근 중 발생한 사고",
      "장시간 반복 업무로 인한 질병",
      "유해물질, 소음, 중량물 취급 등 업무환경과 관련된 질병",
      "업무상 사고 이후 장해가 남은 경우",
      "업무상 사유로 사망한 경우",
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
    onlineLink: "https://online.kcomwel.or.kr/ui/index.do?task=form&formSEQ=6",
    disclaimer: COMMON_DISCLAIMER,
  },
  "insured-status": {
    id: "insured-status",
    title: "피보험자격",
    subtitle: "고용보험 취득 또는 상실 여부가 실제 근무사실과 다를 때",
    badge: "피보험자격",
    icon: "👤",
    description: "피보험자격 관련 서류 및 안내",
    typicalCases: [
      "실제 근무했지만 고용보험 취득 신고가 되어 있지 않은 경우",
      "퇴사일과 고용보험 상실일이 다른 경우",
      "사업장에서 신고한 내용과 실제 근무기간이 다른 경우",
      "실업급여 신청 전 고용보험 이력이 다르게 확인되는 경우",
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
      "고용보험 피보험자격 확인 여부는 실제 근무사실, 임금 지급 내역, 사업장 신고자료 등을 종합하여 판단됩니다.",
    onlineLink: "https://online.kcomwel.or.kr/ui/index.do?task=form&formSEQ=7",
    disclaimer: COMMON_DISCLAIMER,
  },
  "employment-insurance-status": {
    id: "employment-insurance-status",
    title: "고용보험 피보험자격 확인청구 안내",
    subtitle: "고용보험 기록이 실제 근무사실과 다를 때",
    badge: "고용보험",
    icon: "📋",
    description: "고용보험 피보험자격 확인청구 관련 서류 및 안내",
    typicalCases: [
      "실제 근무했지만 고용보험 취득 신고가 되어 있지 않은 경우",
      "퇴사일과 고용보험 상실일이 다른 경우",
      "사업장에서 신고한 내용과 실제 근무기간이 다른 경우",
    ],
    whatIsThis:
      "고용보험 기록이 실제 근무사실과 다를 때 이를 확인하고 정정하는 절차입니다.",
    whoApplies: "고용보험 기록이 실제 근무사실과 다른 근로자",
    preparationMaterials: {
      required: [
        "신분증",
        "근무한 사업장명",
        "실제 입사일과 퇴사일",
        "임금 지급 내역",
      ],
      helpful: [
        "근로계약서",
        "급여명세서",
        "통장 입금내역",
        "출퇴근 기록",
      ],
    },
    checklist: [
      "실제 입사일과 퇴사일을 알고 있다.",
      "근무한 사업장명을 알고 있다.",
      "임금 지급 내역을 확인했다.",
      "고용보험 이력에서 어떤 부분이 다른지 확인했다.",
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
      "고용보험 피보험자격 확인 여부는 실제 근무사실, 임금 지급 내역, 사업장 신고자료 등을 종합하여 판단됩니다.",
    onlineLink: "https://online.kcomwel.or.kr/ui/index.do?task=form&formSEQ=8",
    disclaimer: COMMON_DISCLAIMER,
  },
  "certificate": {
    id: "certificate",
    title: "증명서 발급",
    subtitle: "각종 증명서 발급이 필요한 경우",
    badge: "증명서",
    icon: "📄",
    description: "증명서 발급 관련 서류 및 안내",
    typicalCases: [
      "산재보험 가입 증명서가 필요한 경우",
      "고용보험 가입 증명서가 필요한 경우",
      "근로자 신분 확인 증명서가 필요한 경우",
      "보험료 납입 증명서가 필요한 경우",
    ],
    whatIsThis: "근로복지공단에서 발급하는 각종 증명서를 신청하는 절차입니다.",
    whoApplies: "각종 증명서가 필요한 근로자 또는 사업주",
    preparationMaterials: {
      required: [
        "신분증",
        "필요한 증명서 종류",
        "신청인 연락처",
      ],
      helpful: [
        "사업장명 또는 사업자등록번호",
        "근무 기간",
      ],
    },
    checklist: [
      "어떤 증명서가 필요한지 확인했다.",
      "신분증을 준비했다.",
      "신청인 연락처를 준비했다.",
      "온라인 발급 가능 여부를 확인했다.",
    ],
    procedure: [
      { step: 1, description: "필요한 증명서 종류 확인" },
      { step: 2, description: "신청서 작성" },
      { step: 3, description: "방문 또는 온라인 신청" },
      { step: 4, description: "증명서 발급" },
    ],
    onlineInfo: "많은 증명서가 온라인으로 발급 가능합니다.",
    cautions:
      "증명서 발급 시간은 신청 방법과 증명서 종류에 따라 다를 수 있습니다.",
    onlineLink: "https://online.kcomwel.or.kr/ui/index.do?task=form&formSEQ=9",
    disclaimer: COMMON_DISCLAIMER,
  },
  "insurance-premium": {
    id: "insurance-premium",
    title: "보험료 관련",
    subtitle: "보험료 납입, 조회, 환급 등",
    badge: "보험료",
    icon: "💰",
    description: "보험료 관련 서류 및 안내",
    typicalCases: [
      "보험료 납입 내역을 확인하고 싶은 경우",
      "보험료 환급을 신청하고 싶은 경우",
      "보험료 납입 방법을 알고 싶은 경우",
    ],
    whatIsThis: "고용보험과 산재보험의 보험료 납입, 조회, 환급 등에 관한 절차입니다.",
    whoApplies: "보험료 관련 문의가 필요한 사업주 또는 근로자",
    preparationMaterials: {
      required: [
        "신분증",
        "사업자등록번호 또는 사업장명",
      ],
      helpful: [
        "보험료 고지서",
        "납입 영수증",
      ],
    },
    checklist: [
      "사업자등록번호를 준비했다.",
      "신분증을 준비했다.",
      "온라인 조회 가능 여부를 확인했다.",
    ],
    procedure: [
      { step: 1, description: "보험료 내역 확인" },
      { step: 2, description: "납입 또는 환급 신청" },
      { step: 3, description: "처리" },
    ],
    onlineInfo: "온라인으로 보험료 조회 및 납입이 가능합니다.",
    cautions:
      "보험료 납입 기한을 놓치지 않도록 주의하세요.",
    onlineLink: "https://online.kcomwel.or.kr/ui/index.do?task=form&formSEQ=10",
    disclaimer: COMMON_DISCLAIMER,
  },
  "online-service": {
    id: "online-service",
    title: "온라인 서비스 안내",
    subtitle: "온라인 신청 및 서비스 이용 방법",
    badge: "온라인",
    icon: "🌐",
    description: "온라인 서비스 이용 방법 안내",
    typicalCases: [
      "온라인으로 민원을 신청하고 싶은 경우",
      "온라인 서비스 이용 방법을 알고 싶은 경우",
    ],
    whatIsThis: "근로복지공단의 온라인 서비스를 이용하는 방법을 안내합니다.",
    whoApplies: "온라인 서비스를 이용하려는 모든 사용자",
    preparationMaterials: {
      required: [
        "인터넷 연결",
        "신분증",
      ],
    },
    checklist: [
      "인터넷 연결을 확인했다.",
      "신분증을 준비했다.",
    ],
    procedure: [
      { step: 1, description: "근로복지공단 홈페이지 접속" },
      { step: 2, description: "원하는 민원 선택" },
      { step: 3, description: "신청서 작성 및 제출" },
    ],
    onlineInfo: "근로복지공단 홈페이지에서 다양한 온라인 서비스를 이용할 수 있습니다.",
    cautions:
      "온라인 신청 시 정확한 정보를 입력하세요.",
    onlineLink: "https://online.kcomwel.or.kr/ui/index.do?task=form&formSEQ=11",
    disclaimer: COMMON_DISCLAIMER,
  },
};
