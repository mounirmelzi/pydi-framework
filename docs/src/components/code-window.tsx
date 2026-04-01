export function CodeWindow({
  filename,
  code,
  className = "",
}: {
  filename: string;
  code: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-card overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] font-mono text-muted-foreground">
          {filename}
        </span>
        <div className="w-14" />
      </div>
      <pre className="p-5 text-[13px] font-mono leading-7 text-muted-foreground overflow-x-auto">
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  );
}
