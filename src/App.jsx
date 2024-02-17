import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, { action as createOrderAction } from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

// > CREATE ROUTER OBJECT W/ ALL POSSIBLE PATHS
const router = createBrowserRouter([
	{
		// > APPLAYOUT APPEARS BYDEFAULT @ EVERY PAGE
		element: <AppLayout />,
		// > ERROR HANDLING @ TOP LEVEL - ERROR @ NESTED ROUTES BUBBLES TO THIS ERROR HANDLER IF NO ERRO HANDLING PROVIDED @ ROUTE LEVEL - RENDERS UI ON ITS OWN
		errorElement: <Error />,
		// > CREATE NESTED ROUTES BELONGING TO APPLAYOUT COMPONENT
		children: [
			{
				path: '/',
				element: <Home />,
				// ERROR HANDLING IS HANDLED @ GLOBAL ERROR HANDLER
			},
			{
				// > ROUTE OF THE OBJECT
				path: '/menu',
				// > COMPONENT TO DIAL WHEN THIS ROUTE HIT
				element: <Menu />,
				// > ASYNC OPERATION DUE - GATHER DATA TO DISPLAY THE UI AS THE COMPONENT (<Menu/>) BEING RENDERED
				//NOTE: IN REDUX, WE LOAD THE COMPONENT AND THEN FETCH, BUT REACT-ROUTER DOES BOTH SIMULTANEOUSLY
				// menuLoader is an exported async function inside the component (<Menu/>)
				//IMPORTANT!! ITS A CONVENTION TO INCLUDE ASYNC API FUNCTION ALONG WITH THE COMPONENT (<Menu />)
				// > READ ALL DATA FETCH API CALL
				loader: menuLoader,
				// > ROUTE LEVEL ERROR HANDLING - APPEARS WITHIN THE UI OF THE COMPONENT
				errorElement: <Error />,
			},
			{ path: '/cart', element: <Cart /> },
			{
				path: '/order/new',
				element: <CreateOrder />,
				action: createOrderAction,
			},
			{
				path: '/order/:orderId',
				element: <Order />,
				// > READ A SPECIFIC DATA FETCH API CALL
				loader: orderLoader,
				errorElement: <Error />,
			},
		],
	},
]);

// > PROVIDE ROUTE OBJECT TO THE APP
function App() {
	return <RouterProvider router={router} />;
}

export default App;
