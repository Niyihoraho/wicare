interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export function SectionLabel({ children, dark = false, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase ${
        dark ? "text-brand-gold/80" : "text-brand-gold"
      } ${className}`}
    >
      {children}
    </span>
  );
}
