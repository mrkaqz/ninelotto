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
  res.send('Bot Started');

console.log(req.body.events);
console.log(req.body.events[0].message.text);

// Set the headers
var postHeaders = {
    'Content-Type': 'application/json',
    'Authorization': config.line.accessToken
}

// Configure the request
var postOptions = {
    url: 'https://api.line.me/v2/bot/message/reply',
    method: 'POST',
    headers: postHeaders,
    body: {
    'replyToken': req.body.events[0].replyToken,
    'messages':[
        {
            'type':'text',
            'text':'Hello, user'
        }
    ]
    }
}

/* Start the request
request(postOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
})
*/
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Bot app listening on port 8080!')
})