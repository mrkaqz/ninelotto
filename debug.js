const firebase = require("firebase");
var config = require('./config.json');

//firebase config
var fbconfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  storageBucket: config.firebase.storageBucket,
};
firebase.initializeApp(fbconfig);

var database = firebase.database();

// firebase read database
var lottoData = firebase.database().ref('/result/lotto20170201');
lottoData.on('value', function(snapshot) {
   var lottoResutl = snapshot.val();
});