import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormCard } from "@/components/FormCard";
import { ServiceCategory, FOOTER_NOTICE } from "@/data/formDB";

interface PublicFormMappingProps {
  category: ServiceCategory;
}

/**
 * PublicFormMapping 컴포넌트
 * 
 * 민원인 공개용 화면에서 서식 DB를 표시합니다.
 * - 민원 유형 (L1/L2) 표시
 * - 경고 배지 (필요시)
 * - 서식 카드 목록
 * - 하단 참고 고지문
 * 
 * 숨겨지는 항목:
 * - JSON DB 탭
 * - Phase 1 확인 사항
 * - 관리자 모드 버튼
 * - internalMemo
 */
export function PublicFormMapping({ category }: PublicFormMappingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2a47] px-4 py-8 text-white sm:px-6 sm:py-12">
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#f0a500]">
            민원별 준비서류 안내
          </div>

          <h1 className="mb-3 text-3xl font-black leading-tight sm:text-4xl">
            {category.l1}
          </h1>

          {category.l2 && (
            <p className="mb-4 text-base text-white/80">
              {category.l2}
            </p>
          )}

          {category.description && (
            <p className="text-sm leading-relaxed text-white/70">
              {category.description}
            </p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* 경고 배지 */}
        {category.warning && (
          <Card className="mb-6 border-[1.5px] border-[#f0a500] bg-[#fff8e1] p-4 sm:p-5">
            <p className="text-sm font-semibold text-[#f0a500]">
              {category.warning}
            </p>
          </Card>
        )}

        {/* 서식 카드 목록 */}
        <div className="mb-12 space-y-3 sm:space-y-4">
          {category.forms.map((form) => (
            <FormCard key={form.id} form={form} showInternalMemo={false} />
          ))}
        </div>

        {/* 하단 참고 고지문 */}
        <Card className="border-[1.5px] border-slate-200 bg-[#f4f6fa] p-4 sm:p-6">
          <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[#607d8b]">
            📋 참고 고지문
          </div>
          <p className="whitespace-pre-line text-xs leading-relaxed text-[#1a2533] sm:text-sm">
            {FOOTER_NOTICE}
          </p>
        </Card>
      </main>
    </div>
  );
}
