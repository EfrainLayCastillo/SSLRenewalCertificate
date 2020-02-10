
const util = require('util');
const exec =  util.promisify(require("child_process").exec);
const sslChecker = require('ssl-checker');

const process = require('process');
const argUrl = process.argv[2];
//console.log(argUrl);

//utils
var letsencryptLego = '/opt/bitnami/letsencrypt';
var etcLego = '/etc/lego';

var versionLego = '3.3.0';
var testVersion = '4.3.0';


/* const SSLStatus = async (hostname) => await sslChecker(hostname, {method: "GET", port: "443"}).then(console.info); */


const legoLetsencrypt = async ()=> {
    /*
        ******************* Funciones **********************

        1- Detectar la version de lego & actualizarlo.
        2- descargar lego en tmp
        3- mover lego a opt/bitnami/letsencrypt (ASEGURARSE DE QUE EL URL ESTE EN EL PATH AGREGADO)
        4- Comprobar con lego -v 
    */
   
   var  respLegoVersion = await dectectVersionLego();

    if(respLegoVersion == true){
        console.log('Actualizando lego ...');
        await updateLego();

    }else {
        console.log('Lego updated, preparando renovación');
        await renewLegoCertificate( argUrl);

    }

    console.log("Iniciando Servidor ...")
    const  responseStartServer = await startServer();
    console.log(responseStartServer.stdout);
    const responseStatusServer = await statusServer();
    console.log(responseStatusServer.stdout);
    return "Fin";

}


const updateLego = async() => {
     
    /*
        Funciones
        1- Descargar lego last version. 
        2- Extraer
        3- Mover lego a /opt/bitnami/letsencryopt/ & si existe mv como lego.old
        4- Verficar instalción lego -v
    */    
    await downloadLego();
    
    const responseInstallLego = await installLego();
    if(responseInstallLego.stdout.trim() == 'true'){ 
        console.log('Lego Downloaded');
              
        const responsetarLego = await tarLego();
        if(responsetarLego.stdout.trim() == 'true'){ console.log('Lego decompressed'); }
        
        var respDectectDirLego = await detectDirInstall();
        if(respDectectDirLego == true) { console.log('Lego Exist, moved as lego.old'); }
        
        const responseMoveLego = await moveLego();
        if(responseMoveLego.stdout.trim() == 'true'){ console.log('Lego Installed'); }
        await dectectVersionLego();
      }
    
}

const dectectVersionLego = async() => {
    const {stdout, stderr} = await exec("jekyll -v")
    //const {stdout, stderr} = await exec("sudo lego --version")
    
    console.log(`Version actual ${stdout}`);
    
    let number
    if(stderr == ''){
        number = stdout.split(" ")[1]
    
        console.log(number);
        if( number.trim() != testVersion ){
            console.log("Se necesita actualizar el Lego");
            return true;
        }else{
            console.log('Lego updated, preparando renovación');
            await renewLegoCertificate(argUrl);
            return false;
        }
    }
}


const renewLegoCertificate= async(url) => {

    const responseSearchFile = await searchCertificateFile();

    const {stdout,  stderr} = await exec(`sudo /opt/bitnami/letsencrypt/lego --tls --email="soporte@bluetideconsulting.com" --domains="${url}" --path="${responseSearchFile}" renew --days 90`)
    if(stderr != ''){
        console.log(stderr.toString())
        console.log(stdout.toString())
        return false;
    } 
}

const searchCertificateFile = async() => {

    const {stdout, stderr} = await exec("cat ~/bitnami/opt/bitnami/apache2/conf/server.text")
    let dir_path
    if(stderr == ''){
        dir_path = stdout.split("/")[1]
        console.log(stdout);
        console.log(dir_path);

        if( dir_path.trim() == 'etc' ){
            console.log(`PATH a utilizar ${etcLego}`);
            return etcLego;
        }else if(dir_path.trim() == 'opt'){
            console.log(`PATH a utilizar ${letsencryptLego}`);
            return letsencryptLego;
        }else {

        }
    }
}

const downloadLego = async() => {
    return await exec(`cd /home/michael/bitnami/tmp/ ;  wget https://github.com/go-acme/lego/releases/download/v${versionLego}/lego_v${versionLego}_linux_amd64.tar.gz`)
}

const installLego = async() => {
    return await exec(`cd /home/michael/bitnami/tmp/ ; [ -f lego_v${versionLego}_linux_amd64.tar.gz ] && echo "true"`)
}

const tarLego = async() => {
    return await exec(`cd /home/michael/bitnami/tmp/; tar -xf lego_v3.3.0_linux_amd64.tar.gz ; [ -f /home/michael/bitnami/tmp/lego ] && echo "true" `)
}

const detectDirInstall = async() => {
    const {error, stdout, stderr } = await exec(`cd /home/michael/bitnami/opt/bitnami/letsencrypt/ ;  [ -f /home/michael/bitnami/opt/bitnami/letsencrypt/lego ] && echo "true"`)

        if (error) { console.error(`exec error: ${error}`);  }
        //console.error(`stderr: ${stderr}`);
        
        if(stdout.trim() == 'true') {
            exec(` mv /home/michael/bitnami/opt/bitnami/letsencrypt/lego /home/michael/bitnami/opt/bitnami/letsencrypt/lego.old` );
            return true;
        }else { return false; }

}

const moveLego = async() => {
    return await exec(` mv /home/michael/bitnami/tmp/lego /home/michael/bitnami/opt/bitnami/letsencrypt/lego ; 
                        [ -f /home/michael/bitnami/opt/bitnami/letsencrypt/lego ] && echo "true" ` )
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
    // let Status = await SSLStatus(url)
    const legoV = await legoVersion()
    if(legoV != true){
        const responseStopServer = await stopServer(url);
        console.log(responseStopServer.stdout);
        const {stdout,  stderr} = await exec(`sudo /opt/bitnami/letsencrypt/lego --tls --email="soporte@bluetideconsulting.com" --domains="${url}" --path="/opt/bitnami/letsencrypt" renew --days 90`)
        if(stderr != ''){
            console.log(stderr.toString())
            console.log(stdout.toString())
            return false;
        } 
        console.log(stdout.toString());
        console.log(stdout.toString());
        console.log("Iniciando Servidor")
        const  responseStartServer = await startServer();
        console.log(responseStartServer.stdout);
        const responseStatusServer = await statusServer();
        console.log(responseStatusServer.stdout);
        return "Fin";
    }else{
        return console.log(`${Status} ${legoV}`)
    }
}


legoLetsencrypt().then((result) => {
    
    console.log('servidor corriendo')
        //console.info(result)

}).catch(e => { console.log(e) });