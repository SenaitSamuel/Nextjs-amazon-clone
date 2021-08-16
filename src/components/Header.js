import React from "react";
import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const [session, loading] = useSession();
  const items = useSelector(selectItems);
  const router = useRouter();

  return (
    <div className="flex items-center bg-amazon_blue p-1 flex-grow">
      {/* Top nav bar  */}
      <div className=" mt-2 flex items-center  flex-grow sm:flex-grow-0">
        <Image
          onClick={() => router.push("/")}
          src="https://links.papareact.com/f90"
          width={150}
          height={40}
          objectFit="contain"
          className="cursor-pointer"
        />
      </div>
      {/* Search */}
      <div className=" hidden sm:flex items-center h-10  flex-grow rounded-md bg-yellow-400  hover:bg-yellow-500  cursor-pointer">
        <input
          className=" p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          type="text"
        />
        <SearchIcon className="h-12 p-4" />
      </div>
      {/* right*/}
      <div className="flex items-center text-xs space-x-6 text-white mx-6 whitespace-nowrap ">
        <div onClick={() => router.push("/login")} className=" link  ">
          <p>
            {!session && (
              <>
                <button onClick={() => signIn()}>Sign in</button>
              </>
            )}
            {session && (
              <>
                Hellow {session.user.name} <br />
                <button onClick={() => signOut()}>Sign out</button>
              </>
            )}{" "}
          </p>
          <p className="font-extrabold md:text-sm">Account & List</p>
        </div>
        <div onClick={() => router.push("/orders")} className="link ">
          <p>Return</p>
          <p className="font-extrabold md:text-sm">& Order</p>
        </div>
        <div
          onClick={() => router.push("/checkout")}
          className="  relative flex items-center link "
        >
          <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold ">
            {items.length}
          </span>
          <ShoppingCartIcon
            onClick={() => router.push("/checkout")}
            className="h-12 "
          />
          <p className="hidden md:inline font-extrabold md:text-sm mt-2">
            Basket
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
