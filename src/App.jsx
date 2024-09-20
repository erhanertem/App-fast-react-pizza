import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order, { loader as orderLoader } from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

// #1. CREATE LIST OF FRONT-END ENDPOINTS AND SPA PAGE JSX COMPONENTS
// NOTE: This is imperative way of declaring routes comapred to traditional route declaration inside JSX via router components. Here all routes are declared outside the JSX body and listed inside an array object. This is an imperative setup to enable data loading , or data fetching with react-router library.
// NOTE: Unlike component based React-router setup, this imperative router setup does not require fallback route setup for unmatching routes
const router = createBrowserRouter([
  {
    // NOTE: AppLayout without path endpoint definition is a wrapper page - therefore, requires <Outlet/> react-router component to firnish corresponding component in a child route.
    element: <AppLayout />,
    // WE SPECIFY THE ERRORELEMENT @ THE TOP OF ALL FIELDS AS ERROR WOULD BUBBLES UP FROM THE CHILD ROUTES
    errorElement: <Error />,
    // Define nested routes here
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        // NOTE: Since fetching occurs in this child route, we may encounter error. Instead of destroying the entire layout, we may keep current UI and specify the error message here by specifying the errorElement field in place
        errorElement: <Error />,
        // NOTE: Provide a loader middleware function to fetch menu data - The fetch function is kept @ Menu component for tidying purposes, however the menuLoader(loader function isnide Menu component) is fired here - The data provided by the menuLoader now could be consumed within Menu component via useLoaderData RR hook
        loader: menuLoader,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
      },
      {
        path: '/order/:orderID',
        element: <Order />,
        // NOTE: Provide a loader middleware function to fetch order data with a orderID param - The fetch function is kept @ Order component for tidying purposes, however the orderLoader(loader function isnide Order component) is fired here - The data provided by the orderLoader now could be consumed within Order component via useLoaderData RR hook
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  // #2. PROVIDE THE ROUTES
  return <RouterProvider router={router} />;
}

export default App;
