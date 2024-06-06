import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitButton } from "./SubmitButton";

export function BottomBar() {
  return (
    <div className="w-full bottom-0 fixed bg-white border-t h-15">
      <div className="flex items-centre justify-between mx-auto h-full px-5 lg:px-10 py-4 ">
        <Button size={"lg"} variant={"secondary"} asChild>
          <Link href={"/"}>Cancel</Link>
        </Button>
        <SubmitButton />
      </div>
    </div>
  );
}
