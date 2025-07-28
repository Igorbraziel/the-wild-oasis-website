"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-lg font-semibold sm:text-xl lg:text-3xl">
        Something went wrong!
      </h1>
      <p className="text-lg">{error.message}</p>

      <button
        onClick={reset}
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
      >
        Try again
      </button>
    </main>
  );
}
