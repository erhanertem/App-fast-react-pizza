import { useNavigate, useRouteError } from 'react-router-dom'

function Error() {
	const navigate = useNavigate()
	const error = useRouteError()
	console.log(error)
	return (
		<div>
			<h1>Something went wrong 😢</h1>
			<p>{error.data || error.message}</p>
			{/* error from the incorrect errorElement @ Applayout || error from fetching induced problem such as wrong api adress or nonresponsive server */}
			<button onClick={() => navigate(-1)}>&larr; Go back</button>
		</div>
	)
}

export default Error
