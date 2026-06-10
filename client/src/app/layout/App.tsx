import { Container, CssBaseline } from '@mui/material';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/ActivityDashboard';

function App() {
  


  return (
<>
    <CssBaseline/>
    <NavBar/>
    <Container maxWidth='xl' sx={{mt:3}}>
        <ActivityDashboard/>
     </Container>
</>
 
  )
}

export default App
