"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: (
      <HomeIcon className="h-3 w-3 text-primary-600 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
    ),
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: (
      <CalendarDaysIcon className="h-3 w-3 text-primary-600 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
    ),
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: (
      <UserIcon className="h-3 w-3 text-primary-600 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
    ),
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="pb-4 sm:py-0 border-b-4 border-primary-900 sm:border-b-0 sm:border-r">
      <ul className="flex flex-col gap-2 text-sm sm:h-full sm:text-base lg:text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`flex items-center gap-3 px-3 py-1 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 sm:gap-4 sm:px-4 sm:py-2 lg:gap-4 lg:px-5 lg:py-3 ${pathname === link.href ? "bg-primary-900" : ""}`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
