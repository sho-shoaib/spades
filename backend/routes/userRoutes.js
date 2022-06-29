const { signup, login, makeBet, givewin, getBalance } = require('../controllers/userController');
const express = require("express");
const UserRouter = express.Router();

UserRouter.post("/signup", signup);
UserRouter.post("/login", login);
UserRouter.post("/makebet", makeBet);
UserRouter.post("/givewin", givewin);
UserRouter.get("/getbalance/:email",getBalance )
module.exports = UserRouter;