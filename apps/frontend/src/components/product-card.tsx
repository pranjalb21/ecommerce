import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import StarRating from "@/app/_components/star-rating";
import Link from "next/link";

function ProductCard({
  product,
}: {
  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    rating: number;
    href: string;
  };
}) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group/card overflow-hidden rounded-md p-0 shadow-md transition-shadow duration-300 hover:shadow-lg">
        <div className="relative h-40 w-full sm:h-48">
          <Image
            src="/51KuwK+TZVL_.jpg"
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-3"
          />
        </div>

        <CardContent className="p-4">
          <h3>{product.name}</h3>
          <small>{product.description}</small>
          <StarRating product={product} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 ">
            <Button className="rounded-md bg-white-100 text-black border border-black cursor-pointer hover:bg-amber-100 hover:font-semibold transition-[colors, background-color, transform] duration-300 ease-in-out hover:-mt-0.5">
              Add to cart
            </Button>
            <Button className="rounded-md bg-amber-200 text-black border border-black cursor-pointer hover:bg-amber-300 hover:font-semibold transition-[colors, background-color, transform] duration-300 ease-in-out hover:-mt-0.5">
              Buy now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;
