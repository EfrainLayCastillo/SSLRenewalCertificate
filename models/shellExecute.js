 
const fs = require('fs');
const path = require('path');
const SSH = require('simple-ssh');
const dotenv = require('dotenv');
dotenv.config();
const Key = `${process.env.KEYNAME}`;
const password = `${process.env.PASSWORD}`;// add your password

const pathKey = fs.readFileSync(path.resolve(`./${Key}`)); // ADD YOU KEY HERE ****
const testData = fs.readFileSync(path.resolve('./utils/ssl-btc.sh'));
const nameScript = 'renewalSSL';


const shellExecute = (({publicIP, username, domain})=>{
    
    const ssh = new SSH({
        host: `${publicIP}`,
        user: `${username}`,
        pass: password,
        key: pathKey,
        baseDir: '/tmp'
    });

    console.log("FUNCION EXEC");

    return new Promise((resolve, reject)=>{
       
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
        .exec(`/tmp/${nameScript}.sh ${domain}`, {
            out: function(stdout) {
                console.log(stdout);
            },
            exit: function(code){
                if(code === 1){
                    ssh.exec(`rm /tmp/${nameScript}.sh`);
                    resolve("Success!"); 
                    return false;
                }
            }
        })
        .start();

        ssh.on('error', function(err) {
            console.log('Oops, something went wrong.');
            console.log(err);
            reject(err);
            ssh.end();
        });
    });
});


module.exports = shellExecute;