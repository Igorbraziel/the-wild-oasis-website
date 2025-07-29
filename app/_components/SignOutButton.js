import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="flex w-full items-center gap-2 px-3 py-1 text-sm font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 sm:gap-3 sm:px-4 sm:py-2 sm:text-base lg:gap-4 lg:px-5 lg:py-3 lg:text-lg">
        <ArrowRightOnRectangleIcon className="h-3 w-3 text-primary-600 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
