import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 py-3">
      <ul className="flex items-center gap-6 sm:gap-10 lg:gap-16">
        <li>
          <Link
            href="/cabins"
            className="text-sm transition-colors hover:text-accent-400 sm:text-lg lg:text-xl"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-sm transition-colors hover:text-accent-400 sm:text-lg lg:text-xl"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex items-center justify-center gap-3 text-sm transition-colors hover:text-accent-400 sm:text-lg lg:text-xl"
            >
              <img
                referrerPolicy="no-referrer"
                className="max-h-8 rounded-full"
                src={session.user.image.toString()}
                alt={session.user.name.toString()}
              />
              <span className="text-sm font-bold sm:text-lg lg:text-xl">
                Guest area
              </span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="text-sm transition-colors hover:text-accent-400 sm:text-lg lg:text-xl"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
