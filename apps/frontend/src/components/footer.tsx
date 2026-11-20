import Link from "next/link";
import { getCopyrightYear } from "./copyright-year";

const optionItems = [
  { name: "About", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];
async function Footer() {
  const year = await getCopyrightYear();
  return (
    <footer className="border-t border-border bg-background text-foreground shadow-sm p-4 flex justify-between items-center">
      <p>
        My App<sup>&copy;</sup> {year}
      </p>
      <ul className="flex gap-4 mr-3">
        {optionItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
