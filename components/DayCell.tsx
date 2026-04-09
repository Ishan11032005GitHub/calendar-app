export default function DayCell({
  date,
  isSelected,
  isInRange,
  isPreview,
  isToday,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: any) {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      className={`
        aspect-square w-full max-w-[42px] sm:max-w-[52px] md:max-w-[60px]
        flex items-center justify-center
        text-xs sm:text-sm font-medium
        cursor-pointer select-none

        border border-gray-200 dark:border-blue-500/20
        rounded-lg

        ${isSelected ? "bg-blue-600 text-white scale-105 shadow-lg" : ""}
        ${isInRange ? "bg-blue-100 dark:bg-blue-900/30" : ""}
        ${isPreview ? "bg-blue-50 dark:bg-blue-900/20" : ""}
        ${isToday ? "ring-2 ring-blue-500" : ""}
        ${!isSelected ? "hover:bg-gray-100 dark:hover:bg-blue-500/10 neon" : ""}
      `}
    >
      {date.getDate()}
    </div>
  );
}
