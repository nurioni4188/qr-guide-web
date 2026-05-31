import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { saveGuide, getUserSavedGuides, deleteSavedGuide } from "../db";
import { storagePut } from "../storage";

export const guidesRouter = router({
  // 가이드 저장 (PDF 생성 및 저장)
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

  // 저장된 가이드 목록 조회
  listSavedGuides: protectedProcedure.query(async ({ ctx }) => {
    try {
      const guides = await getUserSavedGuides(ctx.user.id);
      return guides;
    } catch (error) {
      console.error("Failed to list saved guides:", error);
      throw new Error("저장된 가이드 목록을 불러올 수 없습니다.");
    }
  }),

  // 저장된 가이드 삭제
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
