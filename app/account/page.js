import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Area",
};

export default async function Page() {
  const session = await auth();

  return (
    <h2 className="mb-4 text-xl font-semibold text-accent-400 sm:mb-5 lg:mb-7 lg:text-2xl">
      Welcome, {session?.user?.name || "User"}
    </h2>
  );
}
