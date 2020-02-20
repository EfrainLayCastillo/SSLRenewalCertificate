const axios = require('axios');
const https = require('https');

const getDaysBetween = (validFrom, validTo) => Math.round(Math.abs(+validFrom - +validTo) / 8.64e7);
const getDaysRemaining = (validTo) => {
    const daysRemaining = getDaysBetween(new Date(), validTo);
    if (new Date(validTo).getTime() < new Date().getTime()) {
      return -daysRemaining;
    }
    return daysRemaining;
};

const handleDomain = async ({dns, port, path}) =>{
    const requestURL = `https://${dns}${port ? ':' + port : ''}${path ? '/' + path : ''}`;
    let promise =  new Promise((resolve, reject) => axios({
        url: requestURL,
        method: 'GET',
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        timeout: 80000,
    }).then(response => {
        const connection = response.request.res.client.ssl;
    
        const { valid_from, valid_to } = connection.getPeerCertificate();
        const validFrom = new Date(valid_from);
        const validTo = new Date(valid_to);
    
        resolve({
          domain: dns,
          daysRemaining: getDaysRemaining(validTo),
          valid: connection.authorized || false,
          validFrom: validFrom.toDateString(),
          validTo: validTo.toDateString(),
        });
      }).catch(err => {
        return resolve({ 
          domain: dns,
          error: err.message
        })
      }))

      let result = await promise

      return result

}
  module.exports = handleDomain;