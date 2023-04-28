const express = require("express");
const app = express()

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));

app.get("/", (request, response) => {
    response.send({data: "hello world"});
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}.`);
})