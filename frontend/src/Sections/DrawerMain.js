import { IconButton } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import HomeIcon from "@mui/icons-material/Home";
import CasinoIcon from "@mui/icons-material/Casino";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

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
      } h-screen transition-all`}
      style={{ backgroundColor: "#1E2024" }}
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
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("crash")}
                >
                  <ListItemIcon>
                    <QuestionMarkIcon className='text-white' />
                  </ListItemIcon>
                  <ListItemText primary='Crash' />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("coinflip")}
                >
                  <ListItemIcon>
                    <QuestionMarkIcon className='text-white' />
                  </ListItemIcon>
                  <ListItemText primary='Coin Flip' />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("mines")}
                >
                  <ListItemIcon>
                    <QuestionMarkIcon className='text-white' />
                  </ListItemIcon>
                  <ListItemText primary='Mines' />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("tower-legend")}
                >
                  <ListItemIcon>
                    <QuestionMarkIcon className='text-white' />
                  </ListItemIcon>
                  <ListItemText primary='Tower Legend' />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("slot-machine")}
                >
                  <ListItemIcon>
                    <QuestionMarkIcon className='text-white' />
                  </ListItemIcon>
                  <ListItemText primary='Slot Machine' />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("dice")}
                >
                  <ListItemIcon>
                    <QuestionMarkIcon className='text-white' />
                  </ListItemIcon>
                  <ListItemText primary='Dice' />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("wheel")}
                >
                  <ListItemIcon>
                    <QuestionMarkIcon className='text-white' />
                  </ListItemIcon>
                  <ListItemText primary='Wheel' />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        ) : (
          <>
            <ListItemButton onClick={() => handleClick("crash")}>
              <ListItemIcon>
                <QuestionMarkIcon className='text-white transition-all translate-x-3' />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("coinflip")}>
              <ListItemIcon>
                <QuestionMarkIcon className='text-white transition-all translate-x-3' />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("mines")}>
              <ListItemIcon>
                <QuestionMarkIcon className='text-white transition-all translate-x-3' />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("tower-legend")}>
              <ListItemIcon>
                <QuestionMarkIcon className='text-white transition-all translate-x-3' />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("slot-machine")}>
              <ListItemIcon>
                <QuestionMarkIcon className='text-white transition-all translate-x-3' />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("dice")}>
              <ListItemIcon>
                <QuestionMarkIcon className='text-white transition-all translate-x-3' />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("wheel")}>
              <ListItemIcon>
                <QuestionMarkIcon className='text-white transition-all translate-x-3' />
              </ListItemIcon>
            </ListItemButton>
          </>
        )}
      </List>
    </div>
  );
};

export default DrawerMain;
