var admin = require("firebase-admin");

var serviceAccount = require("../config/firebaseServiceAccountKey.json");

const firebaseConfig = {
  apiKey: "AIzaSyB1xNG_WCJLUAY5oXZZ-0xNmNKw-CbsBG4",
  authDomain: "uyfcmsr.firebaseapp.com",
  projectId: "uyfcmsr",
  storageBucket: "uyfcmsr.appspot.com",
  messagingSenderId: "1088693200746",
  appId: "1:1088693200746:web:a6e65306d85833eb52e713",
  measurementId: "G-TF2HCRMGRC",
  credential: admin.credential.cert(serviceAccount)
};


const app = admin.initializeApp(firebaseConfig);
const auth = admin.auth()
module.exports = {
  auth
} 
