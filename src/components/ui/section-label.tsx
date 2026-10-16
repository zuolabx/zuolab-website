interface SectionLabelProps {
  label: string;
  count?: string;
  className?: string;
}

export function SectionLabel({ label, count, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-mono text-foreground/45 select-none ${className}`}
    >
      {count && <span className="text-accent">{count}</span>}
      <span>{label}</span>
    </div>
  );
}
