const express = require("express");
const app = express()
const admin = require('firebase-admin');
const credentials = require("./key.json");
const cors = require("cors");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
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