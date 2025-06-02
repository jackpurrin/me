window.onload = function() {
  // Make the page visible again
  document.body.style.visibility = "visible";
  document.body.style.opacity = "1";

  // Load SCM Player script
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://www.scmplayer.net/script.js";
  script.setAttribute("data-config", "{'skin':'skins/cyber/skin.css','volume':30,'autoplay':true,'shuffle':false,'repeat':2,'placement':'bottom','showplaylist':false,'playlist':[{'title':'Palace (No bass, Slowed)','url':'https://jackpurrin.me/assets/audio/home.mp3'}]}");
  document.body.appendChild(script);
};
