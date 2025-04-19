var LFM_API = "https://ws.audioscrobbler.com/2.0/";
var LFM_KEY = "d204b12d740ddac2b1d0c4ea789e6246";
var LFM_USER = "jackpurrin";

function getNowPlaying() {
  var recentTracksUrl =
    LFM_API+"?method=user.getrecenttracks&user="+LFM_USER+"&api_key="+LFM_KEY+"+&format=json&limit=1";

  if (window.XMLHttpRequest) {
      httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  }
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var response = JSON.parse(httpRequest.responseText);
        console.log(response);
        var currentTrack = response.recenttracks.track[0];

        if (!window.nowPlaying || window.nowPlaying.mbid != currentTrack.mbid) {
          window.nowPlaying = currentTrack;
          renderNowPlaying(currentTrack);
        }
        setTimeout(getNowPlaying, 60*1000);
      } else {
        console.log('There was a problem with the last.fm request.');
      }
    }
  };
  httpRequest.open('GET', recentTracksUrl, true);
  httpRequest.send();
}

var nowPlayingNode = null;

function renderNowPlaying(track) {
  console.log(track);
  if (nowPlayingNode) {
    nowPlayingNode.remove();
  }
  nowPlayingNode = document.createElement("a");
  nowPlayingNode.setAttribute("class", "now-playing");

  var imageurl = track.image.slice(-1)[0]["#text"];
  var nowPlayingImage = document.createElement("img");
  nowPlayingImage.setAttribute("src", imageurl);
  nowPlayingNode.appendChild(nowPlayingImage);

  var currently = track["@attr"] && track["@attr"].nowplaying == "true";

  var metadata = document.createElement("div");
  metadata.setAttribute("class", "np-metadata");
  metadata.innerHTML =
    "<span class=\"np-heading\">" + (currently ? "jackpurrin is listening to" : "awsome song") + "</span>" +
    "<span class=\"np-title\"><strong>"+track.name+"</strong></span>" +
    "<span class=\"np-artist\">"+track.artist["#text"]+"</span>" +
    (currently ?
      "<span class=\"np-date\"><span class=\"breather\">◉</span>  Currently Playing</span>" :
      "<span class=\"np-date\">"+track.date["#text"]+"</span>");
  nowPlayingNode.appendChild(metadata);

  nowPlayingNode.setAttribute("href", track.url);

  document.body.appendChild(nowPlayingNode);

  setTimeout(function() {
    nowPlayingNode.setAttribute("class", "now-playing loaded");
  }, 100);
}