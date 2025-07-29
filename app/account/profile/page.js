import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update Account",
};

export default async function Page() {
  const session = await auth();
  const { guest } = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-accent-400 sm:text-xl lg:mb-4 lg:text-2xl">
        Update your guest profile
      </h2>

      <p className="mb-4 text-sm text-primary-200 sm:mb-6 sm:text-base lg:mb-8 lg:text-lg">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="w-full rounded-sm bg-primary-200 px-3 py-2 text-primary-800 shadow-sm sm:px-4 lg:px-5 lg:py-3"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
