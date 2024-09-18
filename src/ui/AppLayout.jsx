import Header from './Header';
import CartOverview from './../features/cart/CartOverview';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <Header />

      <main>
        {/* Inserts component content of the corresponding endpoint element in the child routes definition @ router */}
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
