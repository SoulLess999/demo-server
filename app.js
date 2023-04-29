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
// console.log(sa)
const pid = process.env.PROJECT_ID;
// console.log(pid)
const pkid = process.env.PRIVATE_KEY_ID;
// console.log(pkid)
const pk = process.env.PRIVATE_KEY;
// console.log(pk)
const ceml = process.env.CLIENT_EMAIL;
// console.log(ceml);
const cid = process.env.CLIENT_ID;
// console.log(cid)
const aut = process.env.AUTH_URI
// console.log(aut)
const tok = process.env.TOKEN_URI
// console.log(tok)
const prov = process.env.AUTH_PROVIDER;
// console.log(prov)
const cert = process.env.CLIENT_CERT_URL
// console.log(cert)

const serviceAccount = {
    type: "service_account",
    project_id:  "ev-route-planner-2",
    private_key_id:  pkid,
    private_key:  pk.replace(/\\n/g, '\n'),
    // private_key:  pk,
    client_email:  "firebase-adminsdk-pmbya@ev-route-planner-2.iam.gserviceaccount.com" ,
    client_id:  cid,
    auth_uri:  aut ,
    token_uri:  tok,
    auth_provider_x509_cert_url:  prov ,
    client_x509_cert_url:  cert
};

// console.log(serviceAccount)
// console.log(serviceAccount);
const cors = require("cors");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// console.log("initialized app")

const db = admin.firestore();
console.log("connected to db")

app.use(express.json())

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5500",
}))


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