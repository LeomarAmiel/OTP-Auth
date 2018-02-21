const admin = require("firebase-admin");
const functions = require('firebase-functions');
const serviceAccount = require('./serviceAccount.json');
const createUser = require('./create_user');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-6e922.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);