import { Box, Container, CssBaseline } from '@mui/material';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/Dashboard/ActivityDashboard';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  
    const[activities,setActivities]= useState<Activity[]>([]);
    const[selectedActivity, setSelectedActivity]=useState<Activity | undefined>(undefined);
    const[editMode,setEditMode]=useState(false);

    useEffect(() =>{
        axios.get('https://localhost:5001/api/activities')
        .then(response => setActivities(response.data))

        return () =>{}
    },[])

    function handleOpenForm(id?:string){
      if(id) selectActivity(id);
      else setSelectedActivity(undefined);
      setEditMode(true)
    }

    function handleCloseForm(){
      setEditMode(false)
    }

    function selectActivity(id:string){
      const activity = activities.find(a=>a.id === id);
      setSelectedActivity(activity);
    }

    // const handleCancelSelectActivity = () =>{
    //   setSelectedActivity(undefined);
    // }
    
    function handleCancelSelectActivity(){
         setSelectedActivity(undefined);
    }

    function handleSubmitForm(activity:Activity){
      if(activity.id){
        //update the existing activity
        setActivities(activities.map(a=> a.id === activity.id ? activity :a));
      }else{
        setActivities([...activities, {...activity, id:activities.length.toString()}])
      }
      // setSelectedActivity(activity);
      setEditMode(false);

    }

    function handleDeleteActivity(id:string){

      setActivities(activities.filter(x=>x.id !==id))
    }


  return (
<Box sx={{bgcolor:'#eeeeee'}}>
    <CssBaseline/>
    <NavBar onCreateActivity={handleOpenForm}/>
    <Container maxWidth='xl' sx={{mt:3}}>
        <ActivityDashboard 
        activitiesDashboard={activities} 
        onSelectActivity ={selectActivity}
        activity={selectedActivity} 
        cancelSelectActivity={handleCancelSelectActivity}
        onCloseForm={handleCloseForm}
        onHandleOpenForm={handleOpenForm}
        edit={editMode}
        onSubmit={handleSubmitForm}
        deleteActivity={handleDeleteActivity}
        />
     </Container>
</Box>
 
  )
}

export default App
