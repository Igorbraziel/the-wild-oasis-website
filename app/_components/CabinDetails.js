import TextExpander from "@/app/_components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function CabinDetails({ cabin }) {
  const { id, image, name, description, maxCapacity } = cabin;

  return (
    <div className="mb-14 lg:mb-24 grid grid-cols-[3fr_4fr] gap-4 border border-primary-800 pl-0 px-6 py-2 sm:mb-20 sm:gap-16 sm:px-8 lg:gap-20 lg:px-10 lg:py-3">
      <div className="relative sm:-translate-x-3 sm:scale-[1.15]">
        <Image
          src={`/cabins/${image}`}
          fill
          className="object-cover"
          alt={`Cabin ${name}`}
        />
      </div>

      <div>
        <h3 className="mb-2.5 w-[150%] lg:translate-x-[-254px] bg-primary-950 p-4 pb-1 text-2xl font-black text-accent-100 sm:mb-4 sm:text-4xl lg:mb-5 lg:p-6 lg:text-7xl">
          Cabin {name}
        </h3>

        <p className="mb-10 text-xs text-primary-300 sm:text-sm lg:text-lg">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="mb-7 flex flex-col gap-4 text-xs sm:text-sm lg:text-lg">
          <li className="flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span>
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-3 text-xs sm:text-sm lg:text-lg">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span>
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span>
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CabinDetails;
