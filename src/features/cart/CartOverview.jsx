import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  // READ username FROM RTK STORE
  // const totalCartQuantity = useSelector((state) =>
  //   state.cart.cart.reduce((acc, currItem) => acc + currItem.quantity, 0),
  // );
  // NOTE: INSTEAD OF WRITING COMPLEX CB FOR USESLECTOR HERE , WE KEEP THEM @ CORRESPONDING SLICER FILE
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  // GUARD CLAUSE - disables cart overview if no pizzas selected
  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>€{totalCartPrice}</span>
      </p>
      {/* <a href="#">Open cart &rarr;</a> */}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
