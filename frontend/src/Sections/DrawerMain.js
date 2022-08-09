import { IconButton } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import CasinoIcon from "@mui/icons-material/Casino";
import crashIcon from "../assets/crash/crash_logo.jpg";
import coinFlipIcon from "../assets/coinFlip/coinFlip_logo.jpg";
import diceIcon from "../assets/dice/dice_logo.png";
import minesIcon from "../assets/mines/mines_logo.png";
import slotMachineIcon from "../assets/slotMachine/slotMachine_logo.jpg";
import wheelIcon from "../assets/wheel/wheel_logo.png";
import towerLegendIcon from "../assets/towerLegend/towerLegend_logo.jpeg";

const data = [
  {
    name: "crash",
    primary: "Crash",
    icons: crashIcon,
    alt: "crashIcon",
  },
  {
    name: "coinflip",
    primary: "Coin Flip",
    icons: coinFlipIcon,
    alt: "coinFlipIcon",
  },
  {
    name: "mines",
    primary: "Mines",
    icons: minesIcon,
    alt: "minesIcon",
  },
  {
    name: "tower-legend",
    primary: "Tower Legend",
    icons: towerLegendIcon,
    alt: "towerLegendIcon",
  },
  {
    name: "slot-machine",
    primary: "Slot Machine",
    icons: slotMachineIcon,
    alt: "slotMachineIcon",
  },
  {
    name: "dice",
    primary: "dice",
    icons: diceIcon,
    alt: "diceIcon",
  },
  {
    name: "wheel",
    primary: "wheel",
    icons: wheelIcon,
    alt: "wheelIcon",
  },
];

const DrawerMain = () => {
  const [fullDrawer, setFullDrawer] = useState(true);

  let navigate = useNavigate();

  const handleClick = (roomName) => {
    navigate(`/${roomName}`);
  };

  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        fullDrawer ? "w-72" : "w-20 flex flex-col items-center"
      } h-screen transition-all sticky top-0 bottom-0 left-0`}
      style={{ backgroundColor: "#1E2024", zIndex: 30 }}
    >
      <div className='flex items-center justify-between'>
        <p
          className={`p-5 text-xl font-bold ${
            fullDrawer ? "inline-block" : "hidden"
          } transition-all`}
        >
          LOGO
        </p>
        <div
          className={`z-10 rounded-full ${
            fullDrawer ? "translate-x-7" : "translate-x-0 mt-2"
          } transition-all`}
          style={{ backgroundColor: "#1E2024" }}
        >
          <IconButton
            aria-label='open sidebar'
            size='large'
            color='primary'
            onClick={() => setFullDrawer(!fullDrawer)}
          >
            <MenuIcon fontSize='inherit' className='text-white' />
          </IconButton>
        </div>
      </div>
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component='nav'
        aria-labelledby='nested-list-subheader'
      >
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon
              className={`text-white ${!fullDrawer && "translate-x-3"}`}
            />
          </ListItemIcon>
          {fullDrawer && <ListItemText primary='Home' />}
        </ListItemButton>
        {fullDrawer ? (
          <>
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemIcon>
                <CasinoIcon className='text-white' />
              </ListItemIcon>
              <ListItemText primary='Games' />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {data.map((item) => {
                  return (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => handleClick(`${item.name}`)}
                    >
                      <ListItemIcon>
                        <div className='w-10 rounded-full overflow-hidden'>
                          <img
                            src={item.icons}
                            alt={`${item.alt}`}
                            className='w-full h-full'
                          />
                        </div>
                      </ListItemIcon>
                      <ListItemText primary={`${item.primary}`} />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </>
        ) : (
          <>
            {data.map((item) => {
              return (
                <ListItemButton onClick={() => handleClick(`${item.name}`)}>
                  <ListItemIcon>
                    <div className='w-10 rounded-full overflow-hidden'>
                      <img
                        src={item.icons}
                        alt={`${item.alt}`}
                        className='w-full h-full'
                      />
                    </div>
                  </ListItemIcon>
                </ListItemButton>
              );
            })}
          </>
        )}
      </List>
    </div>
  );
};

export default DrawerMain;
