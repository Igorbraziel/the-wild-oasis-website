"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(value) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex border border-primary-900">
      <Button
        actived={activeFilter === "all"}
        onClick={() => handleFilter("all")}
      >
        All cabins
      </Button>
      <Button
        actived={activeFilter === "small"}
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 guests
      </Button>
      <Button
        actived={activeFilter === "medium"}
        onClick={() => handleFilter("medium")}
      >
        4&mdash;7 guests
      </Button>
      <Button
        actived={activeFilter === "large"}
        onClick={() => handleFilter("large")}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ actived, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`border border-primary-950 px-5 py-2 hover:bg-primary-800 ${actived ? "bg-primary-800 text-primary-50" : ""}`}
      disabled={actived}
    >
      {children}
    </button>
  );
}

export default Filter;
