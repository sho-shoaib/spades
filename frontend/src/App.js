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
          <Route exact path='/' element={<Home />} />
          <Route path='/crash' element={<CrashGame />} />
          <Route path='/coinflip' element={<CoinFlip />} />
          <Route path='/mines' element={<Mines />} />
          <Route path='/tower-legend' element={<TowerLegend />} />
          <Route path='slot-machine' element={<SlotMachine />} />
          <Route path='/dice' element={<Dice />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
