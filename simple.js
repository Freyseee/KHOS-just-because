//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { upload } = require("./routes/data.js");
const { newDay } = require("./routes/data.js");
const { updateWeight } = require("./routes/data.js");

upload();
const express = require("express");
const router = express.Router();
let count = 0;
let mc = [];
let homepage = [];
let names = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
let givenNames = [];
let mcName = "";
let nameConfirmed = "";
let location = "";
let index;
let weight;
let barcode;
let antal;
let newIndex;
let x = 0;


function websocket(wss) {
    wss.on("connection", (ws) => {
        console.log("Client connected");

        // Recieve messages and add clients to array
        ws.on("message", function (message, isBinary) {
            message = isBinary ? message : message.toString();
            console.log(message);
            if (message == "mc") {
                mc.push(ws);

                // Giv et navn til micro controller
                for (let i = 0; i < names.length; i++) {
                    if (givenNames.indexOf(names[i]) > -1) {
                    }

                    else {
                        mcName = names[i];
                        ws.send("name " + mcName);
                        break;
                    }
                }

                homepage.forEach(async (client) => {
                    await client.send(message);
                });
            }

            if (message == "hp") {
                homepage.push(ws);
            }

            if (message.startsWith("name ")) {
                mc[mc.length - 1].send(message);
            }

            //respons til at modtage vægt fra 
            if (message.startsWith("weight")) {
                mc[index].send("stop");
                console.log("Stop sendt");
                weight = message.replace("weight ", "");
              
                upload(barcode, antal, location, weight);
              
							  homepage.forEach(async (client) => {
                  await client.send("refresh");
                  console.log("helloooo");
                
            });
            }

            if (message.startsWith("navn ")) {
                nameConfirmed = message.replace("navn ", "");
                givenNames.push(nameConfirmed);
                console.log(givenNames);
            }

            if (message.startsWith("find weight: ")) {
                location = message.replace("find weight: ", "");
                index = givenNames.indexOf(location);
                console.log(index);
                if (mc[index]) {
                    mc[index].send("scale");
                }
                else {
                    upload(barcode, antal, location, "Unavailable");
                    homepage.forEach(async (client) => {
                      await client.send("refresh");
                
                   });
                }
            }

            if (message.startsWith("declare barcode: ")) {
                barcode = message.replace("declare barcode: ", "");
            }

            if (message.startsWith("declare antal: ")) {
                antal = message.replace("declare antal: ", "");
            }

            if (message.startsWith("new weight ")) {
              let newWeight = message.replace("new weight ", "");
              updateWeight(givenNames[x], newWeight);
            }

        if (message.startsWith("updateScale")) {

          console.log("ey");
          if(x<givenNames.length)
          mc[x].send("new scale");
          x++;
          if(x<givenNames.length)
          setTimeout(go, 10000);
          
          else{
          x = 0;
          }
        }
          

        });

        //Inform about clients disconnecting
        ws.on("close", () => console.log("Client disconnected"));
    });
}

function go(){
  homepage.forEach(async (client) => { 
  await client.send("updateScale");
  });
}

setInterval(go, 30000); 

setInterval(newDay, 120000); //1 døgn = 2 min


module.exports = websocket;