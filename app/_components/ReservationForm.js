"use client";

import { differenceInDays, format, isSameDay } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createReservation } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    maxCapacity,
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createReservationWithData = createReservation.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-7 py-2 text-xs text-primary-300 sm:px-10 sm:text-base lg:px-16 lg:text-lg">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="flex flex-col gap-3 bg-primary-900 px-9 py-6 text-lg sm:px-12 sm:py-8 lg:gap-5 lg:px-16 lg:py-10"
      >
        <div className="space-y-2">
          <label
            className="text-base sm:text-lg lg:text-xl"
            htmlFor="numGuests"
          >
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-lg text-primary-800 shadow-sm sm:text-xl lg:text-2xl"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            className="text-base sm:text-lg lg:text-xl"
            htmlFor="observations"
          >
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-sm text-primary-800 shadow-sm sm:text-lg lg:text-2xl"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <p className="text-sm text-primary-300 lg:text-base">
            {range.from && range.to
              ? `from ${format(range.from, "MMMM, dd")} to ${format(range.to, "MMMM, dd")}`
              : "Start by selecting dates"}
          </p>

          <CreateReservationButton
            disabled={!startDate || !endDate || isSameDay(endDate, startDate)}
          />
        </div>
      </form>
    </div>
  );
}

function CreateReservationButton({ disabled }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={disabled || pending}
      className="bg-accent-500 px-4 py-2 text-base font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 sm:px-6 sm:py-3 sm:text-lg lg:px-8 lg:py-4 lg:text-xl"
    >
      {pending ? "Creating Reservation..." : "Reserve now"}
    </button>
  );
}

export default ReservationForm;
