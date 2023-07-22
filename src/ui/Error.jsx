import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      {/* error from the incorrect errorElement @ Applayout || error from fetching induced problem such as wrong api adress or nonresponsive server */}

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
