import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin, user }) {
  const bookedDates = await getBookedDatesByCabinId(cabin.id);
  const settings = await getSettings();

  return (
    <div className={`grid min-h-[400px] grid-cols-2 border border-primary-800`}>
      <DateSelector
        bookedDates={bookedDates}
        settings={settings}
        cabin={cabin}
      />
      {user ? <ReservationForm cabin={cabin} user={user} /> : <LoginMessage />}
    </div>
  );
}

export default Reservation;
