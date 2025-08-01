document.writeln('<div id="statuscafe"><div id="statuscafe-username"></div><div id="statuscafe-content"></div></div>');
fetch("https://status.cafe/users/jackpurrin/status.json")
    .then((r) => r.json())
    .then((r) => {
        if (!r.content.length) {
            document.getElementById("statuscafe-content").innerHTML = "No status yet.";
            return;
        }
        document.getElementById("statuscafe-content").innerHTML = 'status: ' + r.content;
    });