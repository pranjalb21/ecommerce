"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

function NavSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="group/search flex items-center relative min-w-0 w-full max-w-sm flex-1">
      <form className="flex items-center w-full">
        <Input
          name="search"
          placeholder="Search..."
          className="w-full pr-10 transition-[border-color,box-shadow] duration-300 ease-in-out"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          aria-label="Search"
          className="invisible absolute right-0 border-0 opacity-0 transition-opacity duration-300 group-focus-within/search:visible group-focus-within/search:opacity-100 cursor-pointer"
        >
          <Search className="transition-transform duration-200 group-hover/search:scale-105" />
        </Button>
      </form>
    </div>
  );
}

export default NavSearch;
