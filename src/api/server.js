const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const API_PORT = 5000;
const app = express();
app.use(cors());
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB database
const CONNECTION_URL =
    'mongodb+srv://admin:7s53Z6xx81lbIVsc@terribleoceanmissiles-qpjhz.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = 'users-db';
const COLLECTION_NAME = 'users';

var database, collection;

router.get('/hello', (req, res) => {
    res.send({ express: 'Hello from the Express API' });
});

router.post('/login', (req, res) => {
    collection.find({ username: req.body.username }).toArray((err, data) => {
        if (err) return res.json({ success: false, error: err });
        if (data.length > 0) {
            if (data[0].password == req.body.password) {
                return res.json({ success: true, data: data[0] });
            }
        }
        return res.json({ success: false, error: 'no results' });
    });
});

/*
router.get('/getData', (req, res) => {
  collection.findById((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  collection.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  collection.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post('/pushData', (req, res) => {
  let data = new User();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
*/

// append /api for http requests
app.use('/api', router);

// launch backend
app.listen(API_PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_NAME);
        console.log('Connected to `' + DATABASE_NAME + '`!');
    });
});
