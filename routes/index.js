var express = require('express');
var router = express.Router();
var SSLStatus = require('../models/certificate');

const Server = [
  { dns: 'bluetideconsulting.com' },
  { dns: 'dicarina.com' },
];



/* GET home page. */
router.get('/', async function(req, res, next) {
  var json = [];
  for(data of Server){
    responseData = await SSLStatus(data);
    console.log(responseData);
    json.push(responseData);
  }
  res.render('index', { title: 'Express', servers: json });
});

module.exports = router;
