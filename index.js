var jsonResult;

function setRootHtml(res) {
    jsonResult = JSON.parse(res);
    document.getElementById("root").innerHTML = jsonResult[0].name;
}

function getSource(callback) {
    const http = new XMLHttpRequest();
    const url = "http://localhost:3000/pokedex";

    http.open("GET", url);
    http.send();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("connected to localhost");
            callback(http.responseText);
        }
    }
}