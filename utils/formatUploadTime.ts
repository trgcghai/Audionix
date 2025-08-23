import { format, parseISO } from "date-fns";

/**
 * Formats an ISO date string to "HH:mm dd/MM/yyyy" format
 * @param dateString ISO date string (e.g., "2025-06-01T20:15:45Z")
 * @returns Formatted date string (e.g., "20:15 01/06/2025")
 */
export const formatUploadTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "HH:mm MM/dd/yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};
