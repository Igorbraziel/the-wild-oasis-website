import CabinDetails from "@/app/_components/CabinDetails";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { auth } from "@/app/_lib/auth";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);

  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  const session = await auth();

  return (
    <div className="mx-auto sm:mt-6 mt-4 lg:mt-8 max-w-6xl">
      <CabinDetails cabin={cabin} />

      <div>
        <h2 className="sm:mb-6 mb-4 lg:mb-8 text-center sm:text-3xl text-xl lg:text-5xl font-semibold text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} user={session?.user}/>
        </Suspense>
      </div>
    </div>
  );
}
