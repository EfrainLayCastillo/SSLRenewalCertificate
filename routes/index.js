const express = require('express');
const router = express.Router();
const SSLStatus = require('../models/certificate');
const shellExecute = require('../models/shellExecute');
// Files utils
const projects = require('../utils/projects.json');

/* GET home page. */
router.route("/")
      .get(async(req, res, next)=>{
        const json = [];
        for(data of projects){
          responseData = await SSLStatus(data);
          json.push(responseData);
        }
        res.render('index', {servers: json});
      })
      .post((req, res, next)=>{
        let objectReq = req.body;
        shellExecute(objectReq);
        res.status(200).send("sweet");
      })

module.exports = router;
