import Image from "next/image";
import React from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckOutProducts from "../components/CheckOutProducts";
import { useSession } from "next-auth/client";
import Currency from "react-currency-formatter";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const [session] = useSession();
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // call the backend to create a checkout session
    const checkoutSession = await axios.post("./api/create-checkout-session ", {
      items: items,
      email: session.user.email,
    });
    // redirect the user to the strip checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left col*/}
        <div className="flex-grow m-5 shadow-sm  ">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectfit="contain"
            alt=""
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className=" text-3xl border-b pb-4  ">
              {items.length === 0
                ? "Your amazon Basket is empty "
                : `Shopping Basket ${items.length} items`}
            </h1>

            <>
              {items.map((item, index) => (
                <CheckOutProducts
                  key={index}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                />
              ))}
            </>
          </div>
        </div>
        {/* right col*/}
        {items.length > 0 && (
          <div className=" flex flex-col  bg-white p-10 shadow-md">
            <h2>
              Subtotal({items.length})items{" "}
              <span className=" font-bold ">
                <Currency quantity={total} currency="Nok" />
              </span>
            </h2>

            <button
              role="link"
              onClick={createCheckoutSession}
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              {!session ? "Sign in to checkout" : "Proceed to Check0ut"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
