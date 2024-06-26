import { Suspense } from "react";
import { getServerSession } from "next-auth";
import prisma from "../lib/db";
import { NoItemsFavorites } from "../components/NoItems";
import { CardListing } from "../components/CardListing";
import { SkeletonCard } from "../components/SkeletonCard";
import Link from "next/link";
import {unstable_noStore as noStore} from "next/cache"


const fetchData = async ({ userId }: { userId: string | undefined }) => {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      favourites: { some: { userId: userId } },
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
  const newData = processedData.map((home) => {
    const { favourites, ...newHome } = home;
    return newHome;
  });

  return newData;
};

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <Suspense fallback={renderSkeletonCards()}>
        <ShowData />
      </Suspense>
    </div>
  );
}

async function ShowData() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const userId = await prisma.user.findUnique({
    where: { email: email as string },
  });
  const data = await fetchData({
    userId: userId?.id,
  });
  return (
    <div className="pb-20">
      {data.length === 0 ? (
        <NoItemsFavorites />
      ) : (
        <>
          <h1 className="text-3xl font-bold pt-8">Your Favorites</h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-8 gap-8">
            {data.map((item) => (
              <Link key={item.id} href={`/home/${item.id}`}>
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
        </>
      )}
    </div>
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
