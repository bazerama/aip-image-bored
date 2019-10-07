/*
 **  This whole express API was written by me and co-written by me and
 **  my teammate, Jayden Pollard during the Software Development Studio
 **  in Autumn 2019. Although the repository is private, I have received
 **  his permission to use this code, and it is a collaborative work which
 **  we both own licence to under the Copyright Act 1968 - Sect 204.
 */

const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var AWS = require('aws-sdk');
var fs = require('fs');
var fileType = require('file-type');
var multiparty = require('multiparty');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// dotenv plugin fetches config
require('dotenv').config({ path: __dirname + '/../../.env' });

// AWS SDK setup - courtesy of AWS Javascript SDK Example:
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
AWS.config.update({
    region: 'ap-southeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

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
const IMAGES_COLLECTION = 'images';

var database, usersCollection, imagesCollection;

const LOGIN_ERROR_MESSAGE = 'User could not be logged in, please try again';
const LOGIN_USERNAME_ERROR_MESSAGE = "It appears you've entered an incorrect username";
const LOGIN_PASSWORD_ERROR_MESSAGE = "It appears you've entered an incorrect password";
const REGISTER_ERROR_MESSAGE = 'Registration could not be completed, please try again';
const REGISTER_USERNAME_ERROR_MESSAGE = 'Username already exists, please try again';
const AUTHENTICATION_ERROR_MESSAGE = 'User could not be authenticated';
const IMAGE_UPLOAD_ERROR_MESSAGE = 'Image could not be uploaded, please try again';

// takes the secret from process.env.JWT_SECRET
function generateToken(user) {
    var payload = {
        _id: user._id,
    };
    return (token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60, // expires in 1 hour
    }));
}

/*
 **  Nice little snipet for creating image uploads by Fabiano, Medium article + code here:
 **  https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd
 */

async function uploadFile(buffer, name, type) {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.IMAGE_BUCKET_NAME,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`,
    };

    return await s3.upload(params).promise();
}

function newImage(imageId, userId, imageUrl) {
    return {
        root: true,
        imageId: imageId,
        userId: userId,
        imageUrl: imageUrl,
        reactions: [],
        replys: [],
    };
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
    usersCollection.find({ username: req.body.username }).toArray((err, user) => {
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

    usersCollection.find({ username: user.username }, (err, data) => {
        if (err) return res.json({ success: false, error: REGISTER_ERROR_MESSAGE });
        if (data._id == null) {
            usersCollection.find({ email: user.email }, err => {
                if (err) return res.json({ success: false, error: REGISTER_ERROR_MESSAGE });
                if (null == data._id) {
                    usersCollection.insertOne(user, (err, result) => {
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
        } else {
            return res.json({
                success: false,
                error: REGISTER_USERNAME_ERROR_MESSAGE,
            });
        }
    });
});

/*
 **  Nice little snipet for creating image uploads by Fabiano, Medium article + code here:
 **  https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd
 */

router.options('/uploadImage', cors());
router.post('/uploadImage', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
        if (err)
            return res.status(400).json({
                success: false,
                err: err,
            });
        try {
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = fileType(buffer);
            const timestamp = Date.now().toString();
            const originalFilename = files.file[0].originalFilename.replace(' ', '_');
            const fileName = `images/${originalFilename}-${timestamp}-lg`;

            imagesCollection.find({ imageId: fileName }, (err, data) => {
                if (err) return res.json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
                if (null == data._id) {
                    uploadFile(buffer, fileName, type).then(data => {
                        console.log(data);
                        const image = newImage(fileName, fields.userId, data.Location);
                        imagesCollection.insertOne(image, (err, result) => {
                            if (err) return res.json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
                            return res.json({ success: true, image: image, result: result });
                        });
                    });
                } else {
                    return res.json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
                }
            });
        } catch (err) {
            return res.status(400).json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
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
        usersCollection = database.collection(USERS_COLLECTION);
        imagesCollection = database.collection(IMAGES_COLLECTION);
        console.log(`Connected to '${DATABASE_NAME}'!`);
    });
});
