// Prayer calculation utilities
import { PrayerTimeCalculator } from "@/components/prayer-times/prayer-time-calculation";

interface PrayerTimesParams {
  date: number;
  month: number;
  year: number;
  latitude: number;
  longitude: number;
  timezone: number;
  calculationMethod: string;
  asrJuristic: string;
}

export function calculatePrayerTimes(params: PrayerTimesParams) {
  const {
    date,
    month,
    year,
    latitude,
    longitude,
    timezone,
    calculationMethod,
    asrJuristic
  } = params;
  
  const config = {
    calculationMethod,
    asrJuristic,
    adjustHighLats: "AngleBased",
    timeFormat: "24h"
  };
  
  const coordinates = {
    latitude,
    longitude,
    timezone
  };
  
  const calculator = new PrayerTimeCalculator(config, coordinates);
  const dateObj = new Date(year, month, date);
  
  return calculator.calculatePrayerTimes(dateObj);
}

// Convert 24h format string (HH:MM) to Date object
export function timeStringToDate(timeStr: string, baseDate: Date): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const result = new Date(baseDate);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

// Format time remaining in a human-readable way
export function formatTimeRemaining(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;
  
  return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
}

// Get the current prayer or the next upcoming prayer
export function getCurrentOrNextPrayer(prayerTimes: Record<string, string>, now: Date): { name: string; time: Date; isNext: boolean } {
  const prayers = [
    { name: "fajr", time: timeStringToDate(prayerTimes.fajr, now) },
    { name: "sunrise", time: timeStringToDate(prayerTimes.sunrise, now) },
    { name: "dhuhr", time: timeStringToDate(prayerTimes.dhuhr, now) },
    { name: "asr", time: timeStringToDate(prayerTimes.asr, now) },
    { name: "maghrib", time: timeStringToDate(prayerTimes.maghrib, now) },
    { name: "isha", time: timeStringToDate(prayerTimes.isha, now) }
  ];
  
  // Sort prayers by time
  prayers.sort((a, b) => a.time.getTime() - b.time.getTime());
  
  // Find the current or next prayer
  const currentPrayer = prayers.reduce((current, prayer) => {
    // If prayer time has passed but is closer to now than current
    if (prayer.time <= now && (!current || prayer.time > current.time)) {
      return prayer;
    }
    return current;
  }, null as { name: string; time: Date } | null);
  
  // Find the next prayer
  const nextPrayer = prayers.find(prayer => prayer.time > now);
  
  if (nextPrayer) {
    return { ...nextPrayer, isNext: true };
  } else if (currentPrayer) {
    return { ...currentPrayer, isNext: false };
  } else {
    // Fallback to first prayer of the day if none found
    return { ...prayers[0], isNext: true };
  }
}