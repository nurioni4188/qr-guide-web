import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormCard } from "@/components/FormCard";
import { ServiceCategory, FOOTER_NOTICE } from "@/data/formDB";
import { useState } from "react";

interface AdminFormMappingProps {
  category: ServiceCategory;
}

/**
 * AdminFormMapping 컴포넌트
 * 
 * 내부 검토용 관리자 모드에서 서식 DB를 표시합니다.
 * 
 * 추가 표시 항목:
 * - JSON DB 설계 탭 (formDB.ts 구조 확인)
 * - Phase 1 확인 사항
 * - internalMemo (각 서식별)
 * - 관리자 모드 토글 버튼
 */
export function AdminFormMapping({ category }: AdminFormMappingProps) {
  const [showJsonSchema, setShowJsonSchema] = useState(false);
  const [showPhase1Notes, setShowPhase1Notes] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] to-[#0f2a47] px-4 py-8 text-white sm:px-6 sm:py-12">
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-3 flex items-center gap-2">
            <Badge className="bg-[#f0a500] text-white text-xs font-bold">
              🔧 관리자 모드
            </Badge>
          </div>

          <div className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#f0a500]">
            민원별 준비서류 안내 (내부 검토용)
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
        {/* 관리자 도구 */}
        <div className="mb-8 space-y-2 sm:space-y-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowJsonSchema(!showJsonSchema)}
            className="w-full justify-start border-[#2d7dd2] text-[#2d7dd2] hover:bg-[#eaf2fd]"
          >
            {showJsonSchema ? "▼" : "▶"} JSON DB 설계 탭
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPhase1Notes(!showPhase1Notes)}
            className="w-full justify-start border-[#f0a500] text-[#f0a500] hover:bg-[#fff8e1]"
          >
            {showPhase1Notes ? "▼" : "▶"} Phase 1 확인 사항
          </Button>
        </div>

        {/* JSON DB 설계 탭 */}
        {showJsonSchema && (
          <Card className="mb-8 border-[1.5px] border-[#2d7dd2] bg-[#eaf2fd] p-4 sm:p-5">
            <div className="mb-3 text-xs font-bold text-[#1a3a5c]">
              📊 JSON DB 구조
            </div>
            <pre className="overflow-x-auto rounded bg-white p-3 text-xs text-[#1a2533]">
              {JSON.stringify(
                {
                  id: category.id,
                  l1: category.l1,
                  l2: category.l2,
                  description: category.description,
                  warning: category.warning,
                  forms: category.forms.map((f) => ({
                    id: f.id,
                    formName: f.formName,
                    formalName: f.formalName,
                    isOfficial: f.isOfficial,
                    applicant: f.applicant,
                    buttons: f.buttons.length,
                  })),
                },
                null,
                2
              )}
            </pre>
          </Card>
        )}

        {/* Phase 1 확인 사항 */}
        {showPhase1Notes && (
          <Card className="mb-8 border-[1.5px] border-[#f0a500] bg-[#fff8e1] p-4 sm:p-5">
            <div className="mb-3 text-xs font-bold text-[#f0a500]">
              ✅ Phase 1 확인 사항
            </div>
            <ul className="space-y-2 text-xs text-[#1a2533]">
              <li className="flex gap-2">
                <span className="flex-shrink-0">✓</span>
                <span>
                  L1/L2 구조: {category.l1} / {category.l2 || "없음"}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">✓</span>
                <span>서식 개수: {category.forms.length}개</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">✓</span>
                <span>
                  공식 서식: {category.forms.filter((f) => f.isOfficial).length}개
                </span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">✓</span>
                <span>
                  경고 배지: {category.warning ? "있음" : "없음"}
                </span>
              </li>
            </ul>
          </Card>
        )}

        {/* 경고 배지 */}
        {category.warning && (
          <Card className="mb-6 border-[1.5px] border-[#f0a500] bg-[#fff8e1] p-4 sm:p-5">
            <p className="text-sm font-semibold text-[#f0a500]">
              {category.warning}
            </p>
          </Card>
        )}

        {/* 서식 카드 목록 (내부 메모 표시) */}
        <div className="mb-12 space-y-3 sm:space-y-4">
          {category.forms.map((form) => (
            <FormCard key={form.id} form={form} showInternalMemo={true} />
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
