import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import NavbarIcons from "./navbar-icons";
import Link from "next/link";
import NavSearch from "./nav-search";

function DesktopTabNavbar({
  optionItems,
}: {
  optionItems: { name: string; href: string; component: React.ReactNode }[];
}) {
  return (
    <>
      <div className="logo">
        <h1 className="text-2xl font-bold">
          <Link href="/">My App</Link>
        </h1>
      </div>
      <NavSearch />
      <div>
        <ul className="flex gap-6">
          {optionItems.map((item) => (
            <li key={item.name}>
              <NavbarIcons item={item} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DesktopTabNavbar;
