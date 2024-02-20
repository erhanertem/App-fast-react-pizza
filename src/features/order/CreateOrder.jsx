/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { createOrder } from '../../services/apiRestaurant';

import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const username = useSelector((state) => state.user.username);

  // PROVIDES STATE OF NAVIGATION REACT-ROUTER HOOK
  const navigation = useNavigation();
  // Available states are : idle, loading , submitting
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

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
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* TODO - FOR TEMP TESTING PURPOSES - FAKE CART  */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}
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
    priority: data.priority === 'on',
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
  // REDIRECT FUNCTION IS PROVIDED BY REACT-ROUTER TO NAVIGATE PROGRAMATICALLY WHEN USED OUTSIDE A REACT COMPONENT
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
