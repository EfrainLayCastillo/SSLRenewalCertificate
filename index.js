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
    return stdout;
}

const renewCertificate = async (url)=>{
    const StopServer = await stopServer(url)

        console.log("Listo para actualizar")
        const {stdout,  stderr} = await exec(`sudo lego --tls --email="soporte@bluetideconsulting.com" --domains="${url}" --path="/etc/lego" renew --days 90`)
        console.log(stdout.toString());
        console.log(stderr.toString());
        console.log("Iniciando Servidor")
        const Start = await startServer();
        console.log(Start.toString());
        console.log("Servidor Corriendo")
}

renewCertificate("lacayolaw.com")
        .then((result) => {
            console.info(result)
        }).catch(e =>{
            console.info(e)
        });