//This script contains functions and code regarding the use of popups
let numbers = [];
let stregkode = "";
let okButton;
let cancelButton;
let index;

//Hold øje med om der bliver scannet en vare
document.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        //Hvis der er en hel stregkode
        if (numbers[12]) {

            //Laver array til string uden kommaer
            stregkode = numbers.toString();
            numbers = [];
            stregkode = stregkode.replaceAll(",", "");

            // Send stregkode til Server
            ws.send("declare barcode: " + stregkode);
            //Pop-up vindue

            document.getElementById("uploader").style.display = 'flex';

            // Brugeren indtaster herefter antal varer og hvilken kasse som varen ligger i
        }
        return;
    }
    //Lav et array med tegnene i barcoden
    numbers.push(event.key);

}, false);

// Used for data upload
function continueUpload() {
    let antal = document.getElementById("inputAntal").value;
    let kasse = document.getElementById("inputLokation").value;

    ws.send("declare antal: " + antal);
    ws.send("find weight: " + kasse);

    numbers = [];
    document.getElementById("inputAntal").value = "";
    document.getElementById("inputLokation").value = "";
    document.getElementById("uploader").style.display = 'none';

}

//Removes row from database items
function removeDataset() {
  //ID from popup window recieved (div with id="remover")
    let thisID = document.getElementById("inputID").value;
    console.log(thisID);
  
    //Fetches remove in data.js to finish removal (doesn't work either) 
    fetch(`../data/remove?thisID=${thisID}`)

  //closes popup window
    document.getElementById('remover').style.display = 'none';
    refresh();
}


//Shows popup window for choosing which id to remove
function showPopup() {
    document.getElementById('remover').style.display = 'flex';
}