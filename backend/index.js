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

let bets = [];
let refershBets = false;
var crashAt = 1;
let gameEnd = false;

setInterval(() => {}, 3000);

// connection event
io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("send_bet", (data) => {
    bets.push(data);
    socket.broadcast.emit("receive_message", bets);
    socket.emit("receive_message", bets);
  });

  socket.on("cancel_bet", (data) => {
    bets.pop(data);
    socket.broadcast.emit("receive_message", bets);
    socket.emit("receive_message", bets);
  });

  const startGame = () => {
    gameEnd = false;
    var seed = Math.random().toString().slice(2, -1);
    var salt = Math.random().toString().slice(2, -1);
    crashAt = crashResFinder(seed, salt);
    console.log(crashAt);
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
});

app.get("/crash", (req, res) => {
  res.status(200).json({
    status: "success",
    bets,
  });
});

app.post("/coin-flip", (req, res) => {
  const { choice } = req.body;

  let num = Math.random();
  let result = "";

  if (num < 0.5) {
    result = "HEAD";
  } else {
    result = "TAIL";
  }

  if (choice === result) {
    res.status(200).json({
      status: "WON",
      result,
      yourChoice: choice,
    });
  } else {
    res.status(200).json({
      status: "LOST",
      result,
      yourChoice: choice,
    });
  }
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
