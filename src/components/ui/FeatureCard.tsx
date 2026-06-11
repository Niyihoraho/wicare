import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "dark" | "light";
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  variant = "dark",
  className = "",
}: FeatureCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "p-5 rounded-lg transition-all duration-300",
        isDark
          ? "bg-white/[0.04] border border-white/[0.08] hover:border-brand-gold/30"
          : "bg-white border border-gray-200 hover:border-brand-gold/40 hover:shadow-md shadow-sm",
        className
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-md flex items-center justify-center mb-3",
          isDark ? "bg-brand-gold/10" : "bg-brand-gold/10"
        )}
      >
        {icon}
      </div>
      <h3
        className={cn(
          "font-semibold text-base mb-1.5",
          isDark ? "text-brand-cream" : "text-brand-navy"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-sm leading-relaxed",
          isDark ? "text-white/45" : "text-brand-navy/60"
        )}
      >
        {description}
      </p>
    </div>
  );
}
