"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { useState } from "react";

export function SelectCategory() {
  const [selectedCategory, setSelected] = useState<String | undefined>(undefined);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36 ">
      <input
        type="hidden"
        value={selectedCategory as string}
        name="categoryName"
      />
      {categoryItems.map((category) => (
        <div key={category.id} className="cursor-pointer">
          <Card
            onClick={() => setSelected(category.name)}
            className={
              selectedCategory === category.name ? "border-primary" : ""
            }
          >
            <CardHeader>
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={32}
                height={32}
                className="w-8 h-8 mx-auto"
              />
              <h3 className="font-medium mx-auto">{category.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
