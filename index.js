const util = require('util');
const exec =  util.promisify(require("child_process").exec);
const sslChecker = require('ssl-checker');

const SSLStatus = async (hostname) => await sslChecker(hostname, {method: "GET", port: "443"});
const legoVersion = async ()=>{
    const {stdout, stderr} = await exec("lego --version")
    let number
    if(stderr == ''){
        number = stdout.split(" ")[2]
        console.log(stdout);
        number = number.charAt(0);
        if( Number(number) < 2 ){
            console.log("Se necesita actualizar el Lego");
            return true;
        }else{
            return false;
        }
    }

}

const stopServer = async (url) =>{
    return await exec("sudo /opt/bitnami/ctlscript.sh stop")
}

const startServer = async()=>{
    return await exec("sudo /opt/bitnami/ctlscript.sh start")
}

const statusServer = async ()=>{
    return await exec("sudo /opt/bitnami/ctlscript.sh status")
}

const renewCertificate = async (url)=>{
    let Status = await SSLStatus(url)
    const legoV = await legoVersion()
    if(Status.daysRemaining < 30 && legoV != true){
        const responseStopServer = await stopServer(url)
        console.log(responseStopServer.stdout);
        const {stdout,  stderr} = await exec(`sudo lego --tls --email="soporte@bluetideconsulting.com" --domains="${url}" --path="/etc/lego" renew --days 90`)
        if(stderr != '') return stderr.toString()
        console.log(stdout.toString());
        console.log("Iniciando Servidor")
        const  responseStartServer = await startServer();
        console.log(responseStartServer.stdout);
        const responseStatusServer = await statusServer();
        console.log(responseStatusServer.stdout);
    }else{
        return console.log(`${Status} ${legoV}`)
    }
}

renewCertificate("minerpa.com.pa")
        .then((result) => {
            console.log("Servidor Corriendo")
            console.info(result)
        }).catch(e =>{
            console.info(e)
        });