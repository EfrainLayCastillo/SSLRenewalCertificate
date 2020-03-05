#!/bin/bash


#utils
currentlegov="4.0.0"
versionLego="3.3.0"

path_let="/opt/bitnami/letsencrypt"
path_ect="/etc/lego"
domain=$1
email="soporte@bluetideconsulting.com"

#functions

downloadlego() {
     cd /tmp/ ; wget  https://github.com/go-acme/lego/releases/download/v${versionLego}/lego_v${versionLego}_linux_amd64.tar.gz ; tar -xf lego_v${versionLego}_linux_amd64.tar.gz ; rm lego_v${versionLego}_linux_amd64.tar.gz ; cd
	if [ -f /tmp/lego ]; then 
		echo "Lego Download"
	fi
}

installLego() {
	
	if [ -f /opt/bitnami/letsencrypt/lego ]; then 
        echo "Lego exists old version"
		sudo mv /opt/bitnami/letsencrypt/lego /opt/bitnami/letsencrypt/lego.old ; sudo mv /tmp/lego /opt/bitnami/letsencrypt/lego; sudo rm -rf /opt/bitnami/letsencrypt/lego.old
		echo "Lego installed, moved, old version deleted"
	elif [ -d /opt/bitnami/letsencrypt ]; then 
		sudo mv /tmp/lego /opt/bitnami/letsencrypt/lego
		echo "Lego installed & moved"
	else
		sudo mkdir -p /opt/bitnami/letsencrypt ; sudo mv /tmp/lego /opt/bitnami/letsencrypt/lego
		echo "Lego installed"
	fi
}

updatePath(){
	 
	legopath="$(which lego)"
	if [[ $legopath != *"$path_let"* ]]; then
    	echo "Update PATH Lego"
    	echo "export PATH=$PATH:/opt/bitnami/letsencrypt/" >> ~/.bashrc
    	sudo rm /usr/local/bin/lego
    	source .bashrc
    	which lego
		echo "UPDATE PATH"
	else 
		echo "LEGO PATH EXISTS ..."
	if

    echo "NEW VERSION LEGO"
	lego -v

}

checkLego() {
	
	if [ -f /opt/bitnami/letsencrypt/lego ]; then 
        echo "Lego exists in $path_let"
		updatePath
	fi
}

getDirServer() {
	
	dir="$(readlink /opt/bitnami/apache2/conf/server.crt)"
	echo $dir
	
	if [[ $dir == *"$path_ect"* ]]; then
 		echo "Selected -------------> $path_etc"
		PATH_SELECTED=$path_ect
		RENEWSTATE=true
	elif [[ $dir == *"$path_let"* ]]; then
 		echo "Selected -------------> $path_let"
		PATH_SELECTED=$path_let
		RENEWSTATE=true
	else 
		echo "No encontrado"
		PATH_SELECT="error"
		RENEWSTATE=false
	fi	
	
}

stopServer() {
	
	if [ $RENEWSTATE ]; then 
        echo "Preparando servidor ..."
		#sudo /opt/bitnami/ctlscript.sh stop
		sleep 10
		echo "Servidor STOP"
	else 
		echo "Error, Stop script, state: $RENEWSTATE"
		return .
	fi
}

renewSSL() {
	
	if [ $RENEWSTATE ]; then 
        echo "Renew SSL ..."
		echo "Domain: $domain /n email: $email /n PATH: $PATH_SELECTED"
		#sudo /opt/bitnami/letsencrypt/lego --tls --email="$email" --domains="$domain" --path="$PATH_SELECTED" renew --days 90
		sleep 5
		echo "*****************************************************"
		echo " <<<<<<<<<<<<<< SSL UPDATE >>>>>>>>>>>>>>"
		echo "*****************************************************"
	fi
}

startServer() {
	
	if [ $RENEWSTATE ]; then 
        echo "Iniciando servidor ..."
		#sudo /opt/bitnami/ctlscript.sh start
		sleep 10
		echo "Servidor START"
	else 
		echo "Error, Stop script, state: $RENEWSTATE"
		return .
	fi
}

checkerCertificate(){
	echo | openssl s_client -connect $domain:443 2>/dev/null | openssl x509 -noout -dates
}

#end functions


# --------------------------- MAIN SCRIPT ---------------------------

echo  "******* LEGO VERSION  **********"
echo  "******* DOMAIN : $domain  **********"

version_present="$(lego -v)"
echo $version_present

#intversion="${versionlego:7:5}"

if [[ -z "$domain" ]]; then
	echo "Need add your domain"
	return .
fi

if [[ $versionlego != *"$version_present"* ]]; then
 	echo "you need update lego"
	#downloadlego
	#installLego
	#checkLego
fi

echo "Lego Updated"
echo "Prepando Update ..."
getDirServer
if [[ $PATH_SELECTED == "error" ]]; then
	echo "error in $PATH_SELECTED";
else
	stopServer
	wait $!
	echo "Servidor Listo para renew..."
	renewSSL
	wait $!
	startServer

fi