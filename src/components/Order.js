import React from "react";
import moment from "moment";
import Currency from "react-currency-formatter";

function Order({ id, amount, images, timestamp, items }) {
  return (
    <div className="relative border rounded-md">
      <div className=" flex item-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div className="">
          <p className=" font-bold text-xs">ORDER PLACE</p>
          <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
        </div>
        <div>
          <p className="text-sm font-bold">TOTAL </p>
          <p>
            <Currency quantity={amount} currency="NOK" />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500 ">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 whitespace-nowrap text-sm truncate ">
          ORDER #{id}
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex  space-x-6 overflow-x-auto ">
          {images.map((image) => (
            <img
              src={image}
              alt="product picture  "
              className=" object-contain p-2 h-20 sm:h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
