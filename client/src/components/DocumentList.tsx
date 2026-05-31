interface DocumentListProps {
  documents: string[];
  title?: string;
}

export default function DocumentList({
  documents,
  title = "📋 필수 서류",
}: DocumentListProps) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#607d8b]">
        {title}
      </h2>

      <div className="space-y-2">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="flex gap-3 rounded-lg bg-[#f4f6fa] p-3 sm:p-4"
          >
            <span className="flex-shrink-0 font-bold text-[#2d7dd2]">•</span>
            <span className="text-sm text-[#1a2533] sm:text-base">{doc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
