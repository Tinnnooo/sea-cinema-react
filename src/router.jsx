import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Topup from "./views/Topup";
import Ticket from "./views/Ticket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/balance/topup",
    element: <Topup />,
  },
  {
    path: "/movie/:title",
    element: <Ticket />,
  },
]);

export default router;
