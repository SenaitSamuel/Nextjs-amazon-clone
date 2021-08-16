import React from "react";
import { MenuIcon } from "@heroicons/react/outline";

function NavBottom() {
  return (
    <div className="flex items-center text-sm space-x-3 p-2 pl-6 text-white  whitespace-nowrap  bg-amazon_blue-light">
      <p className="flex item-center link">
        <MenuIcon className="h-6 mr-1 " />
        All
      </p>
      <p className="flex item-center link">Prime Video</p>
      <p className=" flex link">Amazon Business</p>
      <p className=" hidden lg:inline-flex link"> Today's Deals</p>
      <p className="hidden lg:inline-flex link"> Electronics</p>
      <p className="hidden lg:inline-flex link"> Food & Grocery</p>
      <p className="hidden lg:inline-flex link"> Prime</p>
      <p className="hidden lg:inline-flex link"> Buy Again</p>
      <p className="hidden lg:inline-flex link"> Shopper Toolkit</p>
    </div>
  );
}

export default NavBottom;
