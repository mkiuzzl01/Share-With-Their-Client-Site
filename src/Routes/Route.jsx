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
import User_Management from "../components/Pages/User_Management/User_Management";
import System_Monitoring from "../components/Pages/System_Monitoring/System_Monitoring";
import IsAdmin from "./IsAdmin";
import IsAgent from "./IsAgent";
import IsUser from "./IsUser";

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
          <IsUser>
            <PrivateRoute>
              <SendMoney></SendMoney>
            </PrivateRoute>
          </IsUser>
        ),
      },
      {
        path: "/CashOut",
        element: (
          <IsUser>
            <PrivateRoute>
              <CashOut></CashOut>
            </PrivateRoute>
          </IsUser>
        ),
      },
      {
        path: "/CashIn",
        element: (
          <IsUser>
            <PrivateRoute>
              <CashIn></CashIn>
            </PrivateRoute>
          </IsUser>
        ),
      },
      {
        path: "/Transaction_Management",
        element: (
          <IsAgent>
            <PrivateRoute>
              <Transaction_Management></Transaction_Management>
            </PrivateRoute>
          </IsAgent>
        ),
      },
      {
        path: "/User_Management",
        element: (
          <IsAdmin>
            <PrivateRoute>
              <User_Management></User_Management>
            </PrivateRoute>
          </IsAdmin>
        ),
      },
      {
        path: "/System_Monitoring",
        element: (
          <IsAdmin>
            <PrivateRoute>
              <System_Monitoring></System_Monitoring>
            </PrivateRoute>
          </IsAdmin>
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
