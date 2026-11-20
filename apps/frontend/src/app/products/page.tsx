"use client";
import { useSearchParams } from "next/navigation";

function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  return (
    <div>
      <p>This is product details page</p>
      {category ? <p>Category: {category}</p> : <></>}
      {sort ? <p>Sort: {sort}</p> : <></>}
    </div>
  );
}

export default ProductsPage;
