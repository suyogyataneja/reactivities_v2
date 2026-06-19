import { Button, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useState, type ChangeEvent } from "react"

type Props ={
    
    handleCloseForm:()=>void
    activityForm?: Activity
    onSubmitActivity: (activity:Activity) => void   
}

function ActivityForm({handleCloseForm,activityForm, onSubmitActivity}:Props) {

    const[values,setValues] = useState({
        title: activityForm?.title || '',
        description: activityForm?.description || '',
        category: activityForm?.category || '',
        date: activityForm?.date?.split('T')[0] || '',
        city: activityForm?.city || '',
        venue: activityForm?.venue || ''
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setValues({...values,[e.target.name]:e.target.value});
    }

    function handleSubmit(){
        const updatedActivity ={...activityForm, ...values} as Activity;
        onSubmitActivity(updatedActivity)
    }


  return (
    <Paper sx={{borderRadius:3, padding:3}}>
        <Typography variant="h5" gutterBottom color="primary">
            Create activity
        </Typography>
        
        <Box component='form' display='flex' flexDirection='column' gap={3}>
            <TextField label='Title' name='title' value={values.title} onChange={handleChange}/>
            <TextField label='Description' name='description' value={values.description}  onChange={handleChange} multiline rows={3}/>
            <TextField label='Category' name='category'  onChange={handleChange} value={values.category}/>
            <TextField label='Date' name='date' value={values.date}  onChange={handleChange} type="date"/>
            <TextField label='City' name='city' value={values.city}  onChange={handleChange}/>
            <TextField label='Venue' name='venue' value={values.venue}  onChange={handleChange}/>
            <Box display='flex' justifyContent='end' gap={3}>
                <Button color='inherit' onClick={handleCloseForm}>Cancel</Button>
                <Button color='success' onClick={handleSubmit} variant="contained">Submit</Button>
            </Box>
        </Box>  
    </Paper>
)
}
export default ActivityForm