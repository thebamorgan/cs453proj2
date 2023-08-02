const soap = require('soap');
const url = 'http://soapapp:8000/PartLookup?wsdl';

function getPart(xml) {
  return new Promise ((resolve, reject) => {
    soap.createClient(url, function (err, client) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(client.describe());
      client.PartsService.PartsPort.PartLookup(xml, function(err, result, rawResponse, soapHeader, rawRequest) {
        console.log('SOAP: ', result);
        return resolve(result)
      })
    });
  });
}

const getPartInfo = async(partNumber) => {
    try {
        console.log(partNumber);
        const info = await getPart(partNumber);
        return info;
    } catch (error) {
        return error;
    }
}

module.exports = getPartInfo;
