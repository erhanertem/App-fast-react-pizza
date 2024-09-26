import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "./cartSlice";

function UpdateItemQuantity({ pizzaId }) {
  // #1. Create a dispatch for updating RTK store
  const dispatch = useDispatch();

  // READ RTK STATE
  const currentItemQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        &nbsp;-&nbsp;
      </Button>
      <span className="text-sm font-medium">{currentItemQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        &nbsp;+&nbsp;
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
