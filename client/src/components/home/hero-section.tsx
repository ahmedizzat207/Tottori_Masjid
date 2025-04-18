import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <div className="relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1606800052052-a08af7148866?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9zcXVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')" 
        }}
      />
      
      <div className="relative bg-gradient-to-r from-primary/90 to-primary/70 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t("home.welcome")}
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
            {t("home.welcome_subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/services">
                {t("home.learn_more")}
              </Link>
            </Button>
            
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/events">
                <span>{t("home.upcoming_events")}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
