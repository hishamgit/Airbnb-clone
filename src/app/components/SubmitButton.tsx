"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size={"lg"} type="submit">
          <Loader2 className="w-4 h-4  animate-spin"> Loading..</Loader2>
        </Button>
      ) : (
        <Button size={"lg"} type="submit">
          Next
        </Button>
      )}
    </>
  );
}
