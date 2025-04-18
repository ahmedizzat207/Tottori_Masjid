import Image from "next/image"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  variant?: "light" | "dark"
}

export default function Logo({ size = "md", variant = "dark" }: LogoProps) {
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
  }

  const colorClasses = {
    light: {
      primary: "text-white",
      secondary: "text-mosque-beige-200",
      container: "bg-mosque-green-800/80 px-3 py-2 rounded-lg",
    },
    dark: {
      primary: "text-mosque-green-800",
      secondary: "text-mosque-green-600",
      container: "bg-mosque-beige-50 px-3 py-2 rounded-lg shadow-sm",
    },
  }

  return (
    <div className={`${colorClasses[variant].container} transition-all duration-300`}>
      <div className={`flex items-center ${sizeClasses[size].container}`}>
        <div className={`relative ${sizeClasses[size].logoSize}`}>
          <Image src="/images/mosque-logo.svg" alt="Tottori Masjid Logo" fill className="object-contain" priority />
        </div>
        <div>
          <h1 className={`font-bold ${sizeClasses[size].title} ${colorClasses[variant].primary} arabic-text`}>
            تُوتُّورِي
          </h1>
          <p className={`${sizeClasses[size].subtitle} ${colorClasses[variant].secondary}`}>Tottori Masjid</p>
        </div>
      </div>
    </div>
  )
}
