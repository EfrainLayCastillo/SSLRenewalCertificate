#!/bin/bash


#utils
currentlegov="4.0.0"
versionLego="3.3.0"

pathLet="/opt/bitnami/letsencrypt"
pathEct="/etc/lego"

email="soporte@bluetideconsulting.com"

#functions

downloadlego() {
    # cd /tmp/ ; wget  https://github.com/go-acme/lego/releases/download/v${versionLego}/lego_v${versionLego}_linux_amd64.tar.gz ; tar -xf lego_v${versionLego}_linux_amd64.tar.gz ; rm lego_v${versionLego}_linux_amd64.tar.gz ; cd
	if [ -f /tmp/lego ]; then 
		echo "Lego Download"
	fi
}

installLego() {
	
	if [ -f ~/bitnami/opt/bitnami/letsencrypt/lego ]; then 
        echo "Lego exists old version"
		mv ~/bitnami/opt/bitnami/letsencrypt/lego ~/bitnami/opt/bitnami/letsencrypt/lego.old ; mv ~/bitnami/tmp/lego ~/bitnami/opt/bitnami/letsencrypt/lego
		echo "Lego installed"
	else
		mkdir -p /opt/bitnami/letsencrypt ; mv ~/bitnami/tmp/lego ~/bitnami/opt/bitnami/letsencrypt/lego
		echo "Lego installed"
	fi
}

checkLego() {
	
	if [ -f ~/bitnami/opt/bitnami/letsencrypt/lego ]; then 
        echo "Lego New Version"
		sudo  ~/bitnami/opt/bitnami/letsencrypt/lego -version
	fi
}

getDirServer() {
	
	dir="$(readlink /opt/bitnami/apache2/conf/server.crt)"
	echo $dir
	
	if [[ $dir == *"$pathEct"* ]]; then
 		echo "ETC LEGO"
		return pathEct;
	elif [[ $dir == *"$pathLet"* ]]; then
 		echo "Letsencrypt"
		 return pathLet
	else 
		echo "No encontrado"
		return "error"
	fi	
	
}

stopServer() {
	
	 if [ -f ~/bitnami/opt/bitnami/letsencrypt/lego ]; then 
          	echo "Lego exists old version"
		mv ~/bitnami/opt/bitnami/letsencrypt/lego ~/bitnami/opt/bitnami/letsencrypt/lego.old ; mv ~/bitnami/tmp/lego ~/bitnami/opt/bitnami/letsencrypt/lego 
	fi
}

startServer() {
	
	 if [ -f ~/bitnami/opt/bitnami/letsencrypt/lego ]; then 
          	echo "Lego exists old version"
		mv ~/bitnami/opt/bitnami/letsencrypt/lego ~/bitnami/opt/bitnami/letsencrypt/lego.old ; mv ~/bitnami/tmp/lego ~/bitnami/opt/bitnami/letsencrypt/lego 
	fi
}


renewSSL() {
	
	 if [ -f ~/bitnami/opt/bitnami/letsencrypt/lego ]; then 
          	echo "Lego exists old version"
		mv ~/bitnami/opt/bitnami/letsencrypt/lego ~/bitnami/opt/bitnami/letsencrypt/lego.old ; mv ~/bitnami/tmp/lego ~/bitnami/opt/bitnami/letsencrypt/lego 
	fi
}

removeTrash() {
	
	 if [ -f ~/bitnami/opt/bitnami/letsencrypt/lego ]; then 
          	echo "Lego exists old version"
		mv ~/bitnami/opt/bitnami/letsencrypt/lego ~/bitnami/opt/bitnami/letsencrypt/lego.old ; mv ~/bitnami/tmp/lego ~/bitnami/opt/bitnami/letsencrypt/lego 
	fi
}


#end functions


#get lego version

echo  "******* LEGO VERSION  **********"

versionlego="$(jekyll -v)"
echo $versionlego

#intversion="${versionlego:7:5}"


if [[ $versionlego == *"$currentlegov"* ]]; then
 	echo "Lego Updated"
else
 	echo "you need update lego"
	#downloadlego
	#installLego
	#checkLego
	#getDirServer
	pathselet=$?
	if [[ $versionlego == "error" ]]; then
		echo "error";
	else
		echo $pathselet
fi



#bitnami@ip-172-31-32-43:~$ whereis lego
#lego: /etc/lego /usr/local/bin/lego