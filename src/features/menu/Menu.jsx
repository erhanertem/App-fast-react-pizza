/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

import MenuItem from './MenuItem';

function Menu() {
  // REACT-ROUTER HOOK THAT GATHERS THE LOADER DATA FROM THE CORRESPONDING ROUTE @ ROUTER OBJECT
  const menu = useLoaderData();
  // console.log(menu);

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// ASYNC API FETCHING
// #1. Create a loader function
// #2. Provide the loader @ router
// #3.Provide the data to the page
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
