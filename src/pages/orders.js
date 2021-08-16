import React from "react";
import Header from "../components/Header";
import Order from "../components/Order";
import db from "../firebase";
import moment from "moment";
import { useSession, getSession } from "next-auth/client";

function orders({ orderList }) {
  const [session] = useSession();
  console.log(orderList);
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl boder-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orderList.length} </h2>
        ) : (
          <h2> Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orderList?.map(({ id, amount, images, timestamp, items }) => (
            <Order
              key={id}
              id={id}
              amount={amount}
              images={images}
              timestamp={timestamp}
              items={items}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default orders;
export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // get the users logged in credentails
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }
  // firebase db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("order")
    .orderBy("timestamp", "desc")
    .get();

  // stripe orders

  const orderList = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orderList,
    },
  };
}
