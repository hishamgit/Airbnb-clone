"use client";
import Link from "next/link";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Mapfilter() {
  const searchParams = useSearchParams();
  const search = searchParams.get("category");
  return (
    <div className="flex gap-x-10 mt-5 w-full overflow-x-scroll hide-scrollbar">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={{ pathname: "/", query: { category: item.name } }}
          className={cn(
            search === item.name ? "border-b-2 border-black  " : "opacity-70",
            "flex flex-col flex-shrink-0 items-center gap-y-3"
          )}
        >
          <div className="relative w-6 h-6">
            <Image
              src={item.imageUrl}
              alt="category image"
              className="w-6 h-6 "
              width={24}
              height={24}
            />
          </div>
          <p className="text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
