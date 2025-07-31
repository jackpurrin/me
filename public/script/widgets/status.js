document.writeln('<div id="statuscafe"><div id="statuscafe-username"></div><div id="statuscafe-content"></div></div>');
fetch("https://status.cafe/users/jackpurrin/status.json")
    .then((r) => r.json())
    .then((r) => {
        if (!r.content.length) {
            document.getElementById("statuscafe-content").innerHTML = "No status yet.";
            return;
        }
        document.getElementById("statuscafe-username").innerHTML = '<a class="name" href="https://status.cafe/users/jackpurrin" target="_blank">' + r.timeAgo + "</a> ";
        document.getElementById("statuscafe-content").innerHTML =  r.face + " " + r.content;
    });