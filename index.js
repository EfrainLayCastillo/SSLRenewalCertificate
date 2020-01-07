const util = require('util');
const exec =  util.promisify(require("child_process").exec);
const sslChecker = require('ssl-checker');

const SSLStatus = async (hostname) => await sslChecker(hostname, {method: "GET", port: "443"});

const stopServer = async (url) =>{
    const Status = await SSLStatus(url)
    console.log("1")
    if(Status.daysRemaining >= 10) return Status
    console.log("2")
    const {stdout, stderr} = await exec("sudo /opt/bitnami/ctlscript.sh stop")
    
    console.log(stdout)

    return true;
}

const renewCertificate = async (url)=>{
    const StopServer = await stopServer(url)
    console.log("3")
    if(StopServer){
        console.log("Listo para actualizar esta xhaxhu")
        return true;
    }
}

renewCertificate("olgasinclair.org")
        .then((result) => {
            console.log("4")
            console.info(result)
        }).catch(e =>{
            console.info(e)
        });