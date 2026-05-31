import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="text-center">
        <div className="mb-6 text-6xl font-black text-[#1a3a5c]">404</div>
        <h1 className="mb-3 text-2xl font-bold text-[#1a2533]">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mb-8 text-base text-[#607d8b]">
          요청하신 페이지가 존재하지 않습니다.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-[#2d7dd2] hover:bg-[#1a5fa8]"
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
