divNumber = 0
appendNumber = 0

document.body.onload = addElement;
function addElement() {
  const newDiv = document.createElement("div")
  newDiv.id = "d" + divNumber 
  const newContent = document.createTextNode("d" + divNumber)
  newDiv.appendChild(newContent)
  const currentDiv = document.getElementById("start")
  currentDiv.after(newDiv) 
  divNumber++
  for (let divNumber = 1; divNumber < 10; divNumber++) {
    cloneElement()
  }
}

function cloneElement() {
  const newDiv = document.createElement("div")
  newDiv.id = "d" + divNumber 
  const newContent = document.createTextNode("d" + divNumber)
  newDiv.appendChild(newContent)
  const currentDiv = document.getElementById("d" + appendNumber)
  currentDiv.after(newDiv) 
  appendNumber++
  divNumber++
}

/*
fetch("https://api.github.com/repos/jackpurrin/me/commits?per_page=10")
    .then((res) => res.json())
    .then((res) => {
        let fetchedMessage = res[resNum].commit.message;
        let replacedMessage = fetchedMessage.replace("Signed-off-by: ~jack", "");
        document.getElementById("m"+resNum).innerHTML = replacedMessage;
        let date = res[resNum].commit.author.date;
        let year = date.slice(0, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);
        let hour = date.slice(11, 13);
        let min = date.slice(14, 16);
        document.getElementById("d"+resNum).innerHTML = year + "-" + month + "-" + day + "\n" + hour + ":" + min + "";
    });
*/
