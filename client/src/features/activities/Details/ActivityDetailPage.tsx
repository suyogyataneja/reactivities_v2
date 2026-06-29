import Typography from "@mui/material/Typography/Typography"
import {  useParams } from "react-router"
import { useActivities } from "../../../lib/hooks/useActivities"
import Grid2 from "@mui/material/Grid2"
import ActivityDetailsHeader from "./ActivityDetailsHeader"
import ActivityDetailsInfo from "./ActivityDetailsInfo"
import ActivityDetailsChat from "./ActivityDetailsChat"
import ActivityDetailsSidebar from "./ActivityDetailsSidebar"



export default function ActivityDetailPage() {

  // const navigate = useNavigate();
  const {id} = useParams();
  
  const {activity:activityActivityDetail, isLoadingActivity} = useActivities(id);

  // const activityActivityDetail = {} as Activity;
  // const{activities}= useActivities();
  // const activityActivityDetail = activities?.find(x=> x.id === selectedActivity.id);

    if(isLoadingActivity) return <Typography>Loading...</Typography>;

  if(!activityActivityDetail) return <Typography>Activity Not found</Typography>;

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
            <ActivityDetailsHeader activity={activityActivityDetail}/>
            <ActivityDetailsInfo activity={activityActivityDetail}/>
            <ActivityDetailsChat />
      </Grid2>

      <Grid2 size={4}>
            <ActivityDetailsSidebar/>
      </Grid2>

    </Grid2>

  )
}
