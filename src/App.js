import logo from './logo.svg';
import './App.css';
import MIFCHorizontal from './components/Home';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import { Box } from '@mui/material';

function App() {
  return (
    // <Box>
    //   <AppRoutes />
    // </Box>
    <>
      <MIFCHorizontal />
    </>
  );
}

export default App;
