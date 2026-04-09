import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setValue(stored);
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}