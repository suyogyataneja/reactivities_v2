import { Box, Container, CssBaseline } from '@mui/material';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/Dashboard/ActivityDashboard';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  
    const[activities,setActivities]= useState<Activity[]>([]);

    useEffect(() =>{
        axios.get('https://localhost:5001/api/activities')
        .then(response => setActivities(response.data))

        return () =>{}
    },[])


  return (
<Box sx={{bgcolor:'#eeeeee'}}>
    <CssBaseline/>
    <NavBar/>
    <Container maxWidth='xl' sx={{mt:3}}>
        <ActivityDashboard activitiesDashboard={activities}/>
     </Container>
</Box>
 
  )
}

export default App
