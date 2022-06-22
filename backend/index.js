const express = require("express");
const crashResFinder = require("./LogicFunctions/CrashFunction.js");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

// cors middleware
app.use(cors());
app.use(express.json());

const port = 3001;

// http server
const server = http.createServer(app);

// socket io config
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let crashBets = [];
let refershBets = false;
var crashAt = 1;
let gameEnd = false;

setInterval(() => {}, 3000);

// connection event
io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("send_bet", (data) => {
    crashBets.push(data);
    socket.broadcast.emit("receive_message", crashBets);
  });

  socket.on("cancel_bet", (data) => {
    crashBets.pop(data);
    socket.broadcast.emit("receive_message", crashBets);
  });

  socket.on("join_room", (roomname) => {
    socket.join(roomname);
    socket.emit("joined", { crashBets });
  });

  const startGame = () => {
    gameEnd = false;
    var seed = Math.random().toString().slice(2, -1);
    var salt = Math.random().toString().slice(2, -1);
    crashAt = crashResFinder(seed, salt);
    // console.log(crashAt);
    let i = 1;
    function myLoop() {
      setTimeout(() => {
        socket.emit("crash_data", {
          curr: `Bang @ ${i.toFixed(2)} x`,
          end: false,
        });
        if (i < crashAt) {
          myLoop();
        } else {
          socket.emit("crash_data", {
            curr: `Bang @ ${i.toFixed(2)} x`,
            end: true,
          });
          gameEnd = true;
          setTimeout(() => {
            startGame();
          }, 5000);
        }
        i += 0.01;
      }, 100);
    }
    myLoop();
  };
  startGame();

  // coinFlip
  socket.on("join coinFlip", () => {
    socket.join("coinFlip");
  });
  socket.on("post coinFlip result", (data) => {
    const { userChoice, userBetAmt } = data;
    let num = Math.random();
    let result = "";

    if (num < 0.5) {
      result = "HEAD";
    } else {
      result = "TAIL";
    }

    if (userChoice === result) {
      socket.emit("get coinFlip result", {
        userChoice,
        status: "WON",
        serverChoice: result,
        betting: true,
      });
    } else {
      socket.emit("get coinFlip result", {
        userChoice,
        status: "LOST",
        serverChoice: result,
        betting: false,
      });
    }
  });

  // Mines
  socket.on("join mines", () => {
    socket.join("mines");
  });

  socket.on("post mines data", (data) => {
    const { userBet } = data;
    socket.emit("start", { beginGame: true });
  });
});

app.get("/crash", (req, res) => {
  res.status(200).json({
    status: "success",
    bets,
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
