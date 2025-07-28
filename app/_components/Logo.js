"use client";

import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "../_hooks/useMediaQuery";

function Logo() {
  const isTablet = useMediaQuery("(min-width: 768px)");

  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image
        src="/logo.png"
        quality={100}
        height={isTablet ? "60" : "30"}
        width={isTablet ? "60" : "30"}
        alt="The Wild Oasis logo"
      />
      <span className="text-xs sm:text-lg lg:text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
