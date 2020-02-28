#!/bin/bash


#utils
currentlegov="3.0.0"
versionLego="3.3.0"

#functions

updatelego() {
       # cd ~/bitnami/tmp/ ;  wget https://github.com/go-acme/lego/releases/download/v${versionLego}/lego_v${versionLego}_linux_amd64.tar.gz
       # tar -xf lego_v${versionLego}_linux_amd64.tar.gz ; rm lego_v${versionLego}_linux_amd64.tar.gz
        if [ -f ~/bitnami/tmp/lego ]; then 
	  echo "Lego Download"
	
        fi
}

moverLego() {
	
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

intversion="${versionlego:7:5}"

if [[ "$intversion" ==  "$currentlegov" ]];
then
 echo "Lego Updated"
else
 echo "you need update lego"
	updatelego
fi