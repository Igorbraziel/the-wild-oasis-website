import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";
import { auth } from "./auth";

/////////////
// GET

export async function getCabin(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cabins/${id}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Failed fetching the cabin");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function getBookedDatesByCabinId(cabinId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/cabin/${cabinId}`,
      {
        method: "GET",
      },
    );

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data = await response.json();

    // Converting to actual dates to be displayed in the date picker
    const bookedDates = data
      .map((booking) => {
        return eachDayOfInterval({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        });
      })
      .flat();

    return bookedDates;
  } catch (error) {
    console.error(error.message);
    notFound();
  }
}

export async function getCabinPrice(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cabins/price/${id}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Failed fetching the cabin price");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export const getCabins = async function () {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cabins`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed fetching the cabins");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/guests/${email}`,
      {
        method: "GET",
      },
    );

    if (response.status !== 404 && !response.ok) {
      throw new Error("Failed fetching the guest");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function getAllGuests() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guests`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed fetching the guests");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function getBooking(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      throw new Error("Failed fetching the booking");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function getBookings(guestId) {
  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/guest/${guestId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );

    if (!response.ok && response.status !== 404) {
      throw new Error("Failed fetching the bookings by guestId");
    }

    if (response.status === 404) return [];

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function getSettings() {
  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/settings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed fetching the settings");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/guests/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGuest),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed creating a new guest");
    }

    const newGuestObj = await response.json();
    return newGuestObj.data;
  } catch (error) {
    console.error("Error Creating Guest:", error.message);
  }
}

export async function createBooking(newBooking) {
  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(newBooking),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed creating a new booking");
    }

    const newBookingObj = await response.json();
    return newBookingObj.data;
  } catch (error) {
    console.error("Error Creating Booking:", error.message);
  }
}

export async function createCabin(newCabin) {
  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cabins/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(newCabin),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed creating a new cabin");
    }

    const newCabinObj = await response.json();
    return newCabinObj.data;
  } catch (error) {
    console.error("Error Creating Cabin:", error.message);
  }
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/guests/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(updatedFields),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed updating a guest");
    }

    const updatedGuestObj = await response.json();
    return updatedGuestObj.data;
  } catch (error) {
    console.error("Error Updating Guest:", error.message);
  }
}

export async function updateBooking(id, updatedFields) {
  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(updatedFields),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed updating booking");
    }

    const updatedBookingObj = await response.json();
    return updatedBookingObj.data;
  } catch (error) {
    console.error("Error Updating Booking:", error.message);
  }
}

/////////////
// DELETE

export async function deleteBooking(id) {
  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed deleting the booking");
    }
  } catch (error) {
    console.error("Error Deleting Booking:", error.message);
  }
}

export async function deleteAllBookings() {
  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/delete/all`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed deleting the bookings");
    }
  } catch (error) {
    console.error("Error Deleting Bookings:", error.message);
  }
}

export async function deleteAllGuests() {
  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/guests/delete/all`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed deleting the guests");
    }
  } catch (error) {
    console.error("Error Deleting guests:", error.message);
  }
}

export async function deleteAllCabins() {
  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cabins/delete/all`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed deleting the cabins");
    }
  } catch (error) {
    console.error("Error Deleting Cabins:", error.message);
  }
}
