import { Box, Container, CssBaseline, Typography } from '@mui/material';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/Dashboard/ActivityDashboard';
import { useState } from 'react';
import { useActivities } from '../../lib/hooks/useActivities';

function App() {
  
    // const[activities,setActivities]= useState<Activity[]>([]);
    const[selectedActivity, setSelectedActivity]=useState<Activity | undefined>(undefined);
    const[editMode,setEditMode]=useState(false);
    const{activities, isPending}= useActivities();

    // useEffect(() =>{
    //     axios.get('https://localhost:5001/api/activities')
    //     .then(response => setActivities(response.data))

    //     return () =>{}
    // },[])

    // const{data: activities, isPending} = useQuery <Activity[]>({

    //   queryKey:['activities'],
    //   queryFn: async () =>{ 
    //     const response = await axios.get('https://localhost:5001/api/activities');
    //     return response.data;
    //   }
    // });


    function handleOpenForm(id?:string){
      if(id) selectActivity(id);
      else setSelectedActivity(undefined);
      setEditMode(true)
    }

    function handleCloseForm(){
      setEditMode(false)
    }

    function selectActivity(id:string){
      const activity = activities!.find(a=>a.id === id);
      setSelectedActivity(activity);
    }

    // const handleCancelSelectActivity = () =>{
    //   setSelectedActivity(undefined);
    // }
    
    function handleCancelSelectActivity(){
         setSelectedActivity(undefined);
    }

    // function handleSubmitForm(activity:Activity){
    //   // if(activity.id){
    //   //   //update the existing activity
    //   //   setActivities(activities!.map(a=> a.id === activity.id ? activity :a));
    //   // }else{
    //   //   setActivities([...activities, {...activity, id:activities.length.toString()}])
    //   // }
    //   // // setSelectedActivity(activity);
    //   console.log(activity)
    //   setEditMode(false);

    // }

    // function handleDeleteActivity(id:string){

    //   // setActivities(activities.filter(x=>x.id !==id))
    //   console.log(id);
    // }


  return (
<Box sx={{bgcolor:'#eeeeee', minHeight:'100vh'}}>
    <CssBaseline/>
    <NavBar onCreateActivity={handleOpenForm}/>
    <Container maxWidth='xl' sx={{mt:3}}>
      {!activities || isPending ? (
        <Typography>Loading....</Typography>
      ):(
        <ActivityDashboard 
        activitiesDashboard={activities} 
        onSelectActivity ={selectActivity}
        activity={selectedActivity} 
        cancelSelectActivity={handleCancelSelectActivity}
        onCloseForm={handleCloseForm}
        onHandleOpenForm={handleOpenForm}
        edit={editMode}
        // onSubmit={handleSubmitForm}
        // deleteActivity={handleDeleteActivity}
        />

      )}

     </Container>
</Box>
 
  )
}

export default App
