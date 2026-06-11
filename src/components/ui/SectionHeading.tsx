import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  accent?: string;
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  children,
  accent,
  dark = false,
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display font-bold leading-tight",
        dark ? "text-brand-cream" : "text-brand-navy",
        Tag === "h1"
          ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          : "text-4xl sm:text-5xl",
        className
      )}
    >
      {children}
      {accent && (
        <>
          {" "}
          <span className="text-brand-gold">{accent}</span>
        </>
      )}
    </Tag>
  );
}
