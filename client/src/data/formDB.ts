/**
 * 서식 DB — 민원별 준비서류 안내 구조
 * 
 * 민원인 공개용 화면에서 필요한 서식과 온라인 신청 경로를 체계적으로 안내합니다.
 * 내부 검토용 관리자 모드에서는 추가 정보(internalMemo, 공식 출처 등)를 확인할 수 있습니다.
 */

export interface FormButton {
  label: string;
  url: string;
  type: "online" | "form" | "legal"; // 온라인 신청 | 서식 확인 | 법정서식 보기
}

export interface FormCard {
  id: string;
  formName: string; // 서식명
  formalName?: string; // 법정서식명 (예: 고용보험법 시행규칙 별지 제20호서식)
  isOfficial: boolean; // 공식 서식 여부
  applicant: string; // 대상자 (근로자 / 사업주 / 유족 등)
  note?: string; // 민원인 안내문
  searchPath?: string; // 공식 확인 경로 (예: "근로복지공단 홈페이지 > 서식자료실 > '요양급여신청서' 검색")
  buttons: FormButton[]; // 최대 3개 버튼
  internalMemo?: string; // 내부 검토용 메모
}

export interface ServiceCategory {
  id: string;
  l1: string; // 민원 유형 (L1)
  l2: string; // 세부 유형 (L2)
  description?: string;
  warning?: string; // 주의 안내 (예: "⚠ 근로자 본인 직접 청구 민원")
  forms: FormCard[];
}

export interface FormMapping {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  categories: ServiceCategory[];
}

// 공식 URL 상수
export const OFFICIAL_URLS = {
  ONLINE_SERVICE: "https://total.comwel.or.kr/",
  WORK24: "https://www.work24.go.kr",
  GOV_KR: "https://www.gov.kr",
  COMWEL: "https://www.comwel.or.kr",
  LAW: "https://www.law.go.kr",
};

// 서식 DB 데이터
export const FORM_DB: FormMapping = {
  id: "main",
  title: "방문 민원 QR 길잡이",
  subtitle: "민원별 준비서류 안내",
  description:
    "방문 전 필요한 서식과 온라인 신청 경로를 확인하세요.\n서식명과 신청 경로는 공식 홈페이지 기준으로 안내됩니다.",
  categories: [
    {
      id: "workers-compensation",
      l1: "산재 보상 신청",
      l2: "요양급여",
      description: "업무 중 발생한 질병 또는 사고로 인한 치료비 지원",
      forms: [
        {
          id: "form-001",
          formName: "요양급여신청서",
          formalName: "산업재해보상보험법 시행규칙 별지 제1호서식",
          isOfficial: true,
          applicant: "근로자",
          note: "의료기관 방문 전 작성하여 제출하거나 의료기관에서 작성 가능합니다.",
          searchPath:
            "근로복지공단 홈페이지 > 서식자료실 > '요양급여신청서' 검색",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}ui/index.do?task=form&formSEQ=6`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
            {
              label: "법정서식 보기",
              url: `${OFFICIAL_URLS.LAW}`,
              type: "legal",
            },
          ],
          internalMemo:
            "산업재해보상보험법 시행규칙 별지 제1호서식 - 최근 개정: 2024년",
        },
        {
          id: "form-002",
          formName: "진단서 (의료기관 발급)",
          isOfficial: false,
          applicant: "근로자",
          note: "의료기관에서 발급받아야 합니다. 공단에서 직접 발급하지 않습니다.",
          searchPath: "의료기관 > 진단서 발급 요청",
          buttons: [
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "의료기관 직접 발급 서류 - 별도 서식 없음",
        },
      ],
    },
    {
      id: "workers-compensation-rest",
      l1: "산재 보상 신청",
      l2: "휴업급여",
      description: "업무 중 발생한 질병 또는 사고로 인한 휴업 중 생활비 지원",
      forms: [
        {
          id: "form-003",
          formName: "휴업급여신청서",
          formalName: "산업재해보상보험법 시행규칙 별지 제3호서식",
          isOfficial: true,
          applicant: "근로자",
          note: "의료기관의 휴업 진단을 받은 후 공단에 제출합니다.",
          searchPath:
            "근로복지공단 홈페이지 > 서식자료실 > '휴업급여신청서' 검색",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}ui/index.do?task=form&formSEQ=6`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo:
            "산업재해보상보험법 시행규칙 별지 제3호서식 - 휴업 4일 이상 시 신청",
        },
      ],
    },
    {
      id: "workers-compensation-disability",
      l1: "산재 보상 신청",
      l2: "장해급여",
      description: "업무 중 발생한 질병 또는 사고로 인한 장해 시 보상",
      forms: [
        {
          id: "form-004",
          formName: "장해급여신청서",
          formalName: "산업재해보상보험법 시행규칙 별지 제4호서식",
          isOfficial: true,
          applicant: "근로자",
          note: "치료 종료 후 장해가 남은 경우 신청합니다.",
          searchPath:
            "근로복지공단 홈페이지 > 서식자료실 > '장해급여신청서' 검색",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}ui/index.do?task=form&formSEQ=6`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo:
            "산업재해보상보험법 시행규칙 별지 제4호서식 - 장해 판정 후 신청",
        },
      ],
    },
    {
      id: "workers-compensation-survivor",
      l1: "산재 보상 신청",
      l2: "유족급여·장의비",
      description: "업무 중 발생한 질병 또는 사고로 인한 사망 시 유족 보상",
      forms: [
        {
          id: "form-005",
          formName: "유족급여신청서",
          formalName: "산업재해보상보험법 시행규칙 별지 제5호서식",
          isOfficial: true,
          applicant: "유족",
          note: "근로자가 업무상 사유로 사망한 경우 유족이 신청합니다.",
          searchPath:
            "근로복지공단 홈페이지 > 서식자료실 > '유족급여신청서' 검색",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}ui/index.do?task=form&formSEQ=6`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo:
            "산업재해보상보험법 시행규칙 별지 제5호서식 - 유족 범위 확인 필요",
        },
      ],
    },
    {
      id: "insured-status-inquiry",
      l1: "피보험자격",
      l2: "피보험자격 이력 조회",
      description: "고용보험 가입 이력 및 현재 상태 확인",
      forms: [
        {
          id: "form-006",
          formName: "고용보험 피보험자격 이력 조회",
          isOfficial: true,
          applicant: "근로자",
          note: "온라인 토탈서비스에서 직접 조회 가능합니다.",
          searchPath:
            "고용·산재보험 토탈서비스 > 피보험자격 > 이력 조회",
          buttons: [
            {
              label: "온라인 조회·발급",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.WORK24}`,
              type: "form",
            },
          ],
          internalMemo: "온라인 조회 우선 권장",
        },
      ],
    },
    {
      id: "insured-status-registration",
      l1: "피보험자격",
      l2: "피보험자격 취득 신고",
      description: "근로자 채용 시 고용보험 가입 신고",
      forms: [
        {
          id: "form-007",
          formName: "고용보험 피보험자격 취득 신고서",
          formalName: "고용보험법 시행규칙 별지 제1호서식",
          isOfficial: true,
          applicant: "사업주",
          note: "근로자 채용 후 5일 이내에 신고해야 합니다.",
          searchPath:
            "근로복지공단 홈페이지 > 서식자료실 > '피보험자격 취득 신고서' 검색",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo:
            "고용보험법 시행규칙 별지 제1호서식 - 5일 이내 신고 필수",
        },
      ],
    },
    {
      id: "insured-status-termination",
      l1: "피보험자격",
      l2: "피보험자격 상실 신고",
      description: "근로자 퇴직 시 고용보험 상실 신고",
      forms: [
        {
          id: "form-008",
          formName: "고용보험 피보험자격 상실 신고서",
          formalName: "고용보험법 시행규칙 별지 제2호서식",
          isOfficial: true,
          applicant: "사업주",
          note: "근로자 퇴직 후 5일 이내에 신고해야 합니다.",
          searchPath:
            "근로복지공단 홈페이지 > 서식자료실 > '피보험자격 상실 신고서' 검색",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo:
            "고용보험법 시행규칙 별지 제2호서식 - 5일 이내 신고 필수",
        },
      ],
    },
    {
      id: "insured-status-correction",
      l1: "피보험자격",
      l2: "피보험자격 정정 신청",
      description: "고용보험 기록 오류 수정 신청",
      forms: [
        {
          id: "form-009",
          formName: "고용보험 피보험자격 정정 신청서",
          isOfficial: true,
          applicant: "근로자 또는 사업주",
          note: "고용보험 기록에 오류가 있을 때 신청합니다.",
          searchPath:
            "근로복지공단 홈페이지 > 서식자료실 > '피보험자격 정정 신청서' 검색",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "기록 정정 사유 명확히 필요",
        },
      ],
    },
    {
      id: "employment-insurance-verification",
      l1: "고용보험 피보험자격 확인청구 안내",
      l2: "피보험자격 확인청구",
      warning:
        "⚠ 근로자 본인 직접 청구 민원 — 취득·상실 신고와 다릅니다.",
      description:
        "근로자가 본인의 고용보험 이력에 대해 확인을 요청하는 민원입니다.",
      forms: [
        {
          id: "form-010",
          formName: "고용보험 피보험자격확인 청구서",
          formalName: "고용보험법 시행규칙 별지 제20호서식",
          isOfficial: true,
          applicant: "근로자 (본인 직접 청구)",
          note: "사업주가 제출하는 취득·상실 신고와 다릅니다. 근로자가 본인의 고용보험 이력 확인을 요청할 때 사용합니다.",
          searchPath:
            "고용24 > 피보험자격 > 확인청구 또는 근로복지공단 > 서식자료실",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.WORK24}`,
              type: "form",
            },
            {
              label: "법정서식 보기",
              url: `${OFFICIAL_URLS.LAW}`,
              type: "legal",
            },
          ],
          internalMemo:
            "고용보험법 시행규칙 별지 제20호서식 - 근로자 본인 청구만 가능",
        },
        {
          id: "form-011",
          formName: "근로계약서 (증명자료)",
          isOfficial: false,
          applicant: "근로자",
          note: "고용보험 확인청구 시 함께 제출하는 증명자료입니다.",
          searchPath: "별도 서식 없음 - 사업주로부터 받은 원본 제출",
          buttons: [
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "근로계약서 원본 또는 사본 필요",
        },
        {
          id: "form-012",
          formName: "급여명세서 (증명자료)",
          isOfficial: false,
          applicant: "근로자",
          note: "고용보험 확인청구 시 함께 제출하는 증명자료입니다.",
          searchPath: "별도 서식 없음 - 사업주로부터 받은 급여명세서 제출",
          buttons: [
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "최근 3개월 급여명세서 권장",
        },
      ],
    },
    {
      id: "certificate-employment",
      l1: "증명서 발급",
      l2: "고용·산재보험 가입증명서",
      description: "사업장의 고용·산재보험 가입 현황 증명",
      forms: [
        {
          id: "form-013",
          formName: "고용·산재보험 가입증명서",
          isOfficial: true,
          applicant: "사업주 또는 근로자",
          note: "온라인 토탈서비스에서 직접 발급 가능합니다.",
          searchPath:
            "고·산재보험 토탈서비스 > 증명서 > 가입증명서 발급",
          buttons: [
            {
              label: "온라인 조회·발급",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "온라인 발급 우선 권장 - 즉시 발급 가능",
        },
      ],
    },
    {
      id: "certificate-premium",
      l1: "증명서 발급",
      l2: "보험료 납부확인서",
      description: "고용·산재보험료 납부 현황 증명",
      forms: [
        {
          id: "form-014",
          formName: "보험료 납부확인서",
          isOfficial: true,
          applicant: "사업주",
          note: "온라인 토탈서비스에서 직접 발급 가능합니다.",
          searchPath:
            "고·산재보험 토탈서비스 > 보험료 > 납부확인서 발급",
          buttons: [
            {
              label: "온라인 조회·발급",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "온라인 발급 우선 권장 - 즉시 발급 가능",
        },
      ],
    },
    {
      id: "certificate-benefit",
      l1: "증명서 발급",
      l2: "산재보험 급여지급확인서",
      description: "산재보험 급여 지급 현황 증명",
      forms: [
        {
          id: "form-015",
          formName: "산재보험 급여지급확인서",
          isOfficial: true,
          applicant: "근로자",
          note: "온라인 토탈서비스에서 직접 발급 가능합니다.",
          searchPath:
            "고·산재보험 토탈서비스 > 급여 > 지급확인서 발급",
          buttons: [
            {
              label: "온라인 조회·발급",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "온라인 발급 우선 권장 - 즉시 발급 가능",
        },
      ],
    },
    {
      id: "certificate-other",
      l1: "증명서 발급",
      l2: "기타 증명서 방문 발급",
      description: "온라인 미지원 증명서 방문 신청",
      forms: [
        {
          id: "form-016",
          formName: "기타 증명서 신청",
          isOfficial: false,
          applicant: "사업주 또는 근로자",
          note: "온라인으로 발급되지 않는 증명서는 지사 방문 시 신청 가능합니다.",
          searchPath: "근로복지공단 지사 방문 신청",
          buttons: [
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "지사 방문 필수 - 신분증 지참",
        },
      ],
    },
    {
      id: "premium-inquiry",
      l1: "보험료 관련",
      l2: "보험료 조회·납부확인",
      description: "고용·산재보험료 조회 및 납부 현황 확인",
      forms: [
        {
          id: "form-017",
          formName: "보험료 조회",
          isOfficial: true,
          applicant: "사업주",
          note: "온라인 토탈서비스에서 직접 조회 가능합니다.",
          searchPath:
            "고·산재보험 토탈서비스 > 보험료 > 조회",
          buttons: [
            {
              label: "온라인 조회·발급",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "온라인 조회 우선 권장",
        },
      ],
    },
    {
      id: "premium-report",
      l1: "보험료 관련",
      l2: "보수총액신고",
      description: "근로자 임금 변경 시 보수총액 신고",
      forms: [
        {
          id: "form-018",
          formName: "보수총액신고서",
          formalName: "고용보험법 시행규칙 별지 제3호서식",
          isOfficial: true,
          applicant: "사업주",
          note: "근로자 임금이 변경되었을 때 신고합니다.",
          searchPath:
            "근로복지공단 홈페이지 > 서식자료실 > '보수총액신고서' 검색",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo:
            "고용보험법 시행규칙 별지 제3호서식 - 연 1회 이상 신고",
        },
      ],
    },
    {
      id: "premium-estimated",
      l1: "보험료 관련",
      l2: "개산·확정보험료 신고",
      description: "개산보험료 및 확정보험료 신고",
      forms: [
        {
          id: "form-019",
          formName: "개산·확정보험료신고서",
          isOfficial: true,
          applicant: "사업주",
          note: "매년 정산 시 신고합니다.",
          searchPath:
            "근로복지공단 홈페이지 > 서식자료실 > '개산·확정보험료신고서' 검색",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "연 1회 정산 시 신고 - 기한 준수 필수",
        },
      ],
    },
    {
      id: "premium-installment",
      l1: "보험료 관련",
      l2: "개산보험료 분할납부 신청",
      description: "개산보험료 분할 납부 신청",
      forms: [
        {
          id: "form-020",
          formName: "개산보험료 분할납부 신청서",
          isOfficial: true,
          applicant: "사업주",
          note: "보험료 납부가 어려울 때 분할 납부를 신청할 수 있습니다.",
          searchPath:
            "근로복지공단 홈페이지 > 서식자료실 > '분할납부 신청서' 검색",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "분할 기간 및 회차 협의 필요",
        },
      ],
    },
    {
      id: "premium-overpayment",
      l1: "보험료 관련",
      l2: "과납보험료 충당·환급",
      description: "초과 납부한 보험료 환급 신청",
      forms: [
        {
          id: "form-021",
          formName: "과납보험료 환급 신청서",
          isOfficial: true,
          applicant: "사업주",
          note: "초과 납부한 보험료를 환급받거나 다음 분기에 충당할 수 있습니다.",
          searchPath:
            "근로복지공단 홈페이지 > 서식자료실 > '과납보험료 환급 신청서' 검색",
          buttons: [
            {
              label: "온라인 신청",
              url: `${OFFICIAL_URLS.ONLINE_SERVICE}`,
              type: "online",
            },
            {
              label: "서식 확인",
              url: `${OFFICIAL_URLS.COMWEL}`,
              type: "form",
            },
          ],
          internalMemo: "환급 또는 충당 선택 가능",
        },
      ],
    },
  ],
};

/**
 * 하단 참고 고지문
 */
export const FOOTER_NOTICE =
  "본 안내는 방문 전 준비를 돕기 위한 참고용입니다.\n실제 접수 가능 여부와 추가 제출서류는 개별 사안에 따라 달라질 수 있으므로\n최종 확인은 근로복지공단, 고용·산재보험 토탈서비스, 고용24, 정부24 등 공식 경로를 이용해 주세요.";
