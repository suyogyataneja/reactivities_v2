import { createBrowserRouter } from "react-router";
import App from "../app/layout/App";
import HomePage from "../features/home/HomePage";
import ActivityDashboard from "../features/activities/Dashboard/ActivityDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetailPage from "../features/activities/Details/ActivityDetailPage";
import Counter from "../features/counter/Counter";

export const router = createBrowserRouter([
{
    path:'/',
    element:<App/>,
    children:[
        {path :'', element:<HomePage/>},
        {path :'activities', element:<ActivityDashboard/>},
        {path:'activities/:id', element:<ActivityDetailPage/>},
        {path :'createActivity', element:<ActivityForm key='create'/>},
        {path :'manage/:id', element:<ActivityForm/>},
        {path :'counter', element:<Counter/>}
    ]

}])