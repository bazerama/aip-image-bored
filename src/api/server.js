const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const Data = require('./data');

const API_PORT = 5000;
const app = express();
app.use(cors());
const router = express.Router();

// MongoDB database
const dbRoute =
  'mongodb+srv://admin:7s53Z6xx81lbIVsc@terribleoceanmissiles-qpjhz.mongodb.net/test?retryWrites=true&w=majority';

// connects to database
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;

// log connection success or failure
db.once('open', () => console.log('Connected to MongoDB cloud database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/hello', (req, res) => {
  res.send({ express: 'Hello from the Express API' });
});

router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post('/pushData', (req, res) => {
  let data = new Data();

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

// append /api for http requests
app.use('/api', router);

// launch backend
app.listen(API_PORT, () => console.log(`API LISTENING ON PORT ${API_PORT}`));