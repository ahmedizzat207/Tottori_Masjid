import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to display in a readable format
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMMM d, yyyy');
}

// Format time to display in a readable format
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'h:mm a');
}

// Format date and time together
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMMM d, yyyy h:mm a');
}

// Get day of the week
export function getDayOfWeek(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'EEEE');
}

// Creates geometric Islamic pattern SVG
export function createIslamicPatternSVG(color: string = "#006064", opacity: number = 0.05): string {
  return `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(color)}' fill-opacity='${opacity}'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
}

// Get contrasting text color (black or white) based on background color
export function getContrastingTextColor(hexColor: string): string {
  // Remove the hash symbol if present
  hexColor = hexColor.replace("#", "");
  
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  
  // Calculate luminance using the formula for relative luminance in sRGB space
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for bright backgrounds, white for dark backgrounds
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

// Handle API errors
export function handleApiError(error: any): string {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return error.message || 'An unexpected error occurred';
}

// Convert 24-hour format to 12-hour format
export function convertTo12HourFormat(time24: string): string {
  const [hour, minute] = time24.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
}

// Convert 12-hour format to 24-hour format
export function convertTo24HourFormat(time12: string): string {
  const [timePart, period] = time12.split(' ');
  let [hour, minute] = timePart.split(':').map(Number);
  
  if (period.toUpperCase() === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }
  
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}
