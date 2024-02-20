// import { useNavigate, useRouteError } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

import LinkButton from './LinkButton';

function Error() {
  //   // REACT ROUTER PROGRAMMATIC NAVIGATION HOOK
  //   const navigate = useNavigate();
  // REACT ROUTER HOOK THAT PROVIDES THE ERROR MESSAGE HITTING THE ERRORELEMENT IN THE ROUTER
  const error = useRouteError();
  // console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
      {/* ALTERNATE SOLUTION  */}
      {/* <LinkButton onClick={() => navigate(-1)}>&larr; Go back</LinkButton> */}
      {/* <button onClick={() => navigate(-1)}>&larr; Go back</button> */}
    </div>
  );
}

export default Error;
