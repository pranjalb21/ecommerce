import ProductCard from "@/components/product-card";

const bestSellerProducts = [
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
function BestSellerSection() {
  return (
    <section className="mt-2">
      <h2 className="text-xl px-10 font-semibold">Best Selleing Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 py-5">
        {bestSellerProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default BestSellerSection;
