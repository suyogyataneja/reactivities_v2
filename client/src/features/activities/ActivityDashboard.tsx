import { Grid2, List, ListItem, ListItemText } from "@mui/material";

type Props={

    activitiesDashboard:Activity[]
}

export default function ActivityDashboard({activitiesDashboard}:Props){


    return (
        <Grid2 container>
            <Grid2 size={9}>
                  <List>
                        {activitiesDashboard.map((activity)=>(
                        <ListItem key={activity.id}>
                        
                        <ListItemText>{activity.title}</ListItemText>

                        </ListItem>

                        ))}
                    </List>

            </Grid2>

        </Grid2>
      
    )
}