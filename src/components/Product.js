import { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATINGS = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATINGS - MIN_RATING + 1) + MIN_RATING)
  );
  const dispatch = useDispatch();

  const addItemsBasket = () => {
    const products = { id, title, price, description, category, image };
    //sending the product as action to  redux store--basketslice
    dispatch(addToBasket(products));
    console.log(products);
  };
  return (
    <div className=" relative flex flex-col m-5 bg-white z-30 p-10 transform transition duration-500  hover:scale-110 cursor-pointer  ">
      <p className=" absolute top-2  right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} className="imgSize" alt="" />
      <h4 className="my-3 ">{title}</h4>
      <div className=" flex ">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="Nok" />
      </div>
      <button onClick={addItemsBasket} className="mt-auto button">
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
