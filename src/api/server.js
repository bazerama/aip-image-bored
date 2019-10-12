/*
 **  The basic layout of this express API was written by me and co-written
 **  by my teammate, Jayden Pollard, during the Software Development Studio
 **  in Autumn 2019. Although the repository is private, I have received
 **  his express permission to use this code as a basis. By the time this
 **  API is finished, it will likely look quite different.
 */

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
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
// const CONNECTION_URL =
// 'mongodb+srv://admin:7s53Z6xx81lbIVsc@terribleoceanmissiles-qpjhz.mongodb.net/test?retryWrites=true&w=majority';
const CONNECTION_URL = 'mongodb://localhost:27017/';
const USERS_COLLECTION = 'users';
const IMAGES_COLLECTION = 'images';

var database, usersCollection, imagesCollection;

const LOGIN_ERROR_MESSAGE = 'User could not be logged in, please try again';
const LOGIN_USERNAME_ERROR_MESSAGE = "It appears you've entered an incorrect username";
const LOGIN_PASSWORD_ERROR_MESSAGE = "It appears you've entered an incorrect password";
const REGISTER_ERROR_MESSAGE = 'Registration could not be completed, please try again';
const REGISTER_USERNAME_ERROR_MESSAGE = 'Username already exists, please try again';
const AUTHENTICATION_ERROR_MESSAGE = 'User could not be authenticated';
const IMAGE_LOADING_ERROR_MESSAGE = 'Sorry, this image could not be loaded';
const IMAGE_UPLOAD_ERROR_MESSAGE = 'Image could not be uploaded, please try again';
const REACTION_ERROR_MESSAGE = 'Reaction could not be recorded, please try again';

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

function newImage(id, userId, imageUrl, timestamp) {
    return {
        _id: id,
        root: true,
        depth: '1',
        userId: userId,
        imageUrl: imageUrl,
        timestamp: timestamp,
        reactions: {
            reactionOne: 0,
            reactionTwo: 0,
            reactionThree: 0,
            reactionFour: 0,
            reactionFive: 0,
            reactionSix: 0,
        },
        replies: [],
    };
}

function newReply(depth, replyId, userId, imageUrl, timestamp) {
    return {
        root: false,
        depth: depth,
        replyId: replyId,
        userId: userId,
        imageUrl: imageUrl,
        timestamp: timestamp,
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
                    user: decoded.username,
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
    usersCollection.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.json({ success: false, error: LOGIN_ERROR_MESSAGE });
        if (user != null) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var token = generateToken(user.username);
                return res.json({
                    success: true,
                    user: user.username,
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

    usersCollection.find({ username: user.username }).toArray(function(error, dataUsername) {
        if (error) return res.json({ success: false, error: REGISTER_ERROR_MESSAGE });
        if (dataUsername.length === 0) {
            usersCollection.find({ email: user.email }).toArray(function(error, dataEmail) {
                if (error) return res.json({ success: false, error: REGISTER_ERROR_MESSAGE });
                if (dataEmail.length === 0) {
                    usersCollection.insertOne(user, (error, result) => {
                        if (error) return res.json({ success: false, error: REGISTER_ERROR_MESSAGE });
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

router.options('/getThreads', cors());
router.get('/getThreads', (req, res) => {
    imagesCollection.find({ root: true }).toArray(function(error, data) {
        if (error) return res.status(400).json({ success: false, error: IMAGE_LOADING_ERROR_MESSAGE });
        return res.status(200).json(data);
    });
});

router.options('/getReplies', cors());
router.post('/getReplies', (req, res) => {
    var repliesThreads = [];
    req.body.replies.forEach(function(element) {
        imagesCollection.findOne({ _id: element }, (error, data) => {
            if (error) return res.status(400).json({ success: false, error: IMAGE_LOADING_ERROR_MESSAGE });
            repliesThreads.push(data);
        });
    });
    return res.status(200).json(repliesThreads);
});

router.options('/getReactions', cors());
router.post('/getReactions', (req, res) => {
    //
});

router.options('/react', cors());
router.post('/react', (req, res) => {
    var valueModifier;
    var locationId = 'reactions.' + req.body.reactionId;
    if (req.body.mode == 'decrement') {
        valueModifier = -1;
    } else {
        valueModifier = 1;
    }
    imagesCollection
        .findOneAndUpdate({ _id: req.body.postId }, { $inc: { [locationId]: valueModifier } })
        .then(updated => {
            if (updated) {
                return res.json({ success: true, reaction: updated });
            } else {
                return res.json({ success: false, error: REACTION_ERROR_MESSAGE });
            }
        })
        .catch(err => {
            return res.json({ success: false, error: REACTION_ERROR_MESSAGE });
        });
});

/*
 **  Nice little snipet for creating image uploads by Fabiano, Medium article + code here:
 **  https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd
 */

router.options('/uploadImage', cors());
router.post('/uploadImage', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) return res.status(400).json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
        try {
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = fileType(buffer);
            const timestamp = Date.now();
            const originalFilename = files.file[0].originalFilename.replace(' ', '_');
            const fileName = `images/${originalFilename}-${timestamp.toString()}-post`;

            uploadFile(buffer, fileName, type).then(data => {
                const image = newImage(new ObjectId().toString(), fields.userId.toString(), data.Location, timestamp);
                imagesCollection.insertOne(image, (err, result) => {
                    if (err) return res.json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
                    return res.json({ success: true, image: image, result: result });
                });
            });
        } catch (err) {
            return res.status(400).json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
        }
    });
});

/*
 **  Nice little snipet for creating image uploads by Fabiano, Medium article + code here:
 **  https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd
 */

router.options('/uploadReply', cors());
router.post('/uploadReply', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) return res.status(400).json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
        try {
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = fileType(buffer);
            const timestamp = Date.now();
            const originalFilename = files.file[0].originalFilename.replace(' ', '_');
            const fileName = `images/${originalFilename}-${timestamp.toString()}-reply`;

            var parentIdObject = fields.parentId.toString();
            var oldDepth = fields.depth;
            var depth = (parseInt(oldDepth, 10) + 1).toString();
            var queryFront = '',
                queryBack = '',
                query = '',
                selector = '';

            for (var i = 1; i < oldDepth; i++) {
                queryFront += '{ "replies": ';
                queryBack += ' }';
                if (i == oldDepth - 1) {
                    queryFront += '{ "$elemMatch": ';
                    queryBack += ' }';
                }
            }
            // \"root\": \"false\",
            if (oldDepth > 1) {
                selector = '{ "replyId": ';
            } else {
                selector = '{ "_id": ';
            }

            query = queryFront + selector + '"' + parentIdObject + '"' + ' }' + queryBack;
            var projection = '{ "replies": 1 }';

            imagesCollection
                .findOne(JSON.parse(query), JSON.parse(projection))
                .then(parent => {
                    if (parent != null) {
                        uploadFile(buffer, fileName, type).then(data => {
                            var newReplies = parent.replies || [];
                            newReplies.push(
                                newReply(
                                    depth,
                                    new ObjectId().toString(),
                                    fields.userId.toString(),
                                    data.Location,
                                    timestamp
                                )
                            );
                            imagesCollection
                                .findOneAndUpdate(JSON.parse(query), { $set: { replies: newReplies } })
                                .then(updated => {
                                    if (updated) {
                                        return res.json({ success: true, result: updated });
                                    } else {
                                        return res.json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
                                    }
                                })
                                .catch(err => {
                                    return res.json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
                                });
                        });
                    } else {
                        return res.json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
                    }
                })
                .catch(err => {
                    return res.json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
                });
        } catch (err) {
            return res.status(400).json({ success: false, error: IMAGE_UPLOAD_ERROR_MESSAGE });
        }
    });
});

// router accepts requests to /api only
app.use('/api', router);

var options = { useNewUrlParser: true, useUnifiedTopology: true };

// launch backend, listening on port API_PORT
app.listen(API_PORT, () => {
    MongoClient.connect(CONNECTION_URL, options, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db('tom');
        usersCollection = database.collection(USERS_COLLECTION);
        imagesCollection = database.collection(IMAGES_COLLECTION);
        console.log(`Connected to 'tom'!`);
    });
});
