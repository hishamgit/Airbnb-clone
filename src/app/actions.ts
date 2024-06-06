"use server";

import { redirect, useSearchParams } from "next/navigation";
import prisma from "./lib/db";
import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/route";
import { supabase } from "@/lib/supabase";
import { useCountries } from "./lib/getCountries";

export async function createHome({ userId }: { userId: string }) {
  const home = await prisma.home.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!home) {
    const newHome = await prisma.home.create({
      data: {
        userId,
      },
    });
    return redirect(`/create/${newHome.id}/structure`);
  } else if (
    !home.addedCategory &&
    !home.addedDescription &&
    !home.addedLocation
  ) {
    redirect(`/create/${home.id}/structure`);
  } else if (home.addedCategory && !home.addedDescription) {
    redirect(`/create/${home.id}/description`);
  } else if (
    home.addedCategory &&
    home.addedDescription &&
    !home.addedLocation
  ) {
    redirect(`/create/${home.id}/location`);
  } else if (
    home.addedCategory &&
    home.addedDescription &&
    home.addedLocation
  ) {
    const newHome = await prisma.home.create({
      data: {
        userId,
      },
    });
    return redirect(`/create/${newHome.id}/structure`);
  }
}

export async function createHomewithId() {
  const session = await getServerSession(OPTIONS);
  const user = session?.user;
  const id = await prisma.user.findUnique({
    where: { email: user?.email! },
  });
  await createHome({ userId: id?.id! });
}

export async function createCategoryPage(formData: FormData) {
  console.log(formData.get("categoryName"), "category here");
  const data = await prisma.home.update({
    where: {
      id: formData.get("homeId") as string,
    },
    data: {
      categoryName: formData.get("categoryName") as string,
      addedCategory: true,
    },
  });
  redirect(`/create/${data.id}/description`);
}

export async function createDescription(formData: FormData) {
  const description = formData.get("description") as string;
  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const photo = formData.get("image") as File;
  const guests = formData.get("guest") as string;
  const bedrooms = formData.get("bedrooms") as string;
  const bathroom = formData.get("bathrooms") as string;

  const { data: imageData, error } = await supabase.storage
    .from("image-bucket-anb")
    .upload(`${photo.name}-${Date.now()}`, photo, {
      cacheControl: "3600",
    });
  if (error) console.log(error);
  else {
    const res = await prisma.home.update({
      where: {
        id: formData.get("homeId") as string,
      },
      data: {
        description,
        addedDescription: true,
        title,
        price,
        photo: imageData?.path,
        guests,
        bedrooms,
        bathroom,
      },
    });
    redirect(`/create/${res.id}/location`);
  }
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const locationValue = formData.get("locationValue") as string;
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(locationValue)?.value;
  const res = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      country: location,
      addedLocation: true,
    },
  });
  redirect(`/`);
}


