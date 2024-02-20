// ALWAYS VISIBLE COMPONENT THRUOUT THE APP

import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import LoadingIndicator from './LoadingIndicator';

function AppLayout() {
  // PROVIDES STATE OF NAVIGATION REACT-ROUTER HOOK
  const navigation = useNavigation();
  // console.log(navigation);
  /* {state: 'idle', location: undefined, formMethod: undefined, formAction: undefined, formEncType: undefined, ...}
   */
  // Available states are : idle, loading , submitting
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <LoadingIndicator />}

      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          {/* Outlet renders the UI element for the current route */}
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
