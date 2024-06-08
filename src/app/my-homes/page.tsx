import { Suspense } from "react";
import { getServerSession } from "next-auth";
import prisma from "../lib/db";
import Mapfilter from "../components/Mapfilteritems";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { Noitems } from "../components/NoItems";
import { CardListing } from "../components/CardListing";
import { SkeletonCard } from "../components/SkeletonCard";
import Link from "next/link";

const fetchData = async ({
  searchParams,
  userId,
}: {
  searchParams: { category: string };
  userId: string | undefined;
}) => {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams.category,
      userId: userId,
    },
    select: {
      id: true,
      photo: true,
      title: true,
      description: true,
      price: true,
      country: true,
      favourites: { where: { userId: userId } },
    },
  });

  const processedData = data.map((home) => ({
    ...home,
    isInFavoriteList: home.favourites.length > 0,
  }));
  processedData.forEach((home) => delete home.favourites);

  return processedData;
};

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <Mapfilter />
      <h1 className="text-3xl font-bold pt-8">Your Homes</h1>
      <Suspense key={searchParams.category} fallback={renderSkeletonCards()}>
        <ShowData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowData({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const session = await getServerSession(OPTIONS);
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
