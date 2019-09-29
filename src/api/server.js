const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// dotenv plugin fetches config - need to make this path relative though...
console.log(__dirname + '/../../.env');
require('dotenv').config({ path: __dirname + '/../../.env' });

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
const USERS_COLLECTION = 'users';

var database, collection;

const LOGIN_ERROR_MESSAGE = 'User could not be logged in, please try again';
const LOGIN_USERNAME_ERROR_MESSAGE = "It appears you've entered an incorrect username";
const LOGIN_PASSWORD_ERROR_MESSAGE = "It appears you've entered an incorrect password";
const REGISTER_ERROR_MESSAGE = 'Registration could not be completed, please try again';
const REGISTER_USERNAME_ERROR_MESSAGE = 'Username already exists, please try again';
const AUTHENTICATION_ERROR_MESSAGE = 'User could not be authenticated';

// takes the secret from process.env.JWT_SECRET
function generateToken(user) {
    var payload = {
        _id: user._id,
    };
    return (token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60, // expires in 1 hour
    }));
}

router.options('/authenticate', cors());
router.post('/authenticate', (req, res) => {
    const user = JSON.parse(req.body.user);
    if (null != user.token) {
        jwt.verify(user.token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    status: 401,
                    error: AUTHENTICATION_ERROR_MESSAGE,
                });
            }
            if (null != decoded) {
                return res.json({
                    success: true,
                    user: decoded._id,
                });
            }
        });
    } else {
        return res.json({
            success: false,
            status: 401,
            error: AUTHENTICATION_ERROR_MESSAGE,
        });
    }
});

router.options('/login', cors());
router.post('/login', (req, res) => {
    collection.find({ username: req.body.username }).toArray((err, user) => {
        if (err) return res.json({ success: false, error: LOGIN_ERROR_MESSAGE });
        if (null != user[0]) {
            if (bcrypt.compareSync(req.body.password, user[0].password)) {
                var token = generateToken(user[0]._id);
                return res.json({
                    success: true,
                    user: user[0]._id,
                    token: token,
                });
            } else {
                return res.json({
                    success: false,
                    status: 401,
                    error: LOGIN_PASSWORD_ERROR_MESSAGE,
                });
            }
        } else {
            return res.json({
                success: false,
                status: 401,
                error: LOGIN_USERNAME_ERROR_MESSAGE,
            });
        }
    });
});

router.options('/register', cors());
router.post('/register', (req, res) => {
    var hash = bcrypt.hashSync(req.body.password, saltRounds);

    var user = {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        isEmailVerified: false,
    };

    collection.find({ username: user.username }, (err, data) => {
        if (err) return res.json({ success: false, error: REGISTER_ERROR_MESSAGE });
        if (null == data._id) {
            collection.insertOne(user, (err, result) => {
                if (err) return res.json({ success: false, error: REGISTER_ERROR_MESSAGE });
                var token = generateToken(result.insertedId);
                return res.json({
                    success: true,
                    token: token,
                    userid: result.insertedId,
                });
            });
        } else {
            return res.json({
                success: false,
                error: REGISTER_USERNAME_ERROR_MESSAGE,
            });
        }
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
        collection = database.collection(USERS_COLLECTION);
        console.log(`Connected to '${DATABASE_NAME}'! Using '${USERS_COLLECTION}' collection.`);
    });
});
