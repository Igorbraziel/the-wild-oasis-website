"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector({ bookedDates, cabin, settings }) {
  const { regularPrice, discount } = cabin;
  const { range, setRange, resetRange } = useReservation();
  const { minBookingLength, maxBookingLength } = settings;

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const numNights = displayRange?.to && displayRange?.from ? differenceInDays(displayRange.to, displayRange.from) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-8 lg:pt-12"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 0)}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(currentDay) =>
          isPast(currentDay) ||
          bookedDates.some((date) => isSameDay(date, currentDay))
        }
      />

      <div className="flex h-[72px] items-center justify-between bg-accent-500 sm:px-6 px-4 lg:px-8 text-primary-800">
        <div className="flex items-baseline sm:gap-5 gap-3 lg:gap-6">
          <p className="flex items-baseline gap-1 sm:gap-2">
            {discount > 0 ? (
              <>
                <span className="text-sm sm:text-lg lg:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-sm sm:text-xl lg:text-2xl">
                ${regularPrice}
              </span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 sm:px-2 px-1 lg:px-3 py-0.5 sm:py-2 text-sm sm:text-xl lg:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p className="flex flex-col gap-1">
                <span className="text-sm font-bold uppercase sm:text-base lg:text-lg">
                  Total
                </span>{" "}
                <span className="text-sm font-semibold sm:text-base lg:text-xl">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border ml-2 border-primary-800 px-2 py-1 text-sm font-semibold sm:px-3 lg:px-4 lg:py-2"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
