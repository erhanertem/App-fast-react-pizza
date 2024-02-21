/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  // WE NEED TO PROVIDE THE DATA TO UPDATEORDER FUNCTION
  const data = { priority: true };
  // UPDATEORDER FUNCTION ALSO REQUIRES ORDER ID WHICH WE ACQUIRE THRU PARAMS OBJECT
  // console.log(params);
  await updateOrder(params.orderId, data);
  // console.log('update');
  // AWAYS NEED TO RETURN FROM ACTION FUNCTION
  return null;
}
