export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 border border-border rounded-full px-3 py-1 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      <span className="text-[11px] font-mono text-muted-foreground">
        {children}
      </span>
    </div>
  );
}
