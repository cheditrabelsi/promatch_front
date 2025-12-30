import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SuspenseLoader from "@/components/loaders/SuspenseLoader";
import Footer from "./pages/Footer/Footer";

const AppWrapper = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Outlet />
       <Footer></Footer>
    </Suspense>
  );
};

export default AppWrapper;
