import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { FORM_DB } from "@/data/formDB";
import { PublicFormMapping } from "@/components/PublicFormMapping";
import { AdminFormMapping } from "@/components/AdminFormMapping";

interface ServiceDetailProps {
  params: {
    serviceId: string;
  };
}

export default function ServiceDetail({ params }: ServiceDetailProps) {
  const [, navigate] = useLocation();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const serviceId = params.serviceId;

  // formDB에서 해당 민원 유형 찾기
  const category = FORM_DB.categories.find((cat) => cat.id === serviceId);

  const handleGoBack = () => {
    navigate("/");
  };

  if (!category) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-[#1a2533]">
            민원 정보를 찾을 수 없습니다.
          </p>
          <Button onClick={handleGoBack} className="bg-[#2d7dd2]">
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 뒤로가기 버튼 (고정 위치) */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-sm font-semibold text-[#2d7dd2] transition-colors hover:text-[#1a5ba8]"
        >
          <ChevronLeft className="h-4 w-4" />
          뒤로가기
        </button>

        {/* 관리자 모드 토글 (개발 환경에서만 표시) */}
        {import.meta.env.DEV && (
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`text-xs font-bold px-2 py-1 rounded transition-all ${
              isAdminMode
                ? "bg-[#f0a500] text-white"
                : "bg-slate-200 text-slate-600 hover:bg-slate-300"
            }`}
          >
            {isAdminMode ? "🔧 관리자" : "👁 공개"}
          </button>
        )}
      </div>

      {/* 콘텐츠 */}
      {isAdminMode ? (
        <AdminFormMapping category={category} />
      ) : (
        <PublicFormMapping category={category} />
      )}
    </div>
  );
}
