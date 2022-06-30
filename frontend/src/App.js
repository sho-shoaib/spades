import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
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
import Navbar from "./Sections/Navbar";
import { useState } from "react";
export const socket = io.connect("http://localhost:3001");

const App = () => {
  const userEmail = sessionStorage.useremail;
  const [balance, setBalance] = useState(0);

  const refreshWallet = () => {
    axios
      .get(`http://localhost:3001/user/user/getbalance/${userEmail}`)
      .then((res) => {
        setBalance(res.data.balance);
      });
  };

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
          {window.location != "http://localhost:3000/login" &&
            window.location != "http://localhost:3000/signup" && <Sidebar />}
          <div className='w-full'>
            {window.location != "http://localhost:3000/login" &&
              window.location != "http://localhost:3000/signup" && (
                <Navbar
                  balance={balance}
                  refreshWallet={refreshWallet}
                  setBalance={setBalance}
                />
              )}
            <Routes>
              <Route
                exact
                path='/'
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/crash'
                element={
                  <ProtectedRoute>
                    <CrashGame
                      balance={balance}
                      refreshWallet={refreshWallet}
                      setBalance={setBalance}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/coinflip'
                element={
                  <ProtectedRoute>
                    <CoinFlip
                      balance={balance}
                      refreshWallet={refreshWallet}
                      setBalance={setBalance}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/mines'
                element={
                  <ProtectedRoute>
                    <Mines
                      balance={balance}
                      refreshWallet={refreshWallet}
                      setBalance={setBalance}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/tower-legend'
                element={
                  <ProtectedRoute>
                    <TowerLegend
                      balance={balance}
                      refreshWallet={refreshWallet}
                      setBalance={setBalance}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path='slot-machine'
                element={
                  <ProtectedRoute>
                    <SlotMachine
                      balance={balance}
                      refreshWallet={refreshWallet}
                      setBalance={setBalance}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/dice'
                element={
                  <ProtectedRoute>
                    <Dice
                      balance={balance}
                      refreshWallet={refreshWallet}
                      setBalance={setBalance}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
