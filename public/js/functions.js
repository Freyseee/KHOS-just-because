
function start() {
    window.location.href = "/html/data_overview.html";
}

function createRow(id, vare, barcode, holdbarhed, antal, lokation, weight) {
    // Find a <table> element with id="myTable":
    var table = document.getElementById("table");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = cells.insertRow(table.length);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);

    // Add some text to the new cells:
    cell0.innerHTML = id;
    cell1.innerHTML = vare;
    cell2.innerHTML = barcode;
    cell3.innerHTML = holdbarhed;
    cell4.innerHTML = antal;
    cell5.innerHTML = lokation;
    cell6.innerHTML = weight;
}

function fetcher() {
    fetch("/data/display")
        .then((response) => response.json())
        .then((data) => {
            var table = document.getElementById("table");
            var cells = document.getElementById("cells");
            cells.innerHTML = "";
            for (i = 0; i < data.results.length; i++) {
                let row = data.results[i];
                createRow(row.id, row.vare, row.barcode, row.holdbarhed, row.antal, row.lokation, row.weight);
            }
        });
}

function refresh() {
    location.reload();
}

if (document.getElementById("table"))
    window.onload = fetcher();


function cancel() {
    location.reload();
}