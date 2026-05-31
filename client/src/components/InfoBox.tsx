import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface InfoBoxProps {
  type?: "info" | "warning" | "success";
  title?: string;
  children: ReactNode;
}

export default function InfoBox({
  type = "info",
  title,
  children,
}: InfoBoxProps) {
  const typeStyles = {
    info: {
      bg: "bg-blue-50",
      border: "border-l-4 border-[#2d7dd2]",
      icon: "ℹ️",
      textColor: "text-blue-900",
    },
    warning: {
      bg: "bg-[#fff8e6]",
      border: "border-l-4 border-[#f0a500]",
      icon: "⚠️",
      textColor: "text-[#7a5a00]",
    },
    success: {
      bg: "bg-green-50",
      border: "border-l-4 border-[#27ae60]",
      icon: "✓",
      textColor: "text-green-900",
    },
  };

  const style = typeStyles[type];

  return (
    <div className={`${style.bg} ${style.border} rounded-lg p-4 sm:p-5`}>
      {title && (
        <div className={`mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${style.textColor}`}>
          <span>{style.icon}</span>
          <span>{title}</span>
        </div>
      )}
      <div className={`text-sm ${style.textColor}`}>{children}</div>
    </div>
  );
}
