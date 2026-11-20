"use client";

import Link from "next/link";
import TrendingCards from "./_components/trending-cards";
import BestSellerSection from "./_components/best-seller-section";

const categories = [
  { name: "Charger", href: "/products?category=charger" },
  { name: "Light", href: "/products?category=light" },
  { name: "Home & Kitchen", href: "/products?category=home-kitchen" },
  { name: "Stationary", href: "/products?category=stationary" },
  { name: "Others", href: "/products?category=others" },
];
export default function Home() {
  return (
    <>
      <section>
        <ul className="flex flex-wrap gap-4 p-2 justify-center">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={category.href}
                className="text-black-500 bg-gray-200 px-2 py-1 rounded-2xl cursor-pointer hover:bg-gray-300 duration-200 text-sm"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <TrendingCards />
      <BestSellerSection />
    </>
  );
}
