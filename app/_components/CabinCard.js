import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border border-primary-800">
      <div className="relative min-w-[30%] flex-1 border-r border-primary-800">
        <Image
          src={`/cabins/${image}`}
          fill={true}
          alt={`Cabin ${name}`}
          className="object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="bg-primary-950 px-7 pb-4 pt-5">
          <h3 className="mb-3 text-sm font-semibold text-accent-500 sm:text-lg lg:text-2xl">
            Cabin {name}
          </h3>

          <div className="mb-2 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-xs text-primary-200 sm:text-base lg:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline justify-end gap-3">
            {discount > 0 ? (
              <>
                <span className="text-lg font-[350] sm:text-xl lg:text-3xl">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold text-primary-600 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-lg font-[350] sm:text-xl lg:text-3xl">
                ${regularPrice}
              </span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="border-t border-t-primary-800 bg-primary-950 text-right">
          <Link
            href={`/cabins/${id}`}
            className="inline-block border-l border-primary-800 px-6 py-4 text-base transition-all hover:bg-accent-600 hover:text-primary-900 sm:text-lg lg:text-xl"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
