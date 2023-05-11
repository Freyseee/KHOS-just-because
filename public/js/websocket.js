// let Socket = new WebSocket("");
let vaegt ="";
let sted = "";
let maengde = "";
let strkd = "";

// Hosts Websocket
const HOST = "wss://khos-just-because.freyseee.repl.co/";
const ws = new WebSocket(HOST);

const ul = document.querySelector("ul");

ws.onmessage = (event) => {
  if(event.data=="refresh"){
  refresh();
  }
  if(event.data.startsWith("declare x: "))
    ws.send(event.data);

   if(event.data.startsWith("updateScale"))
    ws.send(event.data);
}


// To check if Websocket is ready
ws.onopen = (event) => {
  ws.send("hp");
  ws.send("Websocket ready!");
}
           