const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('example.sqlite'));
//makes a table for Data inputs.
let comando = `CREATE TABLE items (
	id INTEGER PRIMARY KEY,
	vare REAL NOT NULL,
  barcode REAL NOT NULL,
 	holdbarhed REAL NOT NULL,
  antal REAL NOT NULL,
  lokation REAL NOT NULL,
  weight REAL NOT NULL
);`
// Execute SQL commands
db.exec(comando);
//db.exec("insert into sensor (vare,holdbarhed) values(0,0)");
const results = db.prepare("SELECT * from items").all();
console.log(results);
