import { useState } from "react";

export default function useRangeSelection() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (date: Date) => {
    setStartDate(date);
    setEndDate(null);
    setIsDragging(true);
  };

  const handleMouseEnter = (date: Date) => {
    if (isDragging) {
      setHoverDate(date);
    }
  };

  const handleMouseUp = (date: Date) => {
    if (isDragging && startDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
    setIsDragging(false);
  };

  return {
    startDate,
    endDate,
    hoverDate,
    setHoverDate,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
}