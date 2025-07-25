"use client";

import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import { subtractDates } from "../_utils/helpers";

import { bookings } from "@/app/_data/bookings-data";
import { cabins } from "@/app/_data/cabins-data";
import { guests } from "@/app/_data/guests-data";

import {
  createBooking,
  createCabin,
  createGuest,
  deleteAllBookings,
  deleteAllCabins,
  deleteAllGuests,
  getAllGuests,
  getCabins,
} from "../_lib/data-service";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  await deleteAllGuests();
}

async function deleteCabins() {
  await deleteAllCabins();
}

async function deleteBookings() {
  await deleteAllBookings();
}

async function createGuests() {
  guests.forEach(async (guest) => {
    await createGuest(guest);
  });
}

async function createCabins() {
  cabins.forEach(async (cabin) => {
    await createCabin(cabin);
  });
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase
  // IDs for each object, it will calculate them on its own.
  // So it might be different for different people, especially after multiple uploads.
  // Therefore, we need to first get all guestIds and cabinIds,
  // and then replace the original IDs in the booking data with the actual ones from the DB

  const guestsFromApi = await getAllGuests();
  const allGuestIds = guestsFromApi.map((guest) => guest.id);
  console.log(allGuestIds)
  const cabinsFromApi = await getCabins();
  const allCabinIds = cabinsFromApi.map((cabin) => cabin.id);
  console.log(allCabinIds)

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  console.log(finalBookings);

  finalBookings.forEach(async (booking) => {
    await createBooking(booking);
  });
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div className="mt-auto flex flex-col gap-2 rounded-md bg-slate-200 p-2 text-center">
      <h3>SAMPLE DATA</h3>

      <button
        className="bg-slate-500 p-3 text-center text-lg font-bold"
        onClick={uploadAll}
        disabled={isLoading}
      >
        Upload ALL
      </button>

      <button
        className="bg-slate-500 p-3 text-center text-lg font-bold"
        onClick={uploadBookings}
        disabled={isLoading}
      >
        Upload bookings ONLY
      </button>
    </div>
  );
}

export default Uploader;
