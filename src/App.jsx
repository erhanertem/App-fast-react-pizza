import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

//VERY IMPORTANT! THIS NEW WAY OF ROUTING IS REQUIRED TO ENABLE DATA FETCHING W/REACT ROUTER
const router = createBrowserRouter([
  {
    element: <AppLayout />, //designate the parent element component
    errorElement: <Error />, //designate the error handler component for incorrect routes
    children: [
      //designate the child routes and the corresponding components
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader, //render-as-you-fetch approach from modern react-router
        errorElement: <Error />, //designate the error handler component - error @ each route bubbles up to parent unless specified as here...
      },
      {
        path: '/cart',
        element: <Cart />,
        //error bubbles up to parenting component
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
        //error bubbles up to parenting component
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />, //designate the error handler component - error @ each route bubbles up to parent unless specified as here...
      },
    ],
  },
]);
// // #2. Assigning error handling to individual routes and component containers via 2nd level childing using <Outlet /> component
// const router = createBrowserRouter([
// 	{
// 		element: <AppLayout />, //designate the parent element component
// 		errorElement: <Error />, //designate the error handler component for incorrect routes
// 		children: [
// 			//designate the child routes and the corresponding components
// 			//CUTTING OFF THE ERROR HANDLING SPREADING TO ALL COMPONENTS VIA SECOND LEVEL CHIL USING OUTLET
// 			{
// 				element: <Outlet />,
// 				errorElement: <Error />,
// 				children: [
// 					{ path: '/', element: <Home /> },
// 					{
// 						path: '/menu',
// 						element: <Menu />,
// 						loader: menuLoader, //render-as-you-fetch approach from modern react-router
// 						errorElement: <Error />, //designate the error handler component - error @ each route bubbles up to parent unless specified as here...
// 					},
// 					{
// 						path: '/cart',
// 						element: <Cart />,
// 						//error bubbles up to parenting component
// 					},
// 					{
// 						path: '/order/new',
// 						element: <CreateOrder />,
// 						//error bubbles up to parenting component
// 					},
// 					{
// 						path: '/order/:orderId',
// 						element: <Order />,
// 						//error bubbles up to parenting component
// 					},
// 				],
// 			},
// 		],
// 	},
// ])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
