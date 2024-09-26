import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import { getUser } from "../user/userSlice";

function Cart() {
  // READ username FROM RTK STORE
  const { username } = useSelector(getUser);
  const cart = useSelector(getCart);

  // Instantiate a action fn dispatcher to update RTK state
  const dispatch = useDispatch();

  // GUARD CLAUSE - Display empty cart component if there is none left in the cart
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => {
          // console.log(item);
          return <CartItem item={item} key={item.pizzaId} />;
        })}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        {/* <Link to="/order/new">Order pizzas</Link> */}

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
        {/* <button>Clear cart</button> */}
      </div>
    </div>
  );
}

export default Cart;
