import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { FormCard as FormCardType } from "@/data/formDB";

interface FormCardProps {
  form: FormCardType;
  showInternalMemo?: boolean; // 관리자 모드에서만 표시
}

/**
 * 서식 카드 컴포넌트
 * 
 * 각 서식별 정보를 카드 형식으로 표시합니다.
 * - 서식명, 법정서식명, 대상자
 * - 공식 여부 배지
 * - 민원인 안내문 및 검색 경로
 * - 최대 3개 버튼 (온라인 신청 > 서식 확인 > 법정서식 보기 우선순위)
 * - 내부 메모 (관리자 모드)
 */
export function FormCard({ form, showInternalMemo = false }: FormCardProps) {
  return (
    <Card className="border-[1.5px] border-slate-200 bg-white p-4 sm:p-5">
      {/* 서식명 및 배지 */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="flex-1 text-base font-bold text-[#1a2533] sm:text-lg break-words">
          {form.formName}
        </h3>
        {form.isOfficial && (
          <Badge className="bg-[#2d7dd2] text-white text-xs font-semibold flex-shrink-0">
            공식 서식
          </Badge>
        )}
      </div>

      {/* 법정서식명 (있을 경우) */}
      {form.formalName && (
        <p className="mb-2 text-xs text-[#607d8b] italic line-clamp-2">
          법정서식: {form.formalName}
        </p>
      )}

      {/* 대상자 */}
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
        <span className="text-xs font-semibold text-[#1a2533]">대상자:</span>
        <span className="text-xs text-[#607d8b]">{form.applicant}</span>
      </div>

      {/* 민원인 안내문 */}
      {form.note && (
        <p className="mb-3 rounded-lg bg-[#eaf2fd] p-3 text-xs leading-relaxed text-[#1a3a5c] line-clamp-3">
          {form.note}
        </p>
      )}

      {/* 검색 경로 */}
      {form.searchPath && (
        <div className="mb-4 rounded-lg bg-[#f4f6fa] p-3">
          <p className="text-xs font-semibold text-[#607d8b] mb-1">
            공식 확인 경로
          </p>
          <p className="text-xs text-[#1a2533] line-clamp-2">{form.searchPath}</p>
        </div>
      )}

      {/* 버튼 그룹 */}
      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {form.buttons.map((button, idx) => (
          <a
            key={idx}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              variant="outline"
              size="sm"
              className={`w-full justify-center gap-1 text-xs font-semibold transition-all truncate ${
                button.type === "online"
                  ? "border-[#2d7dd2] bg-[#2d7dd2] text-white hover:bg-[#1a5ba8]"
                  : button.type === "form"
                    ? "border-[#f0a500] bg-[#fff8e1] text-[#f0a500] hover:bg-[#ffe0b2]"
                    : "border-[#607d8b] bg-white text-[#607d8b] hover:bg-slate-50"
              }`}
            >
              <span className="truncate">{button.label}</span>
              <ExternalLink className="h-3 w-3 flex-shrink-0" />
            </Button>
          </a>
        ))}
      </div>

      {/* 내부 메모 (관리자 모드) */}
      {showInternalMemo && form.internalMemo && (
        <div className="mt-3 border-t border-slate-200 pt-3">
          <p className="text-xs font-semibold text-[#f0a500] mb-1">
            📌 내부 메모
          </p>
          <p className="text-xs text-[#607d8b] line-clamp-2">{form.internalMemo}</p>
        </div>
      )}
    </Card>
  );
}
