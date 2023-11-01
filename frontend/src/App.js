import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Navigation from "./components/Navigation";
import Simulation from "./components/Simulation";
import { Box } from "@mui/material";
import ChatApp from "./ChatApp";
function App() {
  return (
    <Router>
      <Navigation/>
      <Box width='100%' sx={{ mt: '50px'}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/simulation" element={<Simulation/>} />
          <Route path="/chat" element={<ChatApp/>} />
        </Routes>
      </Box>
    
    </Router>
  );
}

export default App;
