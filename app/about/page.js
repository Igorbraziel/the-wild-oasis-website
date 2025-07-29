import Image from "next/image";

import about1 from "@/public/about-1.jpg";
import { getCabins } from "../_lib/data-service";
import Link from "next/link";

export const revalidate = 86400;

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="flex flex-col gap-10 text-xs sm:grid sm:grid-cols-5 sm:items-center sm:gap-x-24 sm:gap-y-32 sm:text-sm lg:text-lg">
      <div className="col-span-3">
        <h1 className="mb-4 text-xl font-medium text-accent-400 sm:mb-7 sm:text-2xl lg:mb-10 lg:text-4xl">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabins?.length || 0} luxury cabins provide a cozy base, but the
            real freedom and peace you&apos;ll find in the surrounding
            mountains. Wander through lush forests, breathe in the fresh air,
            and watch the stars twinkle above from the warmth of a campfire or
            your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="sm:col-span-2">
        <Image
          src={about1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
          quality={90}
        />
      </div>

      <div className="relative aspect-square sm:col-span-2">
        <Image
          src="/about-2.jpg"
          fill
          alt="Family that manages The Wild Oasis"
          className="object-cover"
        />
      </div>

      <div className="sm:col-span-3">
        <h1 className="mb-4 text-xl font-medium text-accent-400 sm:mb-7 sm:text-2xl lg:mb-10 lg:text-4xl">
          Managed by our family since 1962
        </h1>

        <div className="space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div className="text-center">
            <Link
              href="/cabins"
              className="mt-1 inline-block bg-accent-500 px-4 py-2 text-base lg:text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600 sm:mt-2 sm:px-6 sm:py-4 lg:mt-4 lg:px-8 lg:py-5"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
