import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "../components/Pages/Login/Login";
import Register from "../components/Pages/Register/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import Overview from "../components/Overview/Overview";
import Transactions from "../components/Pages/Transactions/Transactions";
import SendMoney from "../components/SendMoney/SendMoney";
import CashOut from "../components/CashOut/CashOut";
import CashIn from "../components/CashIn/CashIn";
import Transaction_Management from "../components/Pages/Transaction_Management/Transaction_Management";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Overview></Overview>
          </PrivateRoute>
        ),
      },
      {
        path: "/Transactions",
        element: (
          <PrivateRoute>
            <Transactions></Transactions>
          </PrivateRoute>
        ),
      },
      {
        path: "/SendMoney",
        element: (
          <PrivateRoute>
            <SendMoney></SendMoney>
          </PrivateRoute>
        ),
      },
      {
        path: "/CashOut",
        element: (
          <PrivateRoute>
            <CashOut></CashOut>
          </PrivateRoute>
        ),
      },
      {
        path: "/CashIn",
        element: (
          <PrivateRoute>
            <CashIn></CashIn>
          </PrivateRoute>
        ),
      },
      {
        path: "/Transaction_Management",
        element: (
          <PrivateRoute>
            <Transaction_Management></Transaction_Management>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/Login",
    element: <Login></Login>,
  },
  {
    path: "/Register",
    element: <Register></Register>,
  },
]);
export default route;
