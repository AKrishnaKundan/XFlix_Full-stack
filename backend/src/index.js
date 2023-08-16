const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const MONGODB_URL=process.env.MONGODB_URL;
const BACKEND_PORT=process.env.BACKEND_PORT;

let server;

mongoose.connect(`${MONGODB_URL}`)
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})

app.listen(BACKEND_PORT, ()=>{
    console.log("server started");
})



