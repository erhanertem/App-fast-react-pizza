/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  //RENDER-AS-YOU-FETCH STRATEGY
  const menu = useLoaderData(); //refers to loader key value @ browserRouter /menu path
  // console.log(menu)
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

/*
NOTES
#1 Every page should bear its own loader function inside its component.
#2 Its a convention to cal it loader()
*/
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
