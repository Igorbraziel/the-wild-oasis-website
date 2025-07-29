"use client";

import { updateGuest } from "../_lib/actions";
import { useFormStatus } from "react-dom";

function UpdateProfileForm({ children, guest }) {
  const { fullName, email, countryFlag, nationalID } = guest;

  return (
    <form
      action={updateGuest}
      className="flex flex-col gap-6 bg-primary-900 px-8 py-4 text-sm sm:px-10 sm:py-6 sm:text-base lg:px-12 lg:py-8 lg:text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={fullName}
          className="w-full rounded-sm bg-primary-200 px-3 py-2 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 sm:px-4 lg:px-5 lg:py-3"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={email}
          className="w-full rounded-sm bg-primary-200 px-3 py-2 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 sm:px-4 lg:px-5 lg:py-3"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="relative">
            {countryFlag && (
              <img
                src={countryFlag}
                alt="Country flag"
                className="h-5 rounded-sm object-cover"
              />
            )}
          </div>
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="w-full rounded-sm bg-primary-200 px-3 py-2 text-primary-800 shadow-sm sm:px-4 lg:px-5 lg:py-3"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <FormButton />
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-4 py-2 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 sm:px-6 sm:py-3 lg:px-8 lg:py-4"
    >
      {pending ? "Updating..." : "UpdateProfile"}
    </button>
  );
}

export default UpdateProfileForm;
