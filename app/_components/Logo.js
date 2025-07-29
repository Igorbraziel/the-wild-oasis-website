"use client";

import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image
        src="/logo.png"
        quality={100}
        height="40"
        width="40"
        alt="The Wild Oasis logo"
      />
      <span className="text-xs sm:text-lg lg:text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
