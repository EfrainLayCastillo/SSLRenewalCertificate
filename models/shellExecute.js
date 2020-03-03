 
const fs = require('fs');
const path = require('path');
const SSH = require('simple-ssh');

const pathKey = fs.readFileSync(path.resolve('./models/****')); // ADD YOU KEY HERE ****
const testData = fs.readFileSync(path.resolve('./utils/example.sh'));
const nameScript = 'test';
const password = ''// add your password

const shellExecute = ({publicIP, username}) =>{


    const ssh = new SSH({
        host: `${publicIP}`,
        user: `${username}`,
        pass: password,
        key: pathKey,
        baseDir: '/tmp'
    });
    ssh
    .exec(`cat > ${nameScript}.sh`, {
        in: testData,
        out: function(stdout) {
            console.log(stdout);
        }
    })
    .exec(`chmod +x ${nameScript}.sh`, {
        out: function(stdout) {
            console.log(stdout);
        }
    })
    .exec(`/tmp/${nameScript}.sh`, {
        out: function(stdout) {
            console.log(stdout);
        }
    })
    .exec('ls -las',{
        out: function(stdout) {
            console.log(stdout);
        }
    })
    .start();

    ssh.on('error', function(err) {
        console.log('Oops, something went wrong.');
        console.log(err);
        ssh.end();
    });
}

module.exports = shellExecute;