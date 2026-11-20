import React from "react";
import NavSearch from "./nav-search";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { getCopyrightYear } from "./copyright-year";

async function MobileNavbar({
  optionItems,
}: {
  optionItems: { name: string; href: string; component: React.ReactNode }[];
}) {
  const year = await getCopyrightYear();
  return (
    <div className="flex justify-around w-full items-center">
      <h1 className="sm:text-xl font-bold">
        <Link href="/">My App</Link>
      </h1>
      <NavSearch />
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="" aria-label="Open menu">
              <Menu />
            </Button>
          }
        />
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">
              <Link href="/">My App</Link>
            </SheetTitle>
          </SheetHeader>

          <ul className="flex flex-col justify-between gap-1">
            {optionItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:bg-muted hover:text-primary flex gap-4 p-2 px-5 items-center"
                >
                  <span>{item.component}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <SheetFooter>
            <p className="italic text-sm">
              My App &copy; {year}
            </p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
