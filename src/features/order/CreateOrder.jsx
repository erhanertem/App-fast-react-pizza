/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import store from "../../store";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { fetchAddress, getUser } from "../user/userSlice";

import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";

import { formatCurrency } from "./../../utils/helpers";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [addressFill, setAddressFill] = useState("");
  const [withPriority, setWithPriority] = useState(false);
  // READ username FROM RTK STORE
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector(getUser);
  const isLoadingAddress = addressStatus === "loading"; // Returns true when loading

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const dispatch = useDispatch();
  // DISPLAY RETURNED DATA FROM THE ACTION FUNCTION - TYPICAL FOR FORM FIELD ERRORS
  const formErrors = useActionData();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  // DERIVED STATES
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  // GUARD CLAUSE
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* Instead of usign regular form element, we have to use RR's Form component to make POST requests work with RR actions */}
      <Form
        method="POST"
        // You may implicitly specify this action route or RR would handle the closest route automatically
        // action="/order/new"
      >
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input w-full" // Custom tailwind class
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start">
          <label className="sm:basis-40 sm:pt-2">Phone number</label>
          <div className="grow">
            <input
              className="input w-full" // Custom tailwind class
              type="tel"
              name="phone"
              required
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full" // Custom tailwind class
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
              onChange={(e) => {
                e.preventDefault();
                setAddressFill(e.target.value);
              }}
            />
            {addressStatus === "error" && addressFill === "" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute z-50 max-md:right-[1px] max-md:top-[2.5px] max-sm:right-[3px] max-sm:top-[34.5px] md:right-[4.5px] md:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  // Clicking this as its inside the form element will trigger form submission so we neeed to prevent this
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* Pass in thru priority stamped cart data */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* Pass in thru customer GPS position if there is any (if get position button is clicked) */}
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />

          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// ESTABLISH ACTION FUNCTION HERE WHICH TO BE CALLED FROM ROUTE
// {request} OBJECT IS PROVIDED FOR RR ACTIONS JUST LIKE {params} FOR RR LOADERS
export async function action({ request }) {
  // console.log(request);
  /*
  A FORM LIKE THIS:
  <form method="POST">
    <input
      name="username"
      value="john_doe"
    />
    <input
      name="age"
      value="30"
    />
  </form>;
  WOULD YIELD AN ITERABLE FORMDATA LIKE THIS
  formData = [
    ['username', 'john_doe'],
    ['age', '30'],
  ];
  OBJECT FROM THIS KEY/VALUE PAIRS ARRAY ARE TURNED INTO AN OBJECT LIKE THIS
  const data = {
  username: 'john_doe',
  age: '30',
};
  */
  const formData = await request.formData();
  // console.log([...formData]);
  const data = Object.fromEntries(formData); // Convert Iterable object to a key/value pair object
  // console.log(data);

  // POST PROCESS RETRIEVED ORDER DATA - MAKE USABLE BY OUR APP
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true", // Priority symbol registered based on falsy or truthy output
  };
  // console.log(order);

  // GUARD CLAUSE - check for required fields consistency
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // // FOR TESTING PURPOSES
  // // ALWAYS RR LOADER OR ACTION FUNCTIONS REQUIRE A RETURN EVENTHOUGH WE DONT NEED IT
  // return null;

  // If everything is okay, create a new order and redirect
  const newOrder = await createOrder(order);
  console.log(newOrder);
  // NOTE: MANUALLY TRIGGER AN ACTION FUNCTION FROM THE STORE WHEN NOT INSIDE JSX BODY - HACKY BUT NOT RECOMMENDED - SO USE IT WISELY
  store.dispatch(clearCart());
  // WE CANT USE USENAVIGATE IN A FUNCTION TO PROGRAMMATICALLY NAVIGATE TO AN ENDPOINT, THEY ARE FOR REACT COMPONENTS. HOWEVER FOR CASUAL FUNCTIONS RR PROVIDES REDIRECT FUNCTION AS A PAR SUBSTITUTE
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
