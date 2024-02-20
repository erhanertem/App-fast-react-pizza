/* eslint-disable react/prop-types */
// WE WANT TO DELETE THE ITEM @ CART COMPONENT AS WELL AS DELETE THE ADDED ITEM @ THE MENU. SINCE THIS FUNCTIONALITY IS SHARED @ MULTIBLE PLACES, WE CREATE THIS NEW SHARED COMPONENT

import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
