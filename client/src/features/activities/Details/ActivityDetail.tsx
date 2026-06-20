import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography/Typography"
import { Link, useNavigate, useParams } from "react-router"
import { useActivities } from "../../../lib/hooks/useActivities"



export default function ActivityDetail() {

  const navigate = useNavigate();
  const {id} = useParams();
  
  const {activity:activityActivityDetail, isLoadingActivity} = useActivities(id);

  // const activityActivityDetail = {} as Activity;
  // const{activities}= useActivities();
  // const activityActivityDetail = activities?.find(x=> x.id === selectedActivity.id);

    if(isLoadingActivity) return <Typography>Loading...</Typography>;

  if(!activityActivityDetail) return <Typography>Activity Not found</Typography>;

  return (
    <Card sx={{borderRadius:3}}>
        
    <CardMedia component='img'
    src={`/images/categoryImages/${activityActivityDetail.category}.jpg`}
    />
<CardContent>
    <Typography variant="h5">{activityActivityDetail.title}</Typography>
    <Typography variant="subtitle1" fontWeight='light'>{activityActivityDetail.date}</Typography>
    <Typography variant="body1">{activityActivityDetail.description}</Typography>
</CardContent>
<CardActions>
<Button component={Link} to={`/manage/${activityActivityDetail.id}`} color="primary" >Edit</Button>
<Button color="inherit" onClick={() => navigate('/activities')}>Cancel</Button>
</CardActions>
    </Card>
  )
}
