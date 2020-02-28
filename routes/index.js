const express = require('express');
const router = express.Router();
const SSLStatus = require('../models/certificate');
// Files utils
const projects = require('../utils/projects.json');

const Server = projects;


/* GET home page. */
router.route("/")
      .get((req, res, next)=>{
        const json = res.locals.listing
        res.render('index');
      })
      .post(async(req, res, next)=>{
        var json = [];
        for(data of Server){
          responseData = await SSLStatus(data);
          console.log(responseData);
          json.push(responseData);
        }
        res.status(200).send({servers:json});
      })

router.route("/ssl")
      .get( async(req, res, next)=>{
        
      });

module.exports = router;
