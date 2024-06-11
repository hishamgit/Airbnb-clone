import CategoryShowcase from "@/app/components/CategoryShowcase";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import MapHome from "@/app/components/MapHome";
import { createReservation } from "@/app/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateReservationButton } from "@/app/components/SubmitButtons";
import Calender from "@/app/components/Calender";
import {unstable_noStore as noStore} from "next/cache"


const fetchData = async (id: string) => {
noStore();
  const data = await prisma.home.findUnique({
    where: {
      id,
    },
    select: {
      photo: true,
      title: true,
      description: true,
      price: true,
      country: true,
      categoryName: true,
      bathroom: true,
      bedrooms: true,
      guests: true,
      reservations: {
        where: {
          homeId: id,
        },
        select: {
          startDate: true,
          endDate: true,
        },
      },
      user: {
        select: {
          name: true,
          image: true,
          email: true,
          id: true,
        },
      },
    },
  });
  return data;
};
export default async function HomeDetails({
  params,
}: {
  params: { id: string };
}) {
  const data = await fetchData(params.id);

  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(data?.country as string);

  const { data: photo } = supabase.storage
    .from("image-bucket-anb")
    .getPublicUrl(data?.photo as string);
  console.log(data?.reservations, "reservations");
  return (
    <div className="w-[75%] mx-auto mt-10 mb-10">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Image of Home"
          src={photo?.publicUrl}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {location?.flag} {location?.label} / {location?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
            {data?.bathroom} Bathrooms
          </div>

          <div className="flex items-center mt-6">
            <img
              src={
                data?.user?.image ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.user?.name}</h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>
          <Separator className="my-8" />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-8" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-8" />
          <MapHome locationValue={data?.country as string} />
        </div>
        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={data?.user?.id} />
          <Calender reservation={data?.reservations} />
          {data?.user ? (
           <CreateReservationButton/>
          ) : (
            <Link href={"/api/auth/login"}>
              <Button className="w-full">Make a reservation</Button>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
