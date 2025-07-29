document.writeln('<h3 id="playing-indicator">Last Played Track</h3><img id="album-cover" src=""><br /><a href="" id="track-name"></a><p id="artist-name"></p></div>');

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=hackpurrin&api_key=d752a3b13539771e4341dac03444d9a7&limit=1", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            nowPlaying(this);
            trackName(this);
            artistName(this);
            songLink(this);
            albumCover(this);
        }
    };
}

function trackName(xml) {
    xmlDoc = xml.responseXML;
    x = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    document.getElementById("track-name").innerHTML = x;
}

function albumCover(xml) {
    xmlDoc = xml.responseXML;
    x = xmlDoc.getElementsByTagName("image")[3].childNodes[0].nodeValue;
    document.getElementById("album-cover").src = x;
}

function artistName(xml) {
    xmlDoc = xml.responseXML;
    x = xmlDoc.getElementsByTagName("artist")[0].childNodes[0].nodeValue;
    document.getElementById("artist-name").innerHTML = x;
}

function songLink(xml) {
    xmlDoc = xml.responseXML;
    x = xmlDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue;
    document.getElementById("track-name").href = x;
}
function nowPlaying(xml) {
    let xmlDoc = xml.responseXML;
    let xmlString = xmlDoc.getElementsByTagName("track");
    let playing = xmlDoc.evaluate("/lfm/recenttracks/track/@nowplaying", xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue;
    console.log(playing);
    if (playing == "true") {
        document.getElementById("playing-indicator").innerHTML = "Now playing";
    }
}