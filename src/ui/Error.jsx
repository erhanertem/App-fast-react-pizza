import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  // NOTE: SINCE THIS COMPONENT IS THE SPECIFIED ONE IN THE ERRORELEMENT FIELD, IT WOULD HAVE ACCESS TO USEROUTEERROR RR HOOK
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
      {/* <button onClick={() => navigate(-1)}></button> */}
    </div>
  );
}

export default Error;
