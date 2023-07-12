import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Topup from "./views/Topup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/balance/topup",
    element: <Topup />,
  },
]);

export default router;
