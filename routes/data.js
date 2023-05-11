// This script contains code related to inserting, displaying and removing data from the database.
const express = require("express");
const router = express.Router();
const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.resolve("example.sqlite"));
let input = "";
let name = "";
let exp;
let bar = "";
let antal = "";
let kasse = "";
let weight = "";
const info = require("../info.js");


function query(sql, params = []) {
    return db.prepare(sql).all(params);
}

// DEFINITION TO GET DATA
router.get("/display", async (req, res) => {
    try {
        // Send query to database
        const results = query("SELECT * FROM items");

        // Handle results
        res.send({ results: results });

        // Handle errors
    } catch (error) {
        console.error(error);
        res.send("Error " + error);
    }
});


// Inserts data into database. This function is called in Simple.js when the server has recieved all relevant variables.
function upload(input, antal, kasse, weight) {
    console.log("hej");

    if (info[input]) {
        exp = info[input].exp;
        name = info[input].Name;
        bar = input;

        try {
            // Send query to database
            db.prepare("INSERT INTO items (vare, barcode, holdbarhed, antal, lokation, weight) values(?,?,?,?,?,?)").run([name, bar, exp, antal, kasse, weight]);


            // Handle errors
        } catch (error) {
            console.error(error);
        }
    }
    else {
        console.log("Der er sket en fejl. Prøv igen.")
    }
  
}

//REMOVE DATASET FROM DATABASE 
router.get("/remove", async (req, res) => {
    try {

      const thisID = req.query.thisID;
      
      console.log(thisID);
                 
      if(thisID){
       db.prepare("DELETE FROM items WHERE id = ?").run([thisID]);
       console.log("Vare fjernet fra listen");
       
      }
      else{
        console.log("This ID does not exist");
      }      

        // Handle errors
    } catch (error) {
        console.error(error);
        res.send("Error " + error);
    }
});

function updateWeight(newName, newWeight){
db.prepare("UPDATE items SET weight = ? WHERE lokation = ?").run([newWeight, newName]);
  
}

function newDay(){
  const results = query("SELECT * FROM items");
      for(let y =0; y< results.length; y++){
       let newHolb = results[y].holdbarhed - 1;
        
        if(parseInt(results[y].holdbarhed,10)>0){
        db.prepare("UPDATE items SET holdbarhed = ? WHERE id = ?").run([newHolb, results[y].id]);
        }
          else{
            db.prepare("UPDATE items SET holdbarhed = ? WHERE id = ?").run(["Expired", results[y].id]);
          }
        
}
}


module.exports = { router, upload, updateWeight, newDay };



