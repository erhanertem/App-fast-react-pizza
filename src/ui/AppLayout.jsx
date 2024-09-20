import Header from './Header';
import CartOverview from './../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

function AppLayout() {
  // THIS RR NAVIGATION STATE IS UNIVERSAL AND IS HELPFULL FOR LOADING STATE ANIMATIONS
  const navigation = useNavigation();
  // console.log(navigation);
  // NAVIGATIUON STATE IS EITHER IDLE|LOADING
  const isLoading = navigation.state === 'loading';

  return (
    <div className="layout">
      {isLoading && <Loader />}

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
