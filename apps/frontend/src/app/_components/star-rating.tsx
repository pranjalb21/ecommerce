import { Star } from "lucide-react";

function StarRating({
  product,
}: {
  product: {
    id: number;
    name: string;
    description: string;
    rating: number;
    href: string;
  };
}) {
  return (
    <div
      className="flex"
      role="img"
      aria-label={`${product.rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fillPercent =
          Math.min(1, Math.max(0, product.rating - index)) * 100;

        return (
          <span key={index} className="relative inline-flex">
            <Star
              className="size-5 fill-muted text-muted-foreground"
              aria-hidden="true"
            />
            <span
              className="absolute inset-y-0 left-0 overflow-hidden text-yellow-500"
              style={{ width: `${fillPercent}%` }}
            >
              <Star className="size-5 fill-yellow-500" aria-hidden="true" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
