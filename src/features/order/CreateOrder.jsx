/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
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
  const navigation = useNavigation();
  // console.log(navigation)
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData(); //THIS HOOK READS THE DATA RETURNED TO ACTION

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* <form> */}
      {/* IN ORDER TO MAKE FORM PLAY NICELY WITH REACT-ROUTER IN ACTIONS SUCH AS 'POST', 'PATCH', 'DELETE', WE HAVE TO USE THE FORM COMPONENT PROVIDED BY REACT-ROUTER-DOM */}
      {/* <Form method="POST" action="/order/new"> */}
      {/* NO NEED TO SPECIFY THE ROUTE AS IT SNAPS TO CURRENT ACTION ROUTE AUTOMATICALLY */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input className="input" type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </Button>
        </div>
      </Form>
      {/* </form> */}
    </div>
  );
}

//NOTE: Action function is provided with {action} object thru Form react-router-dom component
export async function action({ request }) {
  const formData = await request.formData(); //formData() is a regular WEB API @ https://developer.mozilla.org/en-US/docs/Web/API/FormData
  // console.log(formData)
  const data = Object.fromEntries(formData); //Convert form data to a readable object
  // console.log('⛔', data)

  //RESTRUCTURE THE FORMDATA COMPOSITION
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };
  // console.log(order)

  //ERROR HANDLING FOR INPUTS
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';
  if (Object.keys(errors).length) return errors; //IF VALID ERROR IS RETURNED TO ACTION AND DOES NOT PROCEED WOITH CREATE ORDER

  //EXECUTE FETCHING FUNCTION IF EVERY THING PASSES W/NO ERROR
  const newOrder = await createOrder(order); //Returns data so we have to await

  //REFLECT THE ORDERID ON THE URL
  return redirect(`/order/${newOrder.id}`); //Provided by react-router function as we cant use useNavigate() inside regular functions...
}

export default CreateOrder;
