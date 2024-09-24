/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getUsername } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // DISPLAY RETURNED DATA FROM THE ACTION FUNCTION - TYPICAL FOR FORM FIELD ERRORS
  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);

  // READ username FROM RTK STORE
  // const cart = fakeCart;
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);
  // console.log(cart);

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

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full" // Custom tailwind class
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
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
    priority: data.priority === "on" ? true : false,
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

  const newOrder = await createOrder(order);
  // console.log(newOrder);

  // ALWAYS RR LOADER OR ACTION FUNCTIONS REQUIRE A RETURN EVENTHOUGH WE DONT NEED IT
  // return null;
  // WE CANT USE USENAVIGATE IN A FUNCTION TO PROGRAMMATICALLY NAVIGATE TO AN ENDPOINT, THEY ARE FOR REACT COMPONENTS. HOWEVER FOR CASUAL FUNCTIONS RR PROVIDES REDIRECT FUNCTION AS A PAR SUBSTITUTE

  // NOTE: MANUALLY TRIGGER AN ACTION FUNCTION FROM THE STORE WHEN NOT INSIDE JSX BODY - HACKY BUT NOT RECOMMENDED - SO USE IT WISELY
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
