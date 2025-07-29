"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="text-xs sm:text-sm lg:text-base fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full bg-accent-500 px-3 py-1.5 font-semibold text-primary-800 shadow-xl shadow-slate-900 sm:gap-6 sm:px-6 sm:py-3 lg:gap-8 lg:px-8 lg:py-5">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        onClick={resetRange}
        className="rounded-full p-1 transition-all hover:bg-accent-600"
      >
        <XMarkIcon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
