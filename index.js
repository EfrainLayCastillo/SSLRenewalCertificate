const util = require('util');
const exec =  util.promisify(require("child_process").exec);
const sslChecker = require('ssl-checker');

const SSLStatus = async (hostname) => await sslChecker(hostname, {method: "GET", port: "443"});

const stopServer = async (url) =>{
    const Status = await SSLStatus(url)
    if(Status.daysRemaining >= 30) return Status

    const {stdout, stderr} = await exec("sudo /opt/bitnami/ctlscript.sh stop")
    if(stderr) return console.log(stderr)

    console.log(stdout)
    console.log(stderr)
    return true;
}

const startServer = async()=>{
    const {stdout, stderr} = await exec("sudo /opt/bitnami/ctlscript.sh start")
    return true
}

const renewCertificate = async (url)=>{
    const StopServer = await stopServer(url)
    if(StopServer){
        console.log("Listo para actualizar")
        const {stdout,  stderr} = await exec(`sudo /opt/bitnami/letsencrypt/lego -tls --email="soporte@bluetideconsulting.com" --domains="${url}" --path="/opt/bitnami/letsencrypt"`)
        const startServer = await startServer();
    }
    if(startServer){
        return "Renewed"
    }
}

renewCertificate("bluetideconsulting.com")
        .then((result) => {
            console.log("4")
            console.info(result)
        }).catch(e =>{
            console.info(e)
        });