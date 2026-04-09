"use client";

import { isSameDay, isToday } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { getMonthDays } from "@/utils/dateUtils";
import useRangeSelection from "@/hooks/useRangeSelection";
import DayCell from "./DayCell";

export default function CalendarGrid({ currentDate, direction }: any) {
  const days = getMonthDays(currentDate);

  const {
    startDate,
    endDate,
    hoverDate,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  } = useRangeSelection();

  const isSelected = (date: Date) =>
    (startDate && isSameDay(date, startDate)) ||
    (endDate && isSameDay(date, endDate));

  const isInRange = (date: Date) =>
    startDate && endDate && date > startDate && date < endDate;

  const isPreview = (date: Date) =>
    startDate && !endDate && hoverDate && date > startDate && date <= hoverDate;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentDate.toString()}
        initial={{ x: direction * 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -direction * 60, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="
          bg-gray-50 dark:bg-zinc-900
          border border-gray-200 dark:border-blue-500/20
          rounded-2xl p-4 shadow-sm
        "
      >
        {/* WEEKDAYS */}
        <div className="grid grid-cols-7 mb-3 text-xs font-semibold text-gray-400 dark:text-zinc-500">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="text-center">{d}</div>
          ))}
        </div>

        {/* DAYS */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3 justify-items-center">
          {days.map((date, idx) =>
            date ? (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.01 }}
              >
                <DayCell
                  date={date}
                  isSelected={!!isSelected(date)}
                  isToday={isToday(date)}
                  isInRange={!!isInRange(date)}
                  isPreview={!!isPreview(date)}
                  onMouseDown={() => handleMouseDown(date)}
                  onMouseEnter={() => handleMouseEnter(date)}
                  onMouseUp={() => handleMouseUp(date)}
                />
              </motion.div>
            ) : (
              <div key={idx} />
            )
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
