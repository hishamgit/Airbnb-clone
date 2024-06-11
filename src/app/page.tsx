import { Suspense } from "react";
import { CardListing } from "./components/CardListing";
import Mapfilter from "./components/Mapfilteritems";
import prisma from "./lib/db";
import { SkeletonCard } from "./components/SkeletonCard";
import { Noitems } from "./components/NoItems";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import {unstable_noStore as noStore} from "next/cache"

const fetchData = async ({
  searchParams,
  userId,
}: {
  searchParams: {
    category?: string;
    locationValue?: string;
    guest?: string;
    bedrooms?: string;
    bathrooms?: string;
  };
  userId: string | undefined;
}) => {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.category ?? undefined,
      country: searchParams?.locationValue ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.bedrooms ?? undefined,
      bathroom: searchParams?.bathrooms ?? undefined,
    },
    select: {
      id: true,
      photo: true,
      title: true,
      description: true,
      price: true,
      country: true,
      favourites: { where: { userId: userId }, select: { id: true } },
    },
  });

  const processedData = data.map((home) => ({
    ...home,
    isInFavoriteList: home.favourites.length > 0,
  }));
  const newData = processedData.map((home) => {
    const { favourites, ...newHome } = home;
    return newHome;
  });

  return newData;
};

export default async function Home({
  searchParams,
}: {
  searchParams: {
    category?: string;
    locationValue?: string;
    guest?: string;
    bedrooms?: string;
    bathrooms?: string;
  };
}) {
  const session = await getServerSession();
  if (!session?.user) {
    // Redirect to the login page if the user is not authenticated
    redirect("/api/auth/signin");
  }
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <Mapfilter />
      <Suspense key={searchParams.category} fallback={renderSkeletonCards()}>
        <ShowData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowData({
  searchParams,
}: {
  searchParams: {
    category?: string;
    locationValue?: string;
    guest?: string;
    bedrooms?: string;
    bathrooms?: string;
  };
}) {
  const session = await getServerSession();
  const email = session?.user?.email;
  const userId = await prisma.user.findUnique({
    where: { email: email as string },
  });
  const data = await fetchData({
    searchParams,
    userId: userId?.id,
  });
  return (
    <>
      {data.length === 0 ? (
        <Noitems />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-8 gap-8">
          {data.map((item) => (
            <Link href={`/home/${item.id}`} key={item.id}>
              <CardListing
                key={item.id}
                id={item.id as string}
                description={item.description as string}
                photo={item.photo as string}
                country={item.country as string}
                price={item.price as number}
                title={item.title as string}
                userId={userId?.id}
                isInFavoriteList={item.isInFavoriteList as boolean}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
function renderSkeletonCards() {
  const skeletonCardCount = 8;

  const skeletonCards = Array.from(
    { length: skeletonCardCount },
    (_, index) => <SkeletonCard key={index} />
  );

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-8 gap-8">
      {skeletonCards}
    </div>
  );
}
