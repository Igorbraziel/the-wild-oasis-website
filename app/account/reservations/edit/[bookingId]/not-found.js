import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-semibold">Reservation Not Found, Try Again Bellow</h1>
      <Link
        href="/account/reservations"
        className="text-lg font-bold border border-primary-400 rounded-sm bg-accent-600 text-primary-900 py-2 px-3"
      >
        Back To All Reservations
      </Link>
    </div>
  );
}
