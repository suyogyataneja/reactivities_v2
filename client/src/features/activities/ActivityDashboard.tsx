import { List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import {  useEffect, useState } from "react";

export default function ActivityDashboard(){

    const[activities,setActivities]= useState<Activity[]>([]);

    useEffect(() =>{
        axios.get('https://localhost:5001/api/activities')
        .then(response => setActivities(response.data))

        return () =>{}
    },[])

    return (

        <List>
        {activities.map((activity)=>(
        <ListItem key={activity.id}>
        
        <ListItemText>{activity.title}</ListItemText>

        </ListItem>

        ))}
    </List>
    )
}