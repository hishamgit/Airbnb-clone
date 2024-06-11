import { File, FileQuestion, FileQuestionIcon, Link } from "lucide-react";

export function Noitems() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10 ">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <File  className="h-10 w-10 text-primary"/>
      </div>
      <h2 className="mt-5 text-xl font-semibold ">Sorry no listings found for this search..</h2>
      <p className="text-muted-foreground mt-2 text-sm text-center leading-6">Please select another category or make another search </p>
    </div>
  );
}

export function NoItemsBookings() {
  return(
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10 ">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <File  className="h-10 w-10 text-primary"><FileQuestion/></File>
      </div>
      <h2 className="mt-5 text-xl font-semibold ">Sorry no bookings found for you.. </h2>
      <p className="text-muted-foreground mt-2 text-sm text-center leading-6">Please book a listing to see them here</p>
    </div>
  )
}
export function NoItemsFavorites() {
  return(
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10 ">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <File  className="h-10 w-10 text-primary"><FileQuestionIcon size="1.5rem"/></File>
      </div>
      <h2 className="mt-5 text-xl font-semibold ">Hey you don`&apos;`t have any favorites.. </h2>
      <p className="text-muted-foreground mt-2 text-sm text-center leading-6">click the heart icon to add favourites</p>
    </div>
  )
}