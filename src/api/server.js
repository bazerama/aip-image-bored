const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');
require('dotenv').config({ path: '/home/svaughan/uni/spr2019/aip/TerribleOceanMissiles/src/.env' });

const API_PORT = 5000;
const app = express();
app.use(cors());
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// takes the secret from process.env.JWT_SECRET
function generateToken(user) {
    var payload = {
        _id: user._id,
    };
    return (token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60, // expires in 1 hour
    }));
}

// MongoDB database
const CONNECTION_URL =
    'mongodb+srv://admin:7s53Z6xx81lbIVsc@terribleoceanmissiles-qpjhz.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = 'users-db';
const COLLECTION_NAME = 'users';

var database, collection;

router.options('/authenticate', cors());
router.post('/authenticate', (req, res) => {
    const user = JSON.parse(req.body.user);
    if (null != user.token) {
        console.log('token: ' + user.token);
        jwt.verify(user.token, process.env.JWT_SECRET, function(err, decoded) {
            if (null != decoded) {
                return res.json({ success: true, user: decoded._id });
            }
        });
    }
    return res.status(403).json({
        success: false,
        error: 'user could not be authenticated',
    });
});

router.options('/login', cors());
router.post('/login', (req, res) => {
    collection.find({ username: req.body.username }).toArray((err, user) => {
        if (err) return res.json({ success: false, error: err });
        if (null != user[0]) {
            //bcrypt.compare(req.body.password, data[0].password, (err, valid) => {
            if (req.body.password == user[0].password) {
                // if (valid) {
                var token = generateToken(user[0]._id);
                return res.json({ success: true, user: user[0]._id, token: token });
            } else {
                return res.status(404).json({
                    success: false,
                    error: 'Username or password is wrong',
                });
            }
        }
        return res.json({ success: false, error: 'no results' });
    });
});

router.post('/register', (req, res) => {
    var hash = bcrypt.hashSync(req.body.password.trim(), 10);

    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isEmailVerified: false,
    });

    collection.find({ username: user.username }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        if (null == data._id) {
            collection.insertOne(user, (err, res) => {
                if (err) return res.json({ success: false, error: err });
                var token = generateToken(user);
                return res.json({ success: true, token: token, user: res });
            });
        }
        return res.json({ success: false, error: 'username already exists' });
    });
});

// router accepts requests to /api only
app.use('/api', router);

// launch backend, listening on port API_PORT
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
