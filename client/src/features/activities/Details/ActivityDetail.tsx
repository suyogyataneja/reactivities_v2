import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography/Typography"
import { useActivities } from "../../../lib/hooks/useActivities"

type Props ={

    selectedActivity:Activity
    onCancel: ()=> void
    openForm: (id?:string)=>void
    
}

export default function ActivityDetail({selectedActivity,onCancel,openForm}:Props) {

  const{activities}= useActivities();
  const activityActivityDetail = activities?.find(x=> x.id === selectedActivity.id);

  if(!activityActivityDetail) return <Typography>Loadinh...</Typography>;

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
<Button color="primary" onClick={() =>openForm(activityActivityDetail.id)}>Edit</Button>
<Button color="inherit" onClick={onCancel}>Cancel</Button>
</CardActions>
    </Card>
  )
}
