import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
	// REACT ROUTER PROGRAMMATIC NAVIGATION HOOK
	const navigate = useNavigate();
	// REACT ROUTER HOOK THAT PROVIDES THE ERROR MESSAGE HITTING THE ERRORELEMENT IN THE ROUTER
	const error = useRouteError();
	// console.log(error);

	return (
		<div>
			<h1>Something went wrong 😢</h1>
			<p>{error.data || error.message}</p>
			<button onClick={() => navigate(-1)}>&larr; Go back</button>
		</div>
	);
}

export default Error;
