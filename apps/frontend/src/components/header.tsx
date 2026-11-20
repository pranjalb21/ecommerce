import { CircleUserRound, ShoppingCart } from "lucide-react";
import DesktopTabNavbar from "./desktop-tab-navbar";
import MobileNavbar from "./mobile-navbar";

const optionItems = [
  { name: "Profile", href: "/profile", component: <CircleUserRound /> },
  { name: "Cart", href: "/cart", component: <ShoppingCart /> },
];

function Header() {
  return (
    <header>
      <nav className="flex justify-around border-b border-border bg-background text-foreground shadow-sm">
        <div className="hidden w-full justify-around items-center p-4 md:flex">
          <DesktopTabNavbar optionItems={optionItems} />
        </div>
        <div className="flex w-full justify-around items-center p-4 md:hidden">
          <MobileNavbar optionItems={optionItems} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
