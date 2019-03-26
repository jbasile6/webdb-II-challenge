const express = require('express');
const helmet = require('helmet');

const zoosRouter = require('./zoos/zooRouter');
const bearRouter = require('./zoos/bearRouter');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/bears', bearRouter);
server.use('/api/zoos', zoosRouter);


module.exports = server;