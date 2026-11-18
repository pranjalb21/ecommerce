import Link from "next/link";
import CartBadge from "./cart-badge";

function NavbarIcons({
  item,
}: {
  item: { name: string; href: string; component: React.ReactNode };
}) {
  return (
    <Link
      href={item.href}
      className="relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:scale-x-100 hover:scale-105"
    >
      {item.component}
      {item.name === "Cart" && <CartBadge count={3} />}
    </Link>
  );
}

export default NavbarIcons;
