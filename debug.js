var msgsJSON = require('./message.json');
//var msgs = JSON.parse(msgsJSON);


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

var rand = getRndInteger(0,msgsJSON.eatword.length);
console.log(msgsJSON.eatword[rand]);

