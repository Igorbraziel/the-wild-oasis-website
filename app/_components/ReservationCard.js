"use client";

import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import { getCabin } from "../_lib/data-service";
import Link from "next/link";
import { useEffect, useState } from "react";
import SpinnerMini from "./SpinnerMini";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    createdAt,
    cabinId,
  } = booking;

  const [cabin, setCabin] = useState(null);

  useEffect(() => {
    async function handleCabin() {
      setCabin(await getCabin(cabinId));
    }

    handleCabin();
  }, [cabinId]);

  if (!cabin) return <SpinnerMini />;

  const { name, image } = cabin;

  return (
    <div className="flex flex-col border border-primary-800 lg:flex-row">
      <div className="relative aspect-square h-24 sm:h-32 md:48 lg:h-32">
        <Image
          src={`/cabins/${image}`}
          alt={`Cabin ${name}`}
          fill
          className="border-r border-primary-800 object-cover"
        />
      </div>

      <div className="flex flex-grow flex-col space-y-2 px-4 py-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold sm:text-lg lg:text-xl">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="flex h-5 items-center rounded-sm bg-yellow-800 text-xs font-bold uppercase text-yellow-200 sm:h-6 sm:px-3 lg:h-7">
              past
            </span>
          ) : (
            <span className="flex h-5 items-center rounded-sm bg-green-800 px-2 text-xs font-bold uppercase text-green-200 sm:h-6 sm:px-3 lg:h-7">
              upcoming
            </span>
          )}
        </div>

        <p className="text-xs text-primary-300 sm:text-base lg:text-lg">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEEE, MMM dd yyyy")}
        </p>

        <div className="mt-auto flex items-baseline gap-3 sm:gap-4 lg:gap-5">
          <p className="text-sm font-semibold text-accent-400 sm:text-lg lg:text-xl">
            ${totalPrice}
          </p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-xs text-primary-300 sm:text-base lg:text-lg">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-xs text-primary-400 sm:text-sm">
            Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex w-[100px] flex-col border-l border-primary-800">
        {!isPast(new Date(startDate)) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex flex-grow items-center gap-2 border-b border-primary-800 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
            >
              <PencilSquareIcon className="h-3 w-3 text-primary-600 transition-colors group-hover:text-primary-800 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
