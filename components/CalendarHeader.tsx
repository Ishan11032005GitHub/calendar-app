import { format } from "date-fns";

export default function CalendarHeader({ currentDate, onPrev, onNext }: any) {
  return (
    <div className="flex justify-between items-center">

      <button
        onClick={onPrev}
        className="
          px-3 py-1 rounded-lg
          cursor-pointer
          text-gray-600 dark:text-blue-400
          hover:bg-gray-100 dark:hover:bg-blue-500/10
          hover:scale-105
          transition-all duration-200
        "
      >
        ←
      </button>

      <h2 className="font-semibold text-xl tracking-wide text-gray-900 dark:text-white">
        {format(currentDate, "MMMM yyyy")}
      </h2>

      <button
        onClick={onNext}
        className="
          px-3 py-1 rounded-lg
          cursor-pointer
          text-gray-600 dark:text-blue-400
          hover:bg-gray-100 dark:hover:bg-blue-500/10
          hover:scale-105
          transition-all duration-200
        "
      >
        →
      </button>
    </div>
  );
}
