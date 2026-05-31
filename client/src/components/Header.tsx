import { useLocation } from "wouter";

interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  badge?: string;
  showBackButton?: boolean;
}

export default function Header({
  title,
  subtitle,
  icon,
  badge,
  showBackButton = false,
}: HeaderProps) {
  const [, navigate] = useLocation();

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-2xl">
        {showBackButton && (
          <button
            onClick={() => navigate("/")}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#2d7dd2] transition-colors hover:text-[#1a5fa8]"
          >
            ← 돌아가기
          </button>
        )}

        <div className="flex items-start gap-4">
          {icon && <div className="text-4xl">{icon}</div>}
          <div className="flex-1">
            {badge && (
              <div className="mb-2 inline-block rounded-full bg-[#eaf2fd] px-2.5 py-0.5 text-xs font-bold text-[#1a3a5c]">
                {badge}
              </div>
            )}
            <h1 className="text-2xl font-black text-[#1a2533] sm:text-3xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-[#607d8b]">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
