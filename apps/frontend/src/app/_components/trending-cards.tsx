import ProductCard from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const latestProducts = [
  {
    id: 1,
    name: "Product 1",
    slug: "product-1",
    description: "Description of Product 1",
    rating: 4.6,
    href: "/products/product-1",
  },
  {
    id: 2,
    name: "Product 2",
    slug: "product-2",
    description: "Description of Product 2",
    rating: 5,
    href: "/products/product-2",
  },
  {
    id: 3,
    name: "Product 3",
    slug: "product-3",
    description: "Description of Product 3",
    rating: 3.3,
    href: "/products/product-3",
  },
  {
    id: 4,
    name: "Product 4",
    slug: "product-4",
    description: "Description of Product 4",
    rating: 4,
    href: "/products/product-4",
  },
  {
    id: 5,
    name: "Product 5",
    slug: "product-5",
    description: "Description of Product 5",
    rating: 5,
    href: "/products/product-5",
  },
  {
    id: 6,
    name: "Product 6",
    slug: "product-6",
    description: "Description of Product 6",
    rating: 4.1,
    href: "/products/product-6",
  },
  {
    id: 7,
    name: "Product 7",
    slug: "product-7",
    description: "Description of Product 7",
    rating: 3,
    href: "/products/product-7",
  },
];
function TrendingCards() {
  return (
    <section>
      <div className="flex items-center relative">
        <h2 className="text-xl px-10 font-semibold">Latest Products</h2>
        <Link href={"/products?sort=latest"}>
          <p className="absolute right-0 cursor-pointer text-sm hover:scale-105 hover:text-blue-600 pr-5">
            View all &rarr;
          </p>
        </Link>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-auto relative mx-8"
        plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
      >
        <CarouselContent className="px-4">
          {latestProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 py-2"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="!left-2 cursor-pointer z-10" />
        <CarouselNext className="!right-2 cursor-pointer z-10" />
      </Carousel>
    </section>
  );
}

export default TrendingCards;
