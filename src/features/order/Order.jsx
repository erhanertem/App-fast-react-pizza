/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT
import { useEffect } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

function Order() {
  const order = useLoaderData();

  // FETCH DATA WITHOUT NAVIGATING TO THE ACTUAL PAGE via USEFETCHER RR HOOK
  const fetcher = useFetcher();
  //  WE WANT TO MAKE USE OF LOADER FUNCTION @ /MENU ENDPOINT W/OUT NAVIGATING TO IT VIA RR USEFETCHER HOOK
  useEffect(
    function () {
      // GUARD CLAUSE
      // MAKE SURE THERE IS NO DATA FETCHED YET FROM THE LOADER FN + LOADER FN IS NOT @ LOADING STATE
      if (!fetcher.data && fetcher.state === "idle") {
        // This function loads the data from this endpoint and stores it inside fetcher.data
        fetcher.load("/menu");
      }
    },
    [fetcher],
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

// ESTABLISH LOADER FUNCTION HERE WHICH TO BE CALLED FROM ROUTE LOADER
export async function loader({ params }) {
  // NOTE: USEPARAMS COULD NO TBE UTILIZED HERE AS ITS ONLY FOR USE INSIDE COMPONENTS. IN ORDER TO GET A HOLD OF THE URL PARAMS ID, RR PROVIDES {PARAMS} PROP THAT GOES INSIDE LOADER FUNCTION
  // NOTE: params.orderID matches the param namespace @ path definition - path: '/order/:orderID', @ app.jsx
  const order = await getOrder(params.orderID);
  return order;
}

export default Order;
