import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  return {
    title: `Reservation ${params.bookingId}`,
  };
}

export default async function Page({ params }) {
  const { cabinId, numGuests, observations } = await getBooking(
    params.bookingId,
  );
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{params.bookingId}
      </h2>

      <UpdateReservationForm
        bookingId={params.bookingId}
        maxCapacity={maxCapacity}
        currentNumGuests={numGuests}
        currentObservations={observations}
      />
    </div>
  );
}
