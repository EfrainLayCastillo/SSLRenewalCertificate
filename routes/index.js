const express = require('express');
const router = express.Router();
const SSLStatus = require('../models/certificate');
// Files utils
const projects = require('../utils/projects.json');

const Server = projects;



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
