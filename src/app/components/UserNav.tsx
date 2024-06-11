import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { SignInButton } from "./Signin";
import Link from "next/link";
import { createHome } from "../actions";
import React from "react";

export default async function UserNav() {
  const session = await getServerSession();

  const user = session?.user;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-4 flex items-center gap-x-3 ">
            <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
            <img
              src={
                user?.image ??
                "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
              }
              alt=" image of user"
              className="rounded-full w-4 hidden lg:block"
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[200px]">
          {user ? (
            <>
            <DropdownMenuItem>
                <Link href="/" className="w-full">
                 Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form action={createHome} className="w-full">
                  <button type="submit" className="w-full text-start">
                    Create new listing
                  </button>
                </form>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/my-homes" className="w-full">
                  My listings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/favorites" className="w-full">
                  My favorites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/bookings" className="w-full">
                  My bookings
                </Link>
              </DropdownMenuItem>
            </>
          ) : null}

          <DropdownMenuItem>
            <SignInButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
