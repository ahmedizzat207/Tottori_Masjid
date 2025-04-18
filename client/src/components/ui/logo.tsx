import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ size = "md", variant = "dark", className }: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "gap-1.5",
      logoSize: "w-8 h-8",
      title: "text-lg",
      subtitle: "text-[10px]",
    },
    md: {
      container: "gap-2",
      logoSize: "w-10 h-10",
      title: "text-xl",
      subtitle: "text-xs",
    },
    lg: {
      container: "gap-3",
      logoSize: "w-14 h-14",
      title: "text-3xl",
      subtitle: "text-sm",
    },
  };

  const colorClasses = {
    light: {
      primary: "text-white",
      secondary: "text-white/80",
      container: "px-3 py-2 rounded-lg",
    },
    dark: {
      primary: "text-primary",
      secondary: "text-primary/70",
      container: "px-3 py-2 rounded-lg",
    },
  };

  return (
    <div className={cn(colorClasses[variant].container, "transition-all duration-300", className)}>
      <div className={cn("flex items-center", sizeClasses[size].container)}>
        <div className={cn("relative", sizeClasses[size].logoSize)}>
          <img src="/images/mosque-logo.svg" alt="Tottori Masjid Logo" className="object-contain w-full h-full" />
        </div>
        <div>
          <h1 className={cn("font-bold", sizeClasses[size].title, colorClasses[variant].primary, "font-arabic")}>
            تُوتُّورِي
          </h1>
          <p className={cn(sizeClasses[size].subtitle, colorClasses[variant].secondary)}>Tottori Masjid</p>
        </div>
      </div>
    </div>
  );
}