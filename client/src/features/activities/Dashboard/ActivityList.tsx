import { Box } from "@mui/material"
import { ActivityCard } from "./ActivityCard"

type Props ={
    activitiesActivityList: Activity[]
    onViewActivity:(id:string) => void
    onDeleteActivity:(id:string)=>void
}

export default function ActivityList({activitiesActivityList, onViewActivity,onDeleteActivity}:Props){

    return(
   <Box sx={{display:'flex', flexDirection:'column', gap:3}}>
        {activitiesActivityList.map(
            activity =>(
                < ActivityCard 
                key={activity.id}
                activityActivityCard={activity}
                onView={onViewActivity}
                onDelete={onDeleteActivity}  
                  />
            )
        )}
   </Box>

    )
}