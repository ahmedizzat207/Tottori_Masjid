import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { createIslamicPatternSVG } from "@/lib/utils";
import { useTheme } from "@/components/ui/theme-provider";

export default function EnhancedHeroSection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const patternBg = createIslamicPatternSVG(
    theme === "dark" ? "#234237" : "#1f5c48", 
    theme === "dark" ? 0.2 : 0.1
  );
  
  return (
    <div className="relative overflow-hidden pt-20 md:pt-0">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-50"
        style={{ 
          backgroundImage: patternBg,
          backgroundAttachment: "fixed" 
        }}
      />
      
      {/* Background overlay gradient */}
      <div 
        className={`absolute inset-0 z-0 
          ${theme === "dark" 
            ? "bg-gradient-to-b from-background via-background/95 to-background/80" 
            : "bg-gradient-to-b from-background via-background/90 to-background/70"
          }`}
      />
      
      {/* Main content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16 md:py-24 md:min-h-[600px] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-6 hidden md:block">
                <img
                  src="/images/mosque-logo-large.svg"
                  alt="Tottori Masjid"
                  width="120"
                  height="120"
                  className="mx-auto lg:mx-0"
                />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                {t("home.welcome")}
              </h1>
              
              <p className="text-2xl md:text-3xl mb-4 font-arabic text-primary">
                السلام عليكم ورحمة الله وبركاته
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                {t("home.welcome_subtitle")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  asChild
                  size="lg" 
                  className="rounded-full"
                >
                  <Link href="/services">
                    {t("home.learn_more")}
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="rounded-full group"
                >
                  <Link href="/events">
                    <span>{t("home.upcoming_events")}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Prayer Times Updated Daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Tottori City, Japan</span>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-2xl h-[400px]">
              <div className="absolute inset-0 bg-primary/10 z-10"></div>
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `${patternBg}, linear-gradient(135deg, hsl(157, 70%, 25%) 0%, hsl(157, 60%, 35%) 100%)`,
                  backgroundSize: '10px 10px, cover',
                  backgroundPosition: 'center',
                  backgroundBlendMode: 'soft-light, normal'
                }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                <div className="w-24 h-24 md:w-32 md:h-32 mb-4">
                  <img src="/images/mosque-logo-large.svg" alt="Tottori Masjid Logo" className="w-full h-full" />
                </div>
                <h3 className="text-white text-xl md:text-2xl font-bold text-center">
                  Islamic Center of Tottori Prefecture
                </h3>
                <p className="text-white/80 text-center mt-2 max-w-md">
                  A place of worship, learning, and community serving Tottori Prefecture
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary opacity-10 blur-3xl rounded-full"></div>
      <div className="absolute top-20 -left-20 w-80 h-80 bg-primary opacity-10 blur-3xl rounded-full"></div>
    </div>
  );
}