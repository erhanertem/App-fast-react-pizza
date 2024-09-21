import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="bg-stone-800 uppercase text-stone-200">
      <p className="font-semibold text-stone-300">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      {/* <a href="#">Open cart &rarr;</a> */}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
