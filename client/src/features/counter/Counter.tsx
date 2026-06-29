import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useStore } from "../../lib/hooks/useStore";
import { Button, ButtonGroup, ListItemText, Paper,List } from "@mui/material";
  import { observer } from "mobx-react-lite";

  
export default observer(function Counter() {
    const {counterStore} = useStore();
  return (
   <Box display='flex' justifyContent='space-between'>
     <Box sx={{width:'60%'}}>
        <Typography variant="h4">{counterStore.title}</Typography>
        <Typography variant="h2">{counterStore.count}</Typography>

        <ButtonGroup sx={{mt:3}}>
            <Button variant="contained" color="error" onClick={() => counterStore.decrement()}>Decrement</Button>
            <Button variant="contained" color="success"  onClick={() => counterStore.increment()}>Increment</Button>
            <Button variant="contained" color="primary" onClick={() => counterStore.increment(5)}>Increment by 5</Button> 
        </ButtonGroup>
      </Box>
        <Paper sx={{width:'40%', p:4}}>

            <Typography variant="h5">Counter Events  ({counterStore.eventCount})</Typography>
            <List>
              {counterStore.events.map((event,index) => (
                <ListItemText key={index}>{event}</ListItemText>
              ))}
            </List>
        </Paper>
    </Box>


  )
})
