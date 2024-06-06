import { createDescription } from "@/app/actions";
import { BottomBar } from "@/app/components/BottomBar";
import Counter from "@/app/components/Counter";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Description({params}: {params: {id: string}}) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl mt-5 font-semibold tracking-tight">
          Describe your property
        </h2>
      </div>
      <form action={createDescription}>
      <input type="hidden" name="homeId" value={params.id} />
        <div className="w-3/5 mx-auto flex flex-col gap-y-3 mt-10 mb-36 ">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              type="text"
              required
              name="title"
              placeholder="short and simple.. "
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              required
              name="description"
              placeholder="please describe your property..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              required
              name="price"
              min={10}
              placeholder="price per night in USD"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input type="file" required name="image" />
          </div>
          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-1">
                  <h3 className="underline font-medium">Guests</h3>
                  <p className="text-muted-foreground text-sm">
                    How many guests are allowed ?
                  </p>
                </div>
                <Counter name="guest"/>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-1">
                  <h3 className="underline font-medium">Rooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many Rooms do you have ?
                  </p>
                </div>
                <Counter name="bedrooms"/>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-1">
                  <h3 className="underline font-medium">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many bathrooms do you have ?
                  </p>
                </div>
                <Counter name="bathrooms"/>
              </div>
            </CardHeader>
          </Card>
        </div>
        <BottomBar/>
      </form>
    </>
  );
}
