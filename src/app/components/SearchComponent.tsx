"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import MapHome from "./MapHome";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "./SubmitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import Counter from "./Counter";

export function SearchComponent() {
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          next
        </Button>
      );
    } else if (step === 2) {
      return <SubmitButton />;
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-4 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <div className="px-4">Anywhere</div>
            <div className="px-4">Any week</div>
            <div className="px-4">Any guests</div>
          </div>
          <SearchIcon className="rounded-full bg-primary text-white p-1 h-8 w-8" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[425px]">
        <form className="flex flex-col gap-4">
            <input type="hidden" name="locationValue" value={locationValue}/>
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a country</DialogTitle>
                <DialogDescription>Please choose a country</DialogDescription>
              </DialogHeader>
              <Select
                required
                onValueChange={(value) => setLocationValue(value)}
                value={locationValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
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
              <MapHome locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all the info you need</DialogTitle>
                <DialogDescription>Please select required</DialogDescription>
              </DialogHeader>
              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-y-1">
                      <h3 className="underline font-medium">Guests</h3>
                      <p className="text-muted-foreground text-sm">
                        How many guests  ?
                      </p>
                    </div>
                    <Counter name="guest" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-y-1">
                      <h3 className="underline font-medium">Rooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many Rooms do you need ?
                      </p>
                    </div>
                    <Counter name="bedrooms" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-y-1">
                      <h3 className="underline font-medium">Bathrooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many bathrooms required ?
                      </p>
                    </div>
                    <Counter name="bathrooms" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}
          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
