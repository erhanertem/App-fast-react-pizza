/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { fetchAddress, getUser } from '../user/userSlice';

import { createOrder } from '../../services/apiRestaurant';
import { formatCurrency } from '../../utils/helpers';

import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { useState } from 'react';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  // const username = useSelector((state) => state.user.username);
  const username = useSelector(getUser);

  // PROVIDES STATE OF NAVIGATION REACT-ROUTER HOOK
  const navigation = useNavigation();

  const dispatch = useDispatch();

  // Available states are : idle, loading , submitting
  const isSubmitting = navigation.state === 'submitting';

  // ACTION FUNCTION FOR REACT-ROUTER ONLY RETURNS ERROR OBJECT
  const formErrors = useActionData();

  const cart = useSelector(getCart);
  // console.log(cart);

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  // GUARD CLAUSE
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <button onClick={() => dispatch(fetchAddress())}>Get position</button>

      {/* FORM IS A SPECIAL SUBSTITUTE COMPONENT PROVIDED BY REACT ROUTER */}
      {/* <Form method="POST" action="/order/new"> */}
      {/* either as strictly specify the action route or have react-router handle this w/ the possible nearest route */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="customer"
              // IMPORTANT!! VALUE PROPERTY PERSISTS AND WE CANT CHANGE IT. DEFAULTVALUE DOES NOT PERSIST AND OPEN TO MODIFICATION
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className=" h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  // console.log(request);
  // Request {method: 'POST', url: 'http://localhost:5173/order/new', headers: Headers, destination: '', referrer: 'about:client', …}
  const formData = await request.formData(); //FORMDATA() IS A WEB API FUNCTION FOR FORMS  RETURNING FORMDATA OBJECT. EMBEDDED IN PROTYPE OF REQUEST OBJECT.
  const data = Object.fromEntries(formData); //FROMENTRIES STATIC JS OBJECT METHOD REMAPS ITERABLE OBJECTS TO KEY/VALUE PAIRS OBJECT
  // console.log(formData);
  // console.log(data);

  //COMPOSE ORDER OBJECT
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  // console.log(order);

  // IF DATA IS NOT FINE....
  // DATA QUALITY ASSURANCE - ERROR
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';
  if (Object.keys(errors).length > 0) return errors;

  //IF DATA IS FINE....
  // POST FETCH NEW ORDER TO API IF DATA IS FINE
  const newOrder = await createOrder(order);
  // VERY IMPORTANT!!! CLEAR STORE CART - since store useDispatch hook could not be used outside a component, we forcefully import store and call dispatch function directly on it to call clearCart action creator function
  store.dispatch(clearCart());
  // REDIRECT FUNCTION IS PROVIDED BY REACT-ROUTER TO NAVIGATE PROGRAMATICALLY WHEN USED OUTSIDE A REACT COMPONENT
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
