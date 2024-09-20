/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT
import { useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers';

function Order() {
  const order = useLoaderData();
  // console.log(order);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0 ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃` : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
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
