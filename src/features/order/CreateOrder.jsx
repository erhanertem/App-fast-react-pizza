/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { getUsername } from '../user/userSlice';
import store from '../../store'
import { formatCurrency } from '../../utils/helpers'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

  function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false);
    const navigation = useNavigation();
  // console.log(navigation)
  const isSubmitting = navigation.state === 'submitting';
  
  const formErrors = useActionData(); //THIS HOOK READS THE DATA RETURNED TO ACTION
  
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice*0.2 : 0
  const totalPrice = totalCartPrice+priorityPrice

  if (!cart.length) return <EmptyCart />;
  console.log(cart);
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <form> */}
      {/* IN ORDER TO MAKE FORM PLAY NICELY WITH REACT-ROUTER IN ACTIONS SUCH AS 'POST', 'PATCH', 'DELETE', WE HAVE TO USE THE FORM COMPONENT PROVIDED BY REACT-ROUTER-DOM */}
      {/* <Form method="POST" action="/order/new"> */}
      {/* NO NEED TO SPECIFY THE ROUTE AS IT SNAPS TO CURRENT ACTION ROUTE AUTOMATICALLY */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input capitalize"
              type="text"
              name="customer"
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
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(event) => setWithPriority(event.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? 'Placing order...' : `Order now from ${formatCurrency(totalPrice)}`}
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
    priority: data.priority === 'true',
  };
  console.log('😒',order)

  //ERROR HANDLING FOR INPUTS
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';
  if (Object.keys(errors).length) return errors; //IF VALID ERROR IS RETURNED TO ACTION AND DOES NOT PROCEED WOITH CREATE ORDER

  //EXECUTE FETCHING FUNCTION IF EVERY THING PASSES W/NO ERROR
  const newOrder = await createOrder(order); //Returns data so we have to await

  //VERY IMPORTANT!!! AFTER CHECKOUT AND SUMMARY PAGE IS DISPLAYED, WE NEED TO GET RID OF (RESET) THE ORDER SUMMARY FOOTER. FOR THAT WE WOULD NEED ACCESS TO STORE STATE OUT OF THE COMPONENT. WHILE THIS IS NOT POSSIBLE OUT OF A COMPONENT, WE FORCEFULLY IMPORT STORE TO THIS COMPONENT AND USE DISPATCH BRUTEFORCE IN A REGULAR FUNCTION BODY. DO NOT USE TECHNIQUE WHENEVER POSSIBLE AS REDUX DISABLES SOME PERFORMANCE OPTIMIZATIONS TO ACHIEVE THIS.
  store.dispatch(clearCart())

  //REFLECT THE ORDERID ON THE URL
  return redirect(`/order/${newOrder.id}`); //Provided by react-router function as we cant use useNavigate() inside regular functions...
}

export default CreateOrder;
