import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "../components/Pages/Login/Login";
import Register from "../components/Pages/Register/Register";
import PrivateRoute from '../Routes/PrivateRoute'
import Overview from "../components/Overview/Overview";
import Transactions from "../components/Pages/Transactions/Transactions";

const route = createBrowserRouter([
    {
        path:'/',
        element:<Layout></Layout>,
        children:[
        {
            path:'/',
            element:<PrivateRoute><Overview></Overview></PrivateRoute>
        },
        {
            path:'/Transactions',
            element:<PrivateRoute><Transactions></Transactions></PrivateRoute>
        },
        {
            path:'/Transactions',
            element:<PrivateRoute><Transactions></Transactions></PrivateRoute>
        },
        {
            path:'/Login',
            element:<Login></Login>
        },
        {
            path:'/Register',
            element:<Register></Register>
        }
    ]
    }
])
export default route;