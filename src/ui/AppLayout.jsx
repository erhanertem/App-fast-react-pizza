import Header from "./Header";
import CartOverview from "./../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  // THIS RR NAVIGATION STATE IS UNIVERSAL AND IS HELPFULL FOR LOADING STATE ANIMATIONS
  const navigation = useNavigation();
  // console.log(navigation);
  // NAVIGATIUON STATE IS EITHER IDLE|LOADING
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          {/* Inserts component content of the corresponding endpoint element in the child routes definition @ router */}
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
