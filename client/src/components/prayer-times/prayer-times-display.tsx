import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PrayerTimeCalculator, PrayerTimes, PrayerTimesConfig } from "./prayer-time-calculation";
import { Clock, Sunrise, Sun, Sunset, Moon, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { PrayerCountdownTimer } from "./prayer-countdown-timer";

// Helper function to convert time string like "14:30" to a Date object for today
const getTimeAsDate = (timeStr: string): Date => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export interface PrayerTimesDisplayProps {
  latitude?: number;
  longitude?: number;
  timezone?: number;
  className?: string;
}

export default function PrayerTimesDisplay({
  latitude = 35.5011,   // Tottori prefecture latitude
  longitude = 134.2352, // Tottori prefecture longitude
  timezone = 9,         // Japan timezone (UTC+9)
  className = ""
}: PrayerTimesDisplayProps) {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);
  const [hijriDate, setHijriDate] = useState<string>("");

  // Get prayer configuration from API
  const { data: prayerConfig, isLoading: isLoadingConfig } = useQuery({
    queryKey: ["/api/prayer-config"],
  });

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate prayer times when config is loaded or time changes
  useEffect(() => {
    if (!prayerConfig) return;
    
    const config: PrayerTimesConfig = {
      calculationMethod: prayerConfig.calculationMethod,
      asrJuristic: prayerConfig.asrJuristic,
      adjustHighLats: prayerConfig.adjustHighLats,
      timeFormat: prayerConfig.timeFormat
    };
    
    const coordinates = {
      latitude,
      longitude,
      timezone
    };
    
    const calculator = new PrayerTimeCalculator(config, coordinates);
    const times = calculator.calculatePrayerTimes(currentTime);
    const next = calculator.getNextPrayer(currentTime);
    const hijri = calculator.convertToHijri(currentTime);
    
    setPrayerTimes(times);
    setNextPrayer(next);
    setHijriDate(hijri);
  }, [prayerConfig, currentTime, latitude, longitude, timezone]);

  // Prayer time icons mapping
  const prayerIcons = {
    fajr: <Clock className="h-5 w-5 text-primary" />,
    sunrise: <Sunrise className="h-5 w-5 text-amber-500" />,
    dhuhr: <Sun className="h-5 w-5 text-amber-600" />,
    asr: <Sun className="h-5 w-5 text-orange-500" />,
    maghrib: <Sunset className="h-5 w-5 text-rose-500" />,
    isha: <Moon className="h-5 w-5 text-indigo-500" />
  };

  // Get the translated prayer name
  const getPrayerName = (key: string) => {
    return t(`prayer.${key}`);
  };

  // Loading state
  if (isLoadingConfig || !prayerTimes) {
    return (
      <Card className={cn("overflow-hidden shadow-md", className)}>
        <CardHeader className="bg-primary text-white pb-3 px-6">
          <div className="flex flex-col items-center">
            <CardTitle className="text-xl flex items-center gap-2 mb-1">
              <Clock className="h-5 w-5" />
              <span>{t("home.prayer_times")}</span>
            </CardTitle>
            <Skeleton className="h-4 w-32 bg-white/20 mt-3" />
            <Skeleton className="h-3 w-24 bg-white/20 mt-2" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Skeleton className="h-20 w-full mb-6" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden shadow-md transition-all duration-300", className)}>
      <CardHeader className="bg-primary text-white pb-3 px-6">
        <div className="flex flex-col items-center">
          <CardTitle className="text-xl flex items-center gap-2 mb-1">
            <Clock className="h-5 w-5" />
            <span>{t("home.prayer_times")}</span>
          </CardTitle>
          
          <div className="flex items-center gap-2 text-sm text-primary-foreground/90 mt-1">
            <Calendar className="h-4 w-4" />
            <span>{format(currentTime, "EEEE, MMMM d, yyyy")}</span>
          </div>
          
          <div className="text-xs text-primary-foreground/80 mt-1">
            {hijriDate}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Prayer Countdown Section */}
        {prayerConfig && prayerTimes && nextPrayer && (
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-6 border-b border-b-muted/30">
            <div className="flex flex-col items-center">
              <div className="uppercase tracking-wider text-xs font-semibold text-primary mb-2">
                {t("prayer.next_prayer")}
              </div>
              
              <h3 className="text-2xl font-bold text-primary mb-4 text-center">
                {getPrayerName(nextPrayer.name)}
              </h3>
              
              <PrayerCountdownTimer 
                targetTime={getTimeAsDate(nextPrayer.time)}
                prayerName={getPrayerName(nextPrayer.name)}
                className="mt-2"
              />
            </div>
          </div>
        )}

        {/* Prayer Times List */}
        <div className="p-4">
          <div className="grid grid-cols-1 divide-y divide-muted/50">
            {Object.entries(prayerTimes).map(([key, time]) => {
              const isNext = nextPrayer?.name === key;
              return (
                <div 
                  key={key} 
                  className={cn(
                    "flex justify-between items-center py-4 px-2 rounded-lg transition-colors duration-300 hover:bg-muted/30",
                    isNext && "bg-primary/5 font-medium"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full",
                      isNext ? "bg-primary text-white" : "bg-muted"
                    )}>
                      {prayerIcons[key as keyof typeof prayerIcons]}
                    </div>
                    <span className={cn(
                      "text-base transition-colors", 
                      isNext ? "text-primary font-medium" : "text-foreground"
                    )}>
                      {getPrayerName(key)}
                    </span>
                  </div>
                  <div className={cn(
                    "text-lg font-mono font-medium", 
                    isNext ? "text-primary" : "text-muted-foreground"
                  )}>
                    {time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
