import { createBrowserRouter } from "react-router";
import App from "../app/layout/App";
import HomePage from "../features/home/HomePage";
import ActivityDashboard from "../features/activities/Dashboard/ActivityDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetail from "../features/activities/Details/ActivityDetail";

export const router = createBrowserRouter([
{
    path:'/',
    element:<App/>,
    children:[
        {path :'', element:<HomePage/>},
        {path :'activities', element:<ActivityDashboard/>},
        {path:'activities/:id', element:<ActivityDetail/>},
        {path :'createActivity', element:<ActivityForm key='create'/>},
        {path :'manage/:id', element:<ActivityForm/>}
    ]

}])