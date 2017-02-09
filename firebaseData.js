const firebase = require("firebase");
var config = require('./config.json');
var lottoResult;

  //firebase config
  var fbconfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  storageBucket: config.firebase.storageBucket,
  };

  firebase.initializeApp(fbconfig);

  var database = firebase.database();



module.exports = {

read : function (lottoDate) {

  // firebase read database
  var lottoData = firebase.database().ref(`/result/lotto20170201`);
  var lottoResults = lottoData.on('value', function(snapshot) {
  lottoResult = snapshot.val();
  console.log(`Read DB ${lottoDate}`);
  //console.log(lottoResult); 
  return lottoResult;
  });

  return lottoResults;
},

write : function () {
 console.log('Write DB');
}


}








