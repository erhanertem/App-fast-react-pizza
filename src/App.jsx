import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './ui/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';

// #1. CREATE LIST OF FRONT-END ENDPOINTS AND SPA PAGE JSX COMPONENTS
// NOTE: This is imperative way of declaring routes comapred to traditional route declaration inside JSX via router components. Here all routes are declared outside the JSX body and listed inside an array object. This is an imperative setup to enable data loading , or data fetching with react-router library.
// NOTE: Unlike component based React-router setup, this imperative router setup does not require fallback route setup for unmatching routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/menu',
    element: <Menu />,
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
    path: '/order/:id',
    element: <Order />,
  },
]);

function App() {
  // #2. PROVIDE THE ROUTES
  return <RouterProvider router={router} />;
}

export default App;
