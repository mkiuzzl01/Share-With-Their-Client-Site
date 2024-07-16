import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Layout from "../Layout/Layout";
import Login from "../components/Pages/Login/Login";
import Register from "../components/Pages/Register/Register";

const route = createBrowserRouter([
    {
        path:'/',
        element:<Layout></Layout>,
        children:[
        {
            path:'/',
            element:<Home></Home>
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