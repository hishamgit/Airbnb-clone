import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButton";
import { DeleteFromFavorite, addToFavorite } from "../actions";

interface iAppProps {
  id: string;
  title: string;
  description: string;
  price: number;
  photo: string;
  country: string;
  userId: string | undefined;
  isInFavoriteList: boolean;
}
export function CardListing({
  id,
  title,
  description,
  price,
  photo,
  country,
  userId,
  isInFavoriteList,
}: iAppProps) {
  const { data } = supabase.storage
    .from("image-bucket-anb")
    .getPublicUrl(photo);
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(country);

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={data.publicUrl}
          alt="property image"
          fill
          className="rounded-lg h-full mb-3 object-cover"
        />
        {userId && (
          <div className=" z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="homeId" value={id} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="homeId" value={id} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href="/">
        <h3 className="font-medium text-base">
          {location?.flag} {location?.label} / {location?.region}
        </h3>
      </Link>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {description}
      </p>
      <p className="text-sm pt-2 text-muted-foreground">
        <span className="font-medium text-black">${price}</span> Night
      </p>
    </div>
  );
}
