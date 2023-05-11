const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8000;      // Change PORT here
const data = require("./routes/data.js");   // Load js to insert and get data from db
const { Server } = require("ws");

const server = express()
  .use(express.static(path.join(__dirname, "public")))        // Make files in public folder available
  .use(express.static(path.join(__dirname, "public/js"))) // Make files in public js folder available
  .use("/data", data.router)                                         // Use instructions in data.js at url: <your-app-name>.herokuapp.com/data
  .listen(PORT, () => console.log(`Listening on ${PORT}`));   // Start server 

//Creates a new server
const wss = new Server({ server });
require("./simple.js")(wss);