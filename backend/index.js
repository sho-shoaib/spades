const express = require("express");
const crashResFinder = require("./LogicFunctions/CrashFunction.js");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
var CryptoJS = require("crypto-js");
const crypto = require("crypto");
const mongoose = require("mongoose");
const apiRouter = require("./routes/index");
const axios = require("axios");
//db connection starts here
(async () => {
  try {
    mongoose.connect(
      "mongodb://spades:spades@cluster0-shard-00-00.izwi8.mongodb.net:27017,cluster0-shard-00-01.izwi8.mongodb.net:27017,cluster0-shard-00-02.izwi8.mongodb.net:27017/mydb?ssl=true&replicaSet=atlas-sndbks-shard-0&authSource=admin&retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to database");
  } catch (err) {
    console.log("DB connection failed");
  }
})();

//db code ends here

const totalSumForEasy = 10;
const fruits = ["Apple", "Banana", "Cherry"];

// cors middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", apiRouter);

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
let crash_sendData;
let canBet;

// Make random string
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Crash
const startGame = () => {
  gameStart = true;
  var seed = Math.random().toString().slice(2, -1);
  var salt = Math.random().toString().slice(2, -1);
  var crashAt = crashResFinder(seed, salt);
  console.log(crashAt);
  let i = 1;
  function myLoop() {
    setTimeout(() => {
      crash_sendData = {
        curr: `Bang @ ${i.toFixed(2)} x`,
        end: false,
        crashBets,
        canBet: false,
        gameRunning: true,
        crashed: false,
        no: i.toFixed(2),
      };

      if (i < crashAt) {
        myLoop();
      } else {
        crash_sendData = {
          curr: `Bang @ ${i.toFixed(2)} x`,
          end: true,
          crashBets,
          canBet: false,
          gameRunning: false,
          crashed: true,
          no: i.toFixed(2),
        };
        gameStart = false;
        setTimeout(() => {
          crashBets = [];
          runUp();
        }, 3000);
      }
      i += 0.01;
    }, 100);
  }
  myLoop();
};

const runUp = () => {
  let i = 5;
  function myLoop() {
    setTimeout(() => {
      crash_sendData = {
        curr: `Game start in ${i.toFixed(1)} s`,
        end: false,
        crashBets,
        canBet: true,
        gameRunning: false,
        crashed: false,
      };

      if (i >= 0.1) {
        myLoop();
      } else {
        startGame();
      }
      i -= 0.1;
    }, 100);
  }
  myLoop();
};

runUp();

setInterval(() => {
  io.to("crash").emit("crash_data", crash_sendData);
}, 100);

// Tower legend function
const difficulityOptions = [
  { label: "Easy", value: 0, totalChose: 4, errorChose: 1, level: 9 },
  { label: "Medium", value: 1, totalChose: 3, errorChose: 1, level: 9 },
  { label: "Hard", value: 2, totalChose: 2, errorChose: 1, level: 9 },
  {
    label: "Extreme",
    valuehmac_sha256: 3,
    totalChose: 3,
    errorChose: 2,
    level: 6,
  },
  { label: "Nightmare", value: 4, totalChose: 4, errorChose: 3, level: 6 },
];

function getHashResultNumber(hashResult) {
  const result = [];
  for (let i = 0; i < hashResult.length; i += 2) {
    let dext = hashResult[i] + hashResult[i + 1];
    let hext = parseInt(dext, 16);
    result.push(hext);
  }
  return result;
}

function createNums(hash, index, events) {
  const bytes = hash.substring(index * 8, (index + 1) * 8);
  const resultList = getHashResultNumber(bytes);
  const firstStep = resultList[0] / Math.pow(256, 1);
  const secondStep = resultList[1] / Math.pow(256, 2);
  const thirdStep = resultList[2] / Math.pow(256, 3);
  const fourthStep = resultList[3] / Math.pow(256, 4);
  const totalStepsNum = firstStep + secondStep + thirdStep + fourthStep;
  return Math.floor(totalStepsNum * events);
}

// connection event
io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  // Join rooms
  socket.on("join_room", ({ roomName }) => {
    socket.join(roomName);
    console.log(`user joined ${roomName}`);
  });

  // Bets
  socket.on("send_bet", ({ roomName, data }) => {
    axios
      .post("http://localhost:3001/user/user/makebet/", {
        email: data.userEmail,
        amount: data.betAmt,
      })
      .then(() => {
        axios
          .get(`http://localhost:3001/user/user/getbalance/${data.userEmail}`)
          .then((res) => {
            socket.emit("deducted_amt", { balance: res.data.balance });
          });
      });
    if (roomName === "crash") {
      crashBets.push(data);
    }
    console.log(data, roomName);
  });

  socket.on("cancel_bet", ({ roomName, data }) => {
    if (roomName === "crash") {
      crashBets.pop(data);
    }
  });

  socket.on("change_crash_bet", (data) => {
    let found = crashBets.find((item) => item.userEmail === data.userEmail);
    let index = crashBets.indexOf(found);
    found.crashOutAt = data.cashedOutAt;
    found.profit = data.profit;
    crashBets[index] = found;
  });

  // Coin flip
  socket.on("post coinFlip result", (data) => {
    const { userChoice, userBetAmt, userEmail } = data;
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
  socket.on("send_reward", (data) => {
    axios
      .post("http://localhost:3001/user/user/givewin", {
        email: data.userEmail,
        amount: data.betAmt,
      })
      .then(() => {
        axios
          .get(`http://localhost:3001/user/user/getbalance/${data.userEmail}`)
          .then((res) => {
            socket.emit("deducted_amt", { balance: res.data.balance });
          });
      });
  });
  // Mines
  socket.on("get mines data", () => {
    function createNums(allNums, hash) {
      let nums = [];
      let h = crypto.createHash("SHA256").update(hash).digest("hex");
      allNums.forEach((c) => {
        nums.push({ num: c, hash: h });
        h = h.substring(1) + h.charAt(0);
      });
      nums.sort(function (o1, o2) {
        if (o1.hash < o2.hash) {
          return -1;
        } else if (o1.hash === o2.hash) {
          return 0;
        } else {
          return 1;
        }
      });
      return nums;
    }
    function getResult(hash) {
      const allNums = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25,
      ];
      let seed = hash;
      let finalNums = createNums(allNums, seed);
      seed = crypto.createHash("SHA256").update(seed).digest("hex");
      finalNums = createNums(finalNums, seed);
      let finalArr = finalNums.map((m) => m.num.num);
      bombAt = finalArr.indexOf(1);
      return bombAt;
    }
    const secret = "shoaib";
    let checkWhat = CryptoJS.AES.encrypt(
      getResult(makeid(15)).toString(),
      secret
    ).toString();
    socket.emit("receive data mines", { checkWhat });
  });

  // Tower legend
  socket.on(
    "get tower data",
    ({ selectedClientSeed, selectedNonce, selectedMode }) => {
      function getResult(serverSeed, clientSeed, nonce, mode) {
        const modeInfo = difficulityOptions[mode];
        const result = [];
        for (let i = 0; i < modeInfo.level; i++) {
          const winList = [];
          const resultArr = [clientSeed, nonce, i];
          const hmacSha256Result = CryptoJS.HmacSHA256(
            resultArr.join(":"),
            serverSeed
          ).toString();
          const tower = [];
          for (let t = 1; t <= modeInfo.totalChose; t++) tower.push(t);
          for (let j = 0; j < modeInfo.totalChose - modeInfo.errorChose; j++) {
            const event = createNums(hmacSha256Result, j, tower.length);
            winList.push(tower[event]);
            tower.splice(event, 1);
          }
          result.push(winList);
        }
        return result;
      }

      let resArray = getResult(
        makeid(15),
        selectedClientSeed,
        selectedNonce,
        selectedMode
      );

      let bombPositions = [];

      const getBombPositions = () => {
        resArray.map((item) => {
          let total = 0;
          item.map((no) => {
            total += no;
          });
          let bombPos = totalSumForEasy - total;
          bombPositions.push(bombPos);
        });
      };
      getBombPositions();

      const secret = "shoaib";

      let checkWhat = CryptoJS.AES.encrypt(
        bombPositions.toString(),
        secret
      ).toString();
      console.log(checkWhat);
      socket.emit("recieve tower data", checkWhat);
    }
  );

  socket.on("get slotMachine data", () => {
    let jackpot = false;
    let equalterms = 0;
    let lost = true;
    var one = Math.floor(Math.random() * 3);
    var two = Math.floor(Math.random() * 3);
    var three = Math.floor(Math.random() * 3);
    var fruitOne = fruits[one];
    var fruitTwo = fruits[two];
    var fruitThree = fruits[three];

    if (fruitOne == fruitTwo && fruitTwo == fruitThree) {
      jackpot = true;
      equalterms = 3;
      lost = false;
    } else if (
      fruitOne == fruitTwo ||
      fruitTwo == fruitThree ||
      fruitThree == fruitOne
    ) {
      jackpot = false;
      equalterms = 2;
      lost = false;
    }

    var toSendArr = [fruitOne, fruitTwo, fruitThree];

    socket.emit("recieve slotMachine data", {
      toSendArr,
      lost,
      jackpot,
      equalterms,
    });
  });

  socket.on("get dice data", (data) => {
    let landsOn = Math.floor(Math.random() * 101);
    let userFrom = data.from;
    let userTo = data.to;
    let win;

    if (landsOn >= userFrom && landsOn <= userTo) {
      win = true;
    } else {
      win = false;
    }

    socket.emit("recieve dice data", {
      landsOn,
      win,
    });
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
