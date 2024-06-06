"use client";
import { createLocation } from "@/app/actions";
import { BottomBar } from "@/app/components/BottomBar";
import { useCountries } from "@/app/lib/getCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function Location({ params }: { params: { id: string } }) {
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();
  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl mt-5 font-semibold tracking-tight">
          Where is your property located ?
        </h2>
      </div>
      <form action={createLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="locationValue" value={locationValue} />
        <div className="w-3/5 mx-auto  mt-10 pb-36">
          <div className="mb-5">
            <Select required onValueChange={(value)=>setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger><SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={locationValue}/>
        </div>
        <BottomBar/>
      </form>
    </>
  );
}
