import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../Details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props={

    activitiesDashboard:Activity[]
    onSelectActivity:(id:string) => void
    activity:Activity | undefined
    cancelSelectActivity:()=>void
    onCloseForm:()=>void
    edit:boolean
    onHandleOpenForm:(id?:string) => void
    onSubmit:(activity :Activity) => void
    deleteActivity: (id:string) => void
}

export default function ActivityDashboard({activitiesDashboard,
     onSelectActivity, activity,cancelSelectActivity,onCloseForm,edit,onHandleOpenForm,onSubmit,deleteActivity}:Props){


    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
            <ActivityList 
            activitiesActivityList={activitiesDashboard} 
             onViewActivity={onSelectActivity}
             onDeleteActivity={deleteActivity}/>

            </Grid2>

            <Grid2 size={5}>
              
              {activity && !edit && <ActivityDetail
               activityActivityDetail={activity}
                onCancel ={cancelSelectActivity}
                openForm={onHandleOpenForm}
               />}
                {edit && <ActivityForm handleCloseForm={onCloseForm} activityForm={activity}  onSubmitActivity={onSubmit}/>}
            </Grid2>

        </Grid2>
      
    )
}