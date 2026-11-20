"use client";
import { useParams } from "next/navigation";

function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div>
      <p>This is product details page</p>
      <p>Product Slug: {slug}</p>
    </div>
  );
}

export default ProductDetails;
