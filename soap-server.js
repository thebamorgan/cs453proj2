const http = require('http');
const soap = require('soap');
const express = require('express');
const bodyParser = require('body-parser');

const myService = {
  PartsService: {
    PartsPort: {
      PartLookup: function (args) {
        // Perform the part lookup logic based on the part number received
        const partNumber = args.partNumber;

        // Hardcoded values to return a price & date for the part
        const price = 99.99;
        const deliveryDate = '2023-08-01';

        // Return the data 
        return {
          price,
          deliveryDate
        };
      },
    },
  },
};


var xml = require('fs').readFileSync('partsservice.wsdl', 'utf8');

//express server example
var app = express();

app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));

app.listen(8000, function(){
  const server = soap.listen(app, '/PartLookup', myService, xml, function(){
    console.log('server initialized');
  });
  server.log = (type, data)  => {
    console.log(`Got something ${type} ${data}`);
  }
});


