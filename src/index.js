// CRIO_SOLUTION_START_MODULE_UNDERSTANDING_BASICS
// CRIO_SOLUTION_END_MODULE_UNDERSTANDING_BASICS
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

let server;

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
// CRIO_SOLUTION_START_MODULE_UNDERSTANDING_BASICS
// Tries to create a MongoDB connection and on success starts the Node server
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

//below code from actula redis.com database. Its free. will be shifting to it soon.

// const { createClient } = require('redis');

// const client = createClient({
//     password: 'i2hiEnTqzYpMAvjjNGoS0t0WbDlnqUg5',
//     socket: {
//         host: 'redis-12879.c277.us-east-1-3.ec2.cloud.redislabs.com',
//         port: 12879
//     }
// });

// client.connect();


//connecting to redis as well for CASHING
const redis = require('redis');

const client = redis.createClient({
  socket: {
      host: config.redis_host,
      port: config.redis_port,
      connect_timeout: 10000, 
  },
  password: config.redis_pass,
});

client.connect();

client.on("Audumber", (err) => {logger.info("Audumber")});
client.on('connect', () => {logger.info('Redis connecting...')});
client.on('ready'       , () => { logger.info('Redis ready')});
client.on('reconnecting', () => { logger.info('reconnecting') });








// client.setex("Audumber", 3600, "value_audu");



// CRIO_SOLUTION_END_MODULE_UNDERSTANDING_BASICS

// ------------- Don't Modify  -------------
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
// ------------- Don't Modify  -------------
