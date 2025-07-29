"use client";

import { updateReservation } from "@/app/_lib/actions";
import { useFormStatus } from "react-dom";

function UpdateReservationForm({
  bookingId,
  maxCapacity,
  currentNumGuests,
  currentObservations,
}) {
  return (
    <form
      action={updateReservation}
      className="flex flex-col gap-4 bg-primary-900 px-7 py-5 text-sm sm:gap-5 sm:px-10 sm:py-7 sm:text-base lg:gap-6 lg:px-12 lg:py-8 lg:text-lg"
    >
      <input type="hidden" name="bookingId" value={bookingId} />
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          defaultValue={currentNumGuests}
          id="numGuests"
          className="w-full rounded-sm bg-primary-200 px-3 py-2 text-primary-800 shadow-sm sm:px-4 lg:px-5 lg:py-3"
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
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={currentObservations}
          maxLength={255}
          className="w-full rounded-sm bg-primary-200 px-3 py-2 text-primary-800 shadow-sm sm:px-4 lg:px-5 lg:py-3"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <UpdateButton />
      </div>
    </form>
  );
}

function UpdateButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-4 py-2 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 sm:px-6 sm:py-3 lg:px-8 lg:py-4"
    >
      {pending ? "Updating..." : "Update reservation"}
    </button>
  );
}

export default UpdateReservationForm;
