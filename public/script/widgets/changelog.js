divNumber = 0;
appendNumber = 0;

function addElement() {
    const commitDiv = document.createElement("div");
    commitDiv.id = "c" + divNumber;
    const messageContent = document.createElement("p");
    const dateContent = document.createElement("p");
    commitDiv.appendChild(messageContent);
    commitDiv.appendChild(dateContent);
    messageContent.id = "m" + divNumber;
    dateContent.id = "d" + divNumber;
    const currentDiv = document.getElementById("start");
    currentDiv.after(commitDiv);
    divNumber++;
    for (let divNumber = 1; divNumber < 10; divNumber++) {
        cloneElement();
    }
}

function cloneElement() {
    const commitDiv = document.createElement("div");
    commitDiv.id = "c" + divNumber;
    const messageContent = document.createElement("p");
    const dateContent = document.createElement("p");
    commitDiv.appendChild(messageContent);
    commitDiv.appendChild(dateContent);
    messageContent.id = "m" + divNumber;
    dateContent.id = "d" + divNumber;
    const currentDiv = document.getElementById("c" + appendNumber);
    currentDiv.after(commitDiv);
    appendNumber++;
    divNumber++;
    getCommits(0);
}

function getCommits(startDiv) {
    fetch("https://api.github.com/repos/jackpurrin/me/commits?per_page=10")
        .then((res) => res.json())
        .then((res) => {
            for (let startDiv = 0; startDiv < 10; startDiv++) {
                let fetchedMessage = res[startDiv].commit.message;
                let replacedMessage = fetchedMessage.replace("Signed-off-by: ~jack", "");
                document.getElementById("m" + startDiv).innerHTML = replacedMessage;
                let date = res[startDiv].commit.author.date;
                let year = date.slice(0, 4);
                let month = date.slice(5, 7);
                let day = date.slice(8, 10);
                let hour = date.slice(11, 13);
                let min = date.slice(14, 16);
                document.getElementById("d" + startDiv).innerHTML = year + "-" + month + "-" + day + "\n" + hour + ":" + min + "";
            }
        });
}