import Image from "next/image";
import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckOutProducts({
  id,
  title,
  price,
  description,
  rating,
  category,
  image,
}) {
  const dispatch = useDispatch();
  const products = { id, title, price, description, category, image };

  const addItemsBasket = () => {
    //push item into redux
    dispatch(addToBasket(products));
  };
  const removeItemsBasket = () => {
    //remove item into redux
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} width={200} height={200} className="imgSize" alt="" />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className=" flex ">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>

        <Currency quantity={price} currency="Nok" />
      </div>
      {/* Right add/remove buttons */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end ">
        <button onClick={addItemsBasket} className="button">
          Add to Basket
        </button>
        <button onClick={removeItemsBasket} className="button">
          Remove to Basket
        </button>
      </div>
    </div>
  );
}

export default CheckOutProducts;
