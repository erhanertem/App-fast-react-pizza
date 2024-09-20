/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();
  // console.log(menu);

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem
          pizza={pizza}
          key={pizza.id}
        />
      ))}
    </ul>
  );
}

// ESTABLISH LOADER FUNCTION HERE WHICH TO BE CALLED FROM ROUTE LOADER
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
