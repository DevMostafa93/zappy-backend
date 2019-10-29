require('custom-env').env();
const { createServer } = require('http');
var bodyParser = require('body-parser')
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const port = process.env.PORTA || 3000;
const slackEvents = createEventAdapter(slackSigningSecret);
const tweetService = require('./src/tweets/tweetService')
const tweetRoutes = require('./src/tweets/tweetRoutes')
const mongoose = require('mongoose')
const express = require('express');

const app = express();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true }).then(() => {

  console.log(`Server Connecting to Mongoo.`);

  const server = createServer(app);
  server.listen(port, () => {
    console.log(`Listening for events on ${server.address().port}`);
  });

  app.use('/slack/events', slackEvents.requestListener());

  slackEvents.on('message', (event) => {
    // console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    if ((event.channel === process.env.CHANNEL_ID) && (event.text.toLowerCase().includes(process.env.CONTAINING_MESSAGE)))
      tweetService.saveTweets();

  });
  app.use(require("cors")())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use('/api/tweets', tweetRoutes)


}).catch((error) => console.log(`Connection to Mongoo DB Failed. ${error}`));
