import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinList({ filteredValue }) {
  const cabins = await getCabins();

  if (!cabins?.length) return null;

  let displayedCabins = cabins;
  if (filteredValue === "small") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  } else if (filteredValue === "medium") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity < 8,
    );
  } else if (filteredValue === "large") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
