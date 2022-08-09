import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import DrawerMain from "./Sections/DrawerMain";
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
import { appConfig } from "./appConfig";
import Wheel from "./Pages/Wheel";
import { Container } from "@mui/system";
export const socket = io.connect(appConfig.API_HOST);
export const rooms = [
  "crash",
  "coinFlip",
  "dice",
  "mines",
  "slotMachine",
  "towerLegend",
  "wheel",
];

const App = () => {
  const userEmail = sessionStorage.useremail;
  const [balance, setBalance] = useState(0);
  const location = useLocation();

  const refreshWallet = () => {
    axios
      .get(`${appConfig.API_HOST}user/user/getbalance/${userEmail}`)
      .then((res) => {
        setBalance(res.data.balance);
      });
  };

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
      <Container
        sx={{ paddingLeft: "0px !important", paddingRight: "0px !important" }}
        maxWidth='xl'
      >
        <div className='flex'>
          {location.pathname != "/login" && location.pathname != "/signup" && (
            <DrawerMain />
          )}
          <div className='w-full'>
            {location.pathname != "/login" &&
              location.pathname != "/signup" && (
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
              <Route
                path='/wheel'
                element={
                  <ProtectedRoute>
                    <Wheel
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
      </Container>
    </>
  );
};

export default App;
