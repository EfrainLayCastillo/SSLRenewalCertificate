const express = require('express');
const router = express.Router();
const SSLStatus = require('../models/certificate');
// Files utils
const projects = require('../utils/projects.json');

/* GET home page. */
router.route("/")
      .get(async(req, res, next)=>{
        const json = [];
        for(data of projects){
          responseData = await SSLStatus(data);
          console.log(responseData);
          json.push(responseData);
        }
        res.render('index', {servers: json});
      })
      .post(async(req, res, next)=>{
        res.status(200).send({servers:json});
      })

module.exports = router;
