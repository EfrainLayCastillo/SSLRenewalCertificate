#!/bin/bash


#utils
currentlegov="4.0.0"
versionLego="3.3.0"

path_let="/opt/bitnami/letsencrypt"
path_ect="/etc/lego"

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

checkLego() {
	
	if [ -f /opt/bitnami/letsencrypt/lego ]; then 
        echo "Lego New Version"
		sudo  /opt/bitnami/letsencrypt/lego -version
	fi
}

getDirServer() {
	
	dir="$(readlink /opt/bitnami/apache2/conf/server.crt)"
	echo $dir
	
	if [[ $dir == *"$path_ect"* ]]; then
 		echo "Selected {$path_etc}"
		PATH_SELECTED=$path_ect
	elif [[ $dir == *"$path_let"* ]]; then
 		echo "Selected {$path_let}"
		PATH_SELECTED=$path_let
	else 
		echo "No encontrado"
		PATH_SELECT="error"
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

version_present="$(lego -v)"
echo $version_present

#intversion="${versionlego:7:5}"


if [[ $versionlego == *"$version_present"* ]]; then
 	echo "Lego Updated"
else
 	echo "you need update lego"
	#downloadlego
	#installLego
	#checkLego
	#getDirServer
	#pathselet=$?
	#if [[ $PATH_SELECTED == "error" ]]; then
	#	echo "error";
	#else
	#	echo $PATH_SELECTED
fi



#bitnami@ip-172-31-32-43:~$ whereis lego
#lego: /etc/lego /usr/local/bin/lego