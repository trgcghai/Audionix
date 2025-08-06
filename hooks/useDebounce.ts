// hooks/useDebounce.ts
import { useState, useEffect } from "react";

/**
 * Hook để debounce một giá trị
 * @param value Giá trị đầu vào cần debounce
 * @param delay Độ trễ (ms)
 * @returns Giá trị đã được debounce
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
