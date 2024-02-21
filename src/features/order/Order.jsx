/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT

import { useEffect } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

import OrderItem from './OrderItem';

function Order() {
  // > useLoaderData hook gets a hold of the loader object data @ route (App.jsx) which is provided by calling the async loader() fetch function provided out side the component.
  const order = useLoaderData();

  // TRIGGER FETCHING ROUTE LOADERS OR ACTIONS W/OUT CHANGING ROUTE
  const fetcher = useFetcher();
  // console.log(fetcher);
  // WHEN THIS PAGE IS LAUNCHED AND NOT FECTHING ACTIVELY....
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher],
  );
  // console.log(fetcher.data);

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
            : 'Order should have arrived'}
        </p>
        <p className="text-xs font-medium text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
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

// > ASYNC FETCH OPERATION FUNCTION TO RETRIEVE A SPECIFIC DATA
// IMPORTANT!! We can't use useParams to read the id in order to complete the API call. Because react-router hooks only lives within the component. In such situations, react-router provides the params object which snatches params from the URL.
export async function loader({ params }) {
  // console.log(params);
  // params is an object --> {orderId: '11'}
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
