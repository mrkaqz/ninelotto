'use strict'

const line = require('node-line-bot-api')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var msgsJSON = require('./message.json');
var msgs = JSON.parse(msgsJSON);

console.log(msgs.eatword.1);
 
// need raw buffer for signature validation
app.use(bodyParser.json({
  verify (req, res, buf) {
    req.rawBody = buf
  }
}))

app.use(bodyParser.json())

// init with auth
line.init({
  accessToken: 'tItdmtzc8IE/NBQ28ouLWWxVwuwXd8PSkjN9vFGhMjuNHOJU+tsRS+ZQn+xqqgo083mwevnDRcTPQYAGO2OevKA7lph3ddU4VXnMU8C5xFCeN5JKEG85C0k9UPm7AH657TtAKb+NCz9s3wdg1FpbHAdB04t89/1O/w1cDnyilFU=',
  // (Optional) for webhook signature validation
  channelSecret: 'dd9e4f38db934a29efa6d268b33e3970'
})
 
app.get('/debug', function () {
    console.log('Hello Wolrd');
})

app.post('/webhook/', line.validator.validateSignature(), (req, res, next) => {
  // get content from request body
  const promises = req.body.events.map(event => {
    // reply message
    return line.client
      .replyMessage({
        replyToken: event.replyToken,
        messages: [
          {

            type: 'text',
            //text: event.message.text
            test : 
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