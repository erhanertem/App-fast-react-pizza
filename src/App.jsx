import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './ui/Home'
import Menu, { loader as menuLoader } from './features/menu/Menu'
import Cart from './features/cart/Cart'
import CreateOrder from './features/order/CreateOrder'
import Order from './features/order/Order'
import AppLayout from './ui/AppLayout'
import Error from './ui/Error'

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
				//error bubbles up to parenting component
			},
			{
				path: '/order/:orderId',
				element: <Order />,
				//error bubbles up to parenting component
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
