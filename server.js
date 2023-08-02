const express = require('express');
const { MongoClient } = require('mongodb');
const getPartInfo = require('./client');

// Create an Express application
const app = express();
let db;
// MongoDB connection URI
const uri = 'mongodb://mongo:27017/mydatabase';
ObjectId = require('mongodb').ObjectId;

async function dbConnect() {
// Connect to MongoDB
  const client = await MongoClient.connect(uri);
  console.log('Connected to MongoDB');
  db = await client.db('mydatabase');

  // console.log(result);
}

app.use(express.json())

// Define a route handler for the root path
app.get('/cars', (req, res) => {
    db.collection('cars').find().toArray().then((docs) => {
      res.json(docs);
    }).catch(err => {
      console.error('Failed to fetch documents from MongoDB:', err);
      res.status(500).send('Internal Server Error');
    })
});

app.post('/cars', (req, res) => {
  const body = req.body
  console.log(body);
  db.collection('cars').insertOne(body).then((docs) => {
    res.status(201).send({success: true});
  }).catch(err => {
    console.error('Failed to insert car to MongoDB:', err);
    res.status(500).send('Internal Server Error');
  })
});

app.get('/cars/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('cars').find({_id: new ObjectId(req.params.id)}).toArray()
      .then((docs) => {
        res.json(docs);
      }).catch(err => {
        console.error('Failed to fetch documents from MongoDB:', err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    db.collection('cars').find(
      {
        "$or":[
          {VIN: {$regex: req.params.id}},
          {Plate: {$regex: req.params.id}},
        ]
      }
    ).toArray().then((docs) => {
      res.json(docs);
    }).catch(err => {
      console.error('Failed to fetch documents from MongoDB:', err);
      res.status(500).send('Internal Server Error');
    });
  }
});

app.put('/cars/:id', (req, res) => {
  const body = req.body;
  console.log(body);
  
  if (ObjectId.isValid(req.params.id)) {
    db.collection('cars').updateOne({_id: new ObjectId(req.params.id)}, {$set: body})
      .then(() => {
        res.status(200).send({success: true});
      }).catch(err => {
        console.error('Failed to update car in MongoDB:', err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    db.collection('cars').updateOne(
      {
        "$or":[
          {VIN: {$regex: req.params.id}},
          {Plate: {$regex: req.params.id}},
        ]
      },
      {$set: body}
    ).then(() => {
      res.status(200).send({success: true});
    }).catch(err => {
      console.error('Failed to update car in MongoDB:', err);
      res.status(500).send('Internal Server Error');
    });
  }
});

app.delete('/cars/:key', (req, res) => {
  if (ObjectId.isValid(req.params.key)) {
      db.collection('cars').deleteOne({_id: new ObjectId(req.params.key)}).then(() => {
          res.status(200).send({success: true});
      }).catch(err => {
          console.error('Failed to fetch document from MongoDB:', err);
          res.status(500).send('Internal Server Error');
      })
  } else {
      db.collection('cars').deleteOne(
          {
              "$or":[
                  {VIN:{$regex:req.params.key}},
                  {Plate:{$regex:req.params.key}},
              ]
          }).then(() => {
          res.status(200).send({success: true});
      }).catch(err => {
          console.error('Failed to fetch car in MongoDB:', err);
          res.status(500).send('Internal Server Error');
      });
  }
});

app.get('/parts/:partNumber', async (req, res) => {
  try {
    const partNumber = req.params.partNumber;

    // Call the SOAP client to get the part information
    const soapPartInfo = await getPartInfo({partNumber: '1234'});

    // Assuming the SOAP response has "price" and "deliveryDate" properties
    const price = soapPartInfo.price;
    const deliveryDate = soapPartInfo.deliveryDate;
    res.status(200).json({ 
      price: price, 
      deliveryDate: deliveryDate 
    });

  } catch (err) {
    console.error('Failed to fetch part information from the SOAP server:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  dbConnect().then (() => {
    console.log('Server is running on port 3000');
  });
});