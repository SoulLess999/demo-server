require("dotenv").config();

const express = require("express");
const app = express()
const admin = require('firebase-admin');
// const credentials = require("./key.json");

// const serviceAccount = {
//     "type": process.env.SERVICE_ACC,
//     "project_id":  process.env.PROJECT_ID,
//     "private_key_id":  process.env.PRIVATE_KEY_ID ,
//     "private_key":  process.env.PRIVATE_KEY ,
//     "client_email":  process.env.CLIENT_EMAIL ,
//     "client_id":  process.env.CLIENT_ID ,
//     "auth_uri":  process.env.AUTH_URI ,
//     "token_uri":  process.env.TOKEN_URI ,
//     "auth_provider_x509_cert_url":  process.env.AUTH_PROVIDER ,
//     "client_x509_cert_url":  process.env.CLIENT_CERT_URL ,
// };

const sa = process.env.SERVICE_ACC;
console.log(sa)

const serviceAccount = {
    "type": "service_account",
    "project_id":  "ev-route-planner-2",
    "private_key_id":  process.env.PRIVATE_KEY_ID ,
    "private_key":  process.env.PRIVATE_KEY ,
    "client_email":  "firebase-adminsdk-pmbya@ev-route-planner-2.iam.gserviceaccount.com" ,
    "client_id":  process.env.CLIENT_ID ,
    "auth_uri":  process.env.AUTH_URI ,
    "token_uri":  process.env.TOKEN_URI ,
    "auth_provider_x509_cert_url":  process.env.AUTH_PROVIDER ,
    "client_x509_cert_url":  process.env.CLIENT_CERT_URL ,
};

// console.log(serviceAccount);
const cors = require("cors");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(express.json())

const PORT = process.env.PORT || 5000;

// app.use(cors({
//     origin: "http://localhost:5500",
// }))


app.use(express.urlencoded({extended: true}));

app.get("/:id", async (req, res) => {
    try{
        const userRef = db.collection("Stations").doc(req.params.id);
        const response = await userRef.get();
        const wt = response.data().waitingTime;
        
        res.send({"waitingTime": wt});
    }catch(error){
        res.send(error);    
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}.`);
})