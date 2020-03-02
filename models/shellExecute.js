
const Client = require('ssh2').Client;
const fs = require('fs');
var path = require('path');


const shellExecute = ({publicIP, username}) =>{
    const conn = new Client;

    conn.on('ready', ()=>{
        console.log("Client :: Ready");
        conn.shell((err, stream)=>{
            if(err) return err;
            stream.on('close', ()=>{
                console.log("Stream :: close")
                conn.end();
            }).on('data', (data)=>{
                console.log("OUTPUT: " + data );
            });
            stream.end('ls -l\nexit\n');
        })
    
    }).connect({
        host: '`${publicIP}`',
        port: 22,
        username: '`${username}`',
        privateKey: fs.readFileSync(path.resolve('./models/***')),
        password: ''
    })
}

module.exports = shellExecute;