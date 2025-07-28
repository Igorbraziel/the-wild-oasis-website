import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h2 className="lg:text-3xl sm:text-xl text-lg font-semibold">
        Sign in to access your guest area
      </h2>

      <SignInButton />
    </div>
  );
}
