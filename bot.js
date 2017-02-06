var request = require('request');
var express = require('express')
const bodyParser = require('body-parser')
var app = express()

var config = require('./config.json');
var msgsJSON = require('./message.json');


app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/verify', function (req, res) {
  //res.send('POST request to homepage');

// Set the headers
var headers = {
    'Authorization': config.line.accessToken
}

// Configure the request
var options = {
    url: 'https://api.line.me/v1/oauth/verify',
    method: 'GET',
    headers: headers
}

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        res.send(body)
    }
})

});

app.post('/webhook', function (req, res) {
  //res.send('POST request to homepage');
console.log(req.body.events);
console.log(req.body.events[0]);
// Set the headers
var headers = {
    'Content-Type': 'application/json',
    'Authorization': config.line.accessToken
}

// Configure the request
var options = {
    url: 'https://api.line.me/v2/bot/message/reply',
    method: 'POST',
    headers: headers,
    form: {
    "replyToken": req.body.events.replyToken,
    "messages":[
        {
            "type":"text",
            "text":"Hello, user"
        },
        {
            "type":"text",
            "text":"May I help you?"
        }
    ]
}
}

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
})

});

app.listen(process.env.PORT || 8080, () => {
  console.log('Bot app listening on port 8080!')
})