import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  // MOVED TO CART SLICER AS REDUX RECOMMENDS....
  // function CartOverview() {
  //   const totalCartQuantity = useSelector((state) =>
  //     state.cart.cart.reduce((sum, item) => sum + item.quantity, 0),
  //   ); //read state>state named as cart> cart state property
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">check cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
