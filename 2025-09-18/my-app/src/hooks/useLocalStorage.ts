import { useState } from "react";

/**
 * Custom hook to sync state with localStorage
 * @param key localStorage key
 * @param initialValue default value
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage if exists
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("useLocalStorage error:", error);
      return initialValue;
    }
  });

  // Wrapper around setState
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("useLocalStorage error:", error);
    }
  };

  return [storedValue, setValue] as const; // same API as useState
}
