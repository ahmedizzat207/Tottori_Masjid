import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

interface PrayerCountdownTimerProps {
  targetTime: Date;
  prayerName: string;
  className?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function PrayerCountdownTimer({ 
  targetTime, 
  prayerName,
  className
}: PrayerCountdownTimerProps) {
  const { t, isRTL } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    };
    
    // Initial calculation
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetTime]);
  
  const formatTimeUnit = (value: number) => {
    return value < 10 ? `0${value}` : value.toString();
  };
  
  const isLessThanHour = timeLeft.hours === 0 && (timeLeft.minutes > 0 || timeLeft.seconds > 0);
  
  return (
    <div className={cn("flex flex-col items-center", className, isRTL ? "rtl-text" : "")}>
      <div className="flex items-center gap-4 justify-center mb-2">
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "text-3xl font-bold tabular-nums",
              isLessThanHour ? "text-red-500" : "text-primary"
            )}
          >
            {formatTimeUnit(timeLeft.hours)}
          </div>
          <div className="text-xs uppercase text-muted-foreground mt-1">{t("hours")}</div>
        </div>
        
        <div className="text-2xl font-medium text-primary">:</div>
        
        <div className="flex flex-col items-center">
          <div 
            className={cn(
              "text-3xl font-bold tabular-nums",
              isLessThanHour ? "text-red-500" : "text-primary"
            )}
          >
            {formatTimeUnit(timeLeft.minutes)}
          </div>
          <div className="text-xs uppercase text-muted-foreground mt-1">{t("minutes")}</div>
        </div>
        
        <div className="text-2xl font-medium text-primary">:</div>
        
        <div className="flex flex-col items-center">
          <div 
            className={cn(
              "text-3xl font-bold tabular-nums",
              isLessThanHour ? "text-red-500" : "text-primary"
            )}
          >
            {formatTimeUnit(timeLeft.seconds)}
          </div>
          <div className="text-xs uppercase text-muted-foreground mt-1">{t("seconds")}</div>
        </div>
      </div>
      
      <div className="text-sm text-center text-muted-foreground font-medium">
        {t("until")} {prayerName}
      </div>
    </div>
  );
}