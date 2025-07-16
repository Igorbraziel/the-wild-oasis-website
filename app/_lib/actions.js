"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest as updateGuestMutation,
} from "@/app/_lib/data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalID = formData.get("nationalID");

  if (nationalID !== "" && !/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please, provide a valid national ID");
  }

  const updatedGuest = { nationalID, nationality, countryFlag };

  await updateGuestMutation(session.user.guestId, updatedGuest);

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You're not allowed to delete this booking");

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to update this reservation");

  const bookingId = parseInt(formData.get("bookingId"));
  const numGuests = parseInt(formData.get("numGuests"));
  const observations = formData.get("observations");

  const allBookings = await getBookings(session.user.guestId);
  const allBookingsIds = allBookings.map((booking) => booking.id);

  if (!allBookingsIds.includes(bookingId))
    throw new Error("You're not allowed to update this reservation");

  await updateBooking(bookingId, { numGuests, observations });

  revalidatePath("/account/reservations", "layout");
  
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
