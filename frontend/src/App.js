import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./Sections/Sidebar";
import CrashGame from "./Pages/CrashGame";
import CoinFlip from "./Pages/CoinFlip";
import io from "socket.io-client";
import Mines from "./Pages/Mines";
import TowerLegend from "./Pages/TowerLegend";
import SlotMachine from "./Pages/SlotMachine";
import Dice from "./Pages/Dice";
import LoginPage from "./Pages/Login";
import SignUpPage from "./Pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
export const socket = io.connect("http://localhost:3001");

const App=()=> {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />

      </Routes>
  </BrowserRouter>
    <BrowserRouter>
      <div className='flex'>
        {window.location != 'http://localhost:3000/login' && window.location != 'http://localhost:3000/signup' && <Sidebar />}
        <Routes>
          <Route exact path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/crash' element={<ProtectedRoute><CrashGame /></ProtectedRoute>} />
          <Route path='/coinflip' element={<ProtectedRoute><CoinFlip /></ProtectedRoute>} />
          <Route path='/mines' element={<ProtectedRoute><Mines /></ProtectedRoute>} />
          <Route path='/tower-legend' element={<ProtectedRoute><TowerLegend /></ProtectedRoute>} />
          <Route path='slot-machine' element={<ProtectedRoute><SlotMachine /></ProtectedRoute>} />
          <Route path='/dice' element={<ProtectedRoute><Dice /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
