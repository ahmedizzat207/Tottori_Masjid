import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PrayerTimeCalculator, PrayerTimes, PrayerTimesConfig } from "./prayer-time-calculation";
import { Clock, Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { PrayerCountdown } from "./prayer-countdown-new";

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
      <Card className={className}>
        <CardHeader className="bg-primary text-white pb-4">
          <CardTitle className="text-lg flex justify-between items-center">
            <span>{t("home.prayer_times")}</span>
            <Clock className="h-5 w-5" />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24 mb-2" />
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="bg-primary text-white pb-4">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{t("home.prayer_times")}</span>
          <Clock className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4">
          <div className="text-sm text-muted-foreground">
            {format(currentTime, "EEEE, MMMM d, yyyy")}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {hijriDate}
          </div>
        </div>

        {/* Prayer Countdown */}
        {prayerConfig && prayerTimes && nextPrayer && (
          <div className="mb-4">
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="text-xs font-medium text-primary uppercase text-center mb-1">
                {t("prayer.countdown")}
              </div>
              <h3 className="text-center text-lg font-semibold mb-1">
                {t("prayer.next_prayer")}: {getPrayerName(nextPrayer.name)}
              </h3>
              <div className="text-center text-2xl font-bold text-primary">
                {nextPrayer.time}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {Object.entries(prayerTimes).map(([key, time]) => (
            <div 
              key={key} 
              className={`flex justify-between items-center py-3 border-b ${
                nextPrayer?.name === key ? 'bg-primary/5' : ''
              }`}
            >
              <div className="flex items-center">
                <span className="mr-2">{prayerIcons[key as keyof typeof prayerIcons]}</span>
                <span>{getPrayerName(key)}</span>
              </div>
              <div className="text-muted-foreground">{time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
