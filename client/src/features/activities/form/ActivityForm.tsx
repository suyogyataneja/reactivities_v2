import { Button, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useState, type ChangeEvent } from "react"
import { useActivities } from "../../../lib/hooks/useActivities"
import { useNavigate, useParams } from "react-router"


function ActivityForm() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { updateActivity, createActivity, activity: activityForm, isLoadingActivity } = useActivities(id);

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

    async function handleSubmit(){
        if(activityForm){
            const updatedActivity ={...activityForm, ...values} as Activity;
            await updateActivity.mutateAsync(updatedActivity);
            navigate(`/activities/${activityForm.id}`);
        }
        else{
            createActivity.mutate(values as Activity, {
                onSuccess: (id) => navigate(`/activities/${id}`)
            });
        }
    }

    if (id && isLoadingActivity) return <Typography>Loading...</Typography>

  return (
    <Paper sx={{borderRadius:3, padding:3}}>
        <Typography variant="h5" gutterBottom color="primary">
            {activityForm ? 'Edit activity' : 'Create activity'}
        </Typography>

        <Box component='form' display='flex' flexDirection='column' gap={3}>
            <TextField label='Title' name='title' value={values.title} onChange={handleChange}/>
            <TextField label='Description' name='description' value={values.description}  onChange={handleChange} multiline rows={3}/>
            <TextField label='Category' name='category'  onChange={handleChange} value={values.category}/>
            <TextField label='Date' name='date' value={values.date}  onChange={handleChange} type="date"/>
            <TextField label='City' name='city' value={values.city}  onChange={handleChange}/>
            <TextField label='Venue' name='venue' value={values.venue}  onChange={handleChange}/>
            <Box display='flex' justifyContent='end' gap={3}>
                <Button color='inherit' onClick={() => navigate(-1)}>Cancel</Button>
                <Button
                color='success'
                onClick={handleSubmit}
                variant="contained"
                disabled={updateActivity.isPending || createActivity.isPending}
                >
                    Submit
                    </Button>
            </Box>
        </Box>
    </Paper>
)
}
export default ActivityForm
