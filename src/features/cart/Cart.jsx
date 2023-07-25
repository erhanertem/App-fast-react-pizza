/* eslint-disable no-unused-vars */
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { getCart } from './cartSlice';
import { getUsername } from '../user/userSlice';

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUsername);
  // MOVED TO CART SLICER AS REDUX RECOMMENDS....
  // const username = useSelector((state) => state.user.username);

  return (
    <div className="px-4 py-3">
      <div className="text-sm text-blue-500 hover:text-blue-600">
        <span>&larr;</span>
        <LinkButton to="/menu">Back to menu</LinkButton>
      </div>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item.pizzaId} />;
        })}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
