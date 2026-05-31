import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { saveGuide, getUserSavedGuides, deleteSavedGuide } from "../db";
import { storagePut } from "../storage";

// 민원 유형 데이터 (나중에 데이터베이스로 이동)
const servicesData = [
  {
    id: "workers-compensation",
    name: "산재 보상 신청",
    badge: "산재보상",
    icon: "🏥",
    description: "산재 보상 신청 관련 서류 및 안내",
    whatIsIt: "일하다 다치거나 질병이 발생한 경우 산재 신청 가능 여부와 절차를 상담하는 민원입니다.",
    guidance: "방문 전 준비하실 서류를 확인해 주세요. 온라인 신청이 가능한 경우 아래 바로가기를 이용하실 수 있습니다.",
    documents: [
      "요양급여신청서 (소정 양식)",
      "진단서 또는 초진소견서",
      "사고 경위서 (사업주 확인)",
      "신분증 (본인 방문 시)",
      "대리 신청 시: 위임장 + 대리인 신분증",
    ],
    talkingPoints: "업무 중 다친 일로 산재 신청 절차와 필요한 서류를 상담받고 싶습니다.",
    onlineLink: {
      text: "온라인 신청 바로가기",
      url: "https://www.kcomwel.or.kr",
    },
    notes: ["업무상 재해 인정 여부는 제출자료와 조사 결과에 따라 달라질 수 있습니다."],
  },
  {
    id: "insured-status",
    name: "피보험자격",
    badge: "피보험자격",
    icon: "👤",
    description: "피보험자격 관련 서류 및 안내",
    whatIsIt: "근로자의 산재보험 가입 여부와 피보험자격을 확인하는 민원입니다.",
    guidance: "사업장 정보와 근로자 정보를 준비해 주세요.",
    documents: [
      "신분증",
      "사업장 정보 (사업장명, 사업자등록번호)",
      "근로계약서 (필요시)",
    ],
    talkingPoints: "현재 다니고 있는 회사의 산재보험 가입 여부를 확인하고 싶습니다.",
    notes: ["피보험자격 확인은 온라인으로도 가능합니다."],
  },
  {
    id: "certificate",
    name: "증명서 발급",
    badge: "증명서발급",
    icon: "📄",
    description: "증명서 발급 관련 서류 및 안내",
    whatIsIt: "산재보험 관련 각종 증명서를 발급받는 민원입니다.",
    guidance: "증명서 종류에 따라 필요한 서류가 다릅니다. 미리 확인하고 방문해 주세요.",
    documents: [
      "신분증",
      "증명서 신청 양식",
      "필요시 위임장 및 대리인 신분증",
    ],
    talkingPoints: "산재보험 가입 증명서를 발급받고 싶습니다.",
    notes: ["온라인 발급이 가능한 증명서도 있습니다."],
  },
  {
    id: "insurance-premium",
    name: "보험료 관련",
    badge: "보험료",
    icon: "💰",
    description: "보험료 관련 서류 및 안내",
    whatIsIt: "산재보험료 납부, 조정, 환급 등 보험료 관련 민원입니다.",
    guidance: "사업장 정보와 보험료 관련 서류를 준비해 주세요.",
    documents: [
      "사업자등록증",
      "보험료 고지서",
      "근로자 명부 (필요시)",
    ],
    talkingPoints: "보험료 납부 현황을 확인하고 싶습니다.",
    notes: ["보험료 조정은 별도의 신청 절차가 필요합니다."],
  },
  {
    id: "online-service",
    name: "온라인 서비스 안내",
    badge: "온라인안내",
    icon: "🌐",
    description: "온라인 서비스 이용 방법 안내",
    whatIsIt: "근로복지공단의 온라인 서비스 이용 방법을 안내하는 민원입니다.",
    guidance: "온라인으로 처리 가능한 민원을 확인하고 이용해 주세요.",
    documents: ["신분증 (온라인 본인인증용)"],
    talkingPoints: "온라인으로 처리할 수 있는 민원이 무엇인지 알고 싶습니다.",
    notes: ["대부분의 민원은 온라인으로 신청 가능합니다."],
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

  // ============ 보호된 API (로그인 필수) ============

  // 보호된 API: 가이드 저장 (PDF 생성 및 저장)
  saveGuide: protectedProcedure
    .input(
      z.object({
        serviceId: z.string(),
        serviceName: z.string(),
        fileName: z.string(),
        content: z.string(), // HTML 또는 텍스트 콘텐츠
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // 파일 키 생성
        const timestamp = Date.now();
        const fileKey = `guides/${ctx.user.id}/${input.serviceId}-${timestamp}.pdf`;

        // 콘텐츠를 Buffer로 변환 (실제로는 PDF 생성 필요)
        const fileBuffer = Buffer.from(input.content, "utf-8");

        // S3에 저장
        const { url, key } = await storagePut(fileKey, fileBuffer, "application/pdf");

        // 데이터베이스에 저장
        const result = await saveGuide({
          userId: ctx.user.id,
          serviceId: input.serviceId,
          serviceName: input.serviceName,
          fileKey: key,
          fileUrl: url,
          fileName: input.fileName,
          fileType: "pdf",
        });

        return {
          success: true,
          url,
          fileName: input.fileName,
        };
      } catch (error) {
        console.error("Failed to save guide:", error);
        throw new Error("가이드 저장에 실패했습니다.");
      }
    }),

  // 보호된 API: 저장된 가이드 목록 조회
  listSavedGuides: protectedProcedure.query(async ({ ctx }) => {
    try {
      const guides = await getUserSavedGuides(ctx.user.id);
      return guides;
    } catch (error) {
      console.error("Failed to list saved guides:", error);
      throw new Error("저장된 가이드 목록을 불러올 수 없습니다.");
    }
  }),

  // 보호된 API: 저장된 가이드 삭제
  deleteSavedGuide: protectedProcedure
    .input(z.object({ guideId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      try {
        await deleteSavedGuide(input.guideId, ctx.user.id);
        return { success: true };
      } catch (error) {
        console.error("Failed to delete saved guide:", error);
        throw new Error("가이드 삭제에 실패했습니다.");
      }
    }),
});
