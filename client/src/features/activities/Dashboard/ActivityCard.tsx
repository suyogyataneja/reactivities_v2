import { Box, Button, Card, CardActions, Chip, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities"

type Props={

    activityActivityCard:Activity
    onView :(id:string)=>void
    // onDelete:(id:string)=> void
}



export function ActivityCard({activityActivityCard, onView}:Props){

    const {deleteActivity} = useActivities();

    function getActivityDetails(){
        // console.log(activityActivityCard.id)
        onView(activityActivityCard.id)
    }


    return (
        <Card sx={{borderRadius:3}}>
            <Typography variant="h5">{activityActivityCard.title}</Typography>
            <Typography sx={{color:'text.secondary', mb:1}}>{activityActivityCard.date} </Typography>
            <Typography variant="body2">{activityActivityCard.description}</Typography>
            <Typography variant="subtitle1">{activityActivityCard.city}/ {activityActivityCard.venue}</Typography>
       
             <CardActions sx={{display:'flex', justifyContent: 'space-between', pb:2}}>
                <Chip label={activityActivityCard.category} variant="outlined"/>

                <Box sx={{display:'flex', justifyContent:'space-berween' ,gap:2}}>
                <Button size="medium" variant="contained" onClick={getActivityDetails} color="primary">
                    View
                </Button>
                <Button size="medium" variant="contained" 
                onClick={ () => deleteActivity.mutate(activityActivityCard.id) }
                color="error"
                disabled={deleteActivity.isPending}
                >
                    Delete
                </Button>
                </Box>
             </CardActions>

        </Card>
        
       

    )
}