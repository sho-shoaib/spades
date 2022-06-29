const UserRouter = require('./userRoutes');
const express = require('express');
const apiRouter = express.Router();
apiRouter.use('/user', UserRouter);

module.exports = apiRouter;
