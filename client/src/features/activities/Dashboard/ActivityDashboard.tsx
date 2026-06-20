import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../Details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";


export default function ActivityDashboard(){
    
    //  const{deleteActivity}= useActivities();


    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
            <ActivityList/>

            </Grid2>

            <Grid2 size={5}>
                Activity filters go here
            </Grid2>

        </Grid2>
      
    )
}