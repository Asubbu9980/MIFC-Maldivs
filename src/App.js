import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import { Box } from '@mui/material';

function App() {
  return (
    // <Box>
    //   <AppRoutes />
    // </Box>
    <>
    
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
