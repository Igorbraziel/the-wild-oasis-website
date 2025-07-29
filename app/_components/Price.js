import { getCabinPrice } from "@/app/_lib/data-service";

async function Price({ cabinId }) {
  const { regularPrice, discount } = await getCabinPrice(cabinId);

  return (
    <p className="flex items-baseline gap-3 text-lg sm:text-xl lg:mt-12 lg:text-3xl">
      {discount > 0 ? (
        <>
          <span className="font-[350]">${regularPrice - discount}</span>
          <span className="font-semibold text-primary-600 line-through">
            ${regularPrice}
          </span>
        </>
      ) : (
        <span className="font-[350]">${regularPrice}</span>
      )}
      <span className="text-primary-200">/ night</span>
    </p>
  );
}

export default Price;
