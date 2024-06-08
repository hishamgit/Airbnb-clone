import Image from "next/image"
import { categoryItems } from "../lib/categoryItems"

export default function CategoryShowcase({categoryName}: {categoryName: string}) {
    const category=categoryItems.find((item)=>item.name===categoryName)
    return (
        <div className="flex items-center">
            <Image src={category?.imageUrl as string} alt="category image" width="44" height="44"/>
            <div className=" flex flex-col ml-4">
            <h2 className="font-meduim text-lg">{category?.name}</h2>
            <p className="text-muted-foreground text-sm">{category?.description as string}</p>
            </div>
        </div>
    )

}