import { Suspense } from "react";
import { CardListing } from "./components/CardListing";
import Mapfilter from "./components/Mapfilteritems";
import prisma from "./lib/db";
import { SkeletonCard } from "./components/SkeletonCard";
import { Noitems } from "./components/NoItems";

const fetchData = async ({
  searchParams,
}: {
  searchParams: { category: string };
}) => {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams.category,
    },
    select: {
      id: true,
      photo: true,
      title: true,
      description: true,
      price: true,
      country: true,
    },
  });
  return data;
};

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string };
}) {
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
  searchParams: { category: string };
}) {
  const data = await fetchData({ searchParams });
  return (
    <>
      {data.length === 0 ? (
        <Noitems />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-8 gap-8">
          {data.map((item) => (
            <CardListing
              key={item.id}
              id={item.id as string}
              description={item.description as string}
              photo={item.photo as string}
              country={item.country as string}
              price={item.price as number}
              title={item.title as string}
            />
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
