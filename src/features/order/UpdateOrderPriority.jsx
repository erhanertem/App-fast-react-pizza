import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrderPriority({ order }) {
  // USEFETCHER TO CREATE NON-NAVIGATING FETCHER FORM.
  const fetcher = useFetcher();

  return (
    // PATCH REQUEST
    // NOTE: THE KEY DIFFERENCE BETWEEN THIS RR FETCHER.FORM AND THE RR FORM IS THAT RR FORM NAVIGATES AWAY AFTER SUBMISSION. RR REFETCHER.FORM REVALIDATES THE PAGE UPON SUBMISSION SINCE THIS ACTION MUTATES THE FORM DATA. THIS REQUIRES AN ACTION FUNCTION WHICH NEEDS TO BE WIRED UP @ THE ROUTE WHICH CONNECTS TO THE COMPONENT THAT HOSTS OUR ORIGINAL FORM WE WANT TO CONNECT TO.
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrderPriority;

// ESTABLISH ACTION FUNCTION HERE WHICH TO BE CALLED FROM ROUTE - path: '/order/:orderID',
export async function action({ request, params }) {
  // console.log(request, params);
  // console.log("UPDATE");
  const data = { priority: true };
  await updateOrder(params.orderID, data);
  return null;
}
