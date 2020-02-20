const axios = require('axios');
const https = require('https');
const domains = [
  { dns: 'facebook.com' },
  { dns: 'asd.com.br' },
]


const getDaysBetween = (validFrom, validTo) => Math.round(Math.abs(+validFrom - +validTo) / 8.64e7);
const getDaysRemaining = (validTo) => {
  const daysRemaining = getDaysBetween(new Date(), validTo);
  if (new Date(validTo).getTime() < new Date().getTime()) {
    return -daysRemaining;
  }
  return daysRemaining;
};

function handleDomain ({ dns, path, port, method }) {

  const requestUrl = 
    'https://' 
    + dns 
    + (port ? ':' + port : '')
    + (path ? '/' + path : '') ;

  return new Promise((resolve, reject) => axios({
    url: requestUrl,
    method: method || 'GET',
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
      validFrom: validFrom.toISOString(),
      validTo: validTo.toISOString(),
    });
  }).catch(err => {
    return resolve({ 
      domain: dns,
      error: err.message
    })
  })
)
}

function handleMultipleDomains(req, res) {
  try {
    const requests = domains.map(handleDomain)
  
    return Promise.all(requests).then((data) => console.log(data))
  } catch (error) {
    return res.json({ error: error.message})
  }
}

handleMultipleDomains()