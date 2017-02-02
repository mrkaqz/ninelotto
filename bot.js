'use strict'

const line = require('node-line-bot-api')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var config = require('./config.json');
var msgsJSON = require('./message.json');


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// need raw buffer for signature validation
app.use(bodyParser.json({
  verify (req, res, buf) {
    req.rawBody = buf
  }
}))

app.use(bodyParser.json())

// init with auth
line.init({
  accessToken: config.accessToken,
  // (Optional) for webhook signature validation
  channelSecret: config.channelSecret
})
 
app.get('/debug', function (req, res) {
    res.send('Hello Wolrd');
})

app.post('/webhook/', line.validator.validateSignature(), (req, res, next) => {
  // get content from request body
  const promises = req.body.events.map(event => {

    var rand = getRndInteger(0,msgsJSON.eatword.length);
    var replyText  = msgsJSON.eatword[rand];

    // reply message
    return line.client
      .replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: 'text',
            //text: event.message.text
            text : replyText
        }
        ]
      })
  })
  Promise
    .all(promises)
    .then(() => res.json({success: true}))
})

 
app.listen(process.env.PORT || 80, () => {
  console.log('Bot app listening on port 80!')
})