import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { PrayerConfig } from "@shared/schema";
import { PrayerTimeCalculator, PrayerTimesConfig } from "./prayer-time-calculation";

interface PrayerCountdownProps {
  prayerConfig: PrayerConfig;
}

export function PrayerCountdown({ prayerConfig }: PrayerCountdownProps) {
  const { t, isRTL } = useLanguage();
  const [countdown, setCountdown] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [nextPrayer, setNextPrayer] = useState<string>("");

  useEffect(() => {
    // Set up prayer times calculation
    const today = new Date();
    // Use default values for Tottori
    const latitude = 35.5011;   // Tottori prefecture latitude
    const longitude = 134.2352; // Tottori prefecture longitude
    const timezone = 9;         // Japan timezone (UTC+9)
    
    const config: PrayerTimesConfig = {
      calculationMethod: prayerConfig.calculationMethod as any,
      asrJuristic: prayerConfig.asrJuristic as any,
      adjustHighLats: prayerConfig.adjustHighLats,
      timeFormat: prayerConfig.timeFormat
    };
    
    const coordinates = {
      latitude,
      longitude,
      timezone
    };
    
    const calculator = new PrayerTimeCalculator(config, coordinates);
    
    const calculateNextPrayerTime = () => {
      const prayerTimes = calculator.calculatePrayerTimes(today);
      
      // Convert prayer times to Date objects for comparison
      const now = new Date();
      const prayers = [
        { name: "fajr", time: convertTimeStringToDate(prayerTimes.fajr, now) },
        { name: "sunrise", time: convertTimeStringToDate(prayerTimes.sunrise, now) },
        { name: "dhuhr", time: convertTimeStringToDate(prayerTimes.dhuhr, now) },
        { name: "asr", time: convertTimeStringToDate(prayerTimes.asr, now) },
        { name: "maghrib", time: convertTimeStringToDate(prayerTimes.maghrib, now) },
        { name: "isha", time: convertTimeStringToDate(prayerTimes.isha, now) }
      ];
      
      // Find the next prayer
      let nextPrayerInfo = prayers.find(prayer => prayer.time > now);
      
      // If no next prayer found today, the next prayer is Fajr of the next day
      if (!nextPrayerInfo) {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowPrayerTimes = calculator.calculatePrayerTimes(tomorrow);
        
        nextPrayerInfo = {
          name: "fajr",
          time: convertTimeStringToDate(tomorrowPrayerTimes.fajr, tomorrow)
        };
      }
      
      return { name: nextPrayerInfo.name, time: nextPrayerInfo.time };
    };
    
    const updateCountdown = () => {
      const { name, time } = calculateNextPrayerTime();
      const now = new Date();
      const diff = time.getTime() - now.getTime();
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown({ hours, minutes, seconds });
      setNextPrayer(name);
    };
    
    // Update countdown every second
    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(intervalId);
  }, [prayerConfig]);
  
  // Helper function to convert time string (HH:MM format) to Date object
  function convertTimeStringToDate(timeStr: string, baseDate: Date) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const result = new Date(baseDate);
    result.setHours(hours, minutes, 0, 0);
    return result;
  }
  
  return (
    <Card className={`shadow-md overflow-hidden ${isRTL ? 'rtl-text' : ''}`}>
      <CardContent className="p-4 bg-primary/5">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-1">{t("prayer.next_prayer")}: {t(`prayer.${nextPrayer}`)}</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{countdown.hours.toString().padStart(2, '0')}</span>
              <span className="text-xs">{t("hours")}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{countdown.minutes.toString().padStart(2, '0')}</span>
              <span className="text-xs">{t("minutes")}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{countdown.seconds.toString().padStart(2, '0')}</span>
              <span className="text-xs">{t("seconds")}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}