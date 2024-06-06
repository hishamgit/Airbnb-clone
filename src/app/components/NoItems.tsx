import { File } from "lucide-react";

export function Noitems() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10 ">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <File  className="h-10 w-10 text-primary"/>
      </div>
    </div>
  );
}
