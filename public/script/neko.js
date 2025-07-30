// === ONIONRING-WIDGET ===
//this file contains the code which builds the widget shown on each page in the ring. ctrl+f 'EDIT THIS' if you're looking to change the actual html of the widget

// find the element, this is required in ie11 because currentScript doesnt exist on it
var currentScript = document.querySelector('script[data-nekowebring-widget]')
if (currentScript === null) currentScript = document.currentScript

function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

var tag = document.getElementById(ringID); //find the widget on the page

var thisSite = window.location.href; //get the url of the site we're currently on
var thisIndex = null;
var widgetColor = ""; // blank so the image isn't changed if no color

// go through the site list to see if this site is on it and find its position
for (var i = 0; i < sites.length; i++) {
  if (thisSite.indexOf(getSafe(function() { return sites[i][0]; }, '')) === 0) {
    //we use indexOf so this will match any subdirectory, users can put the widget on multiple pages
    thisIndex = i;
    break; //when we've found the site, we don't need to search any more, so stop the loop
  }
}
// go through the extras list to see if this site is on it, and find what website is it an extra for
for (var i = 0; i < extras.length; i++) {
  if (thisSite.indexOf(extras[i][0]) === 0) {
    for (var s = 0; s < sites.length; s++) {
      if (sites[s][0] === extras[i][1]) {
        thisIndex = s;
        break;
      }
    }
  }
  break;
}

function randomSite() {
  var otherSites = sites.slice(); //create a copy of the sites list
  otherSites.splice(thisIndex, 1); //remove the current site so we don't just land on it again
  var randomIndex = Math.floor(Math.random() * otherSites.length);
  location.href = otherSites[randomIndex][0];
}

// check if there's a color attribute in the first place, then set it to the proper color
if (currentScript.getAttribute("color")) {
  for (var i = 0; i < colors.length; i++) {
    if (currentScript.getAttribute("color") == colors[i]) {
      widgetColor = "-" + colors[i];
      break;
    } else if (colors[i] == colors[colors.length - 1]) {
      console.error(
        'nekowebring: ' + currentScript.getAttribute("color") + ' is not a valid widget color.'
      );
    }
  }
}

//if we didn't find the site in the list, the widget displays a warning instead
if (thisIndex == null) {
  tag.insertAdjacentHTML(
    "afterbegin",
    '<table><tr><td>This site isn\'t part of ' + ringName + ' yet. If you\'re the owner, make sure to do Control+F5, otherwise talk to Max!</td></tr></table>'
  );
} else {
  //find the 'next' and 'previous' sites in the ring. this code looks complex
  //because it's using a shorthand version of an if-else statement to make sure
  //the first and last sites in the ring join together correctly
  var previousIndex = thisIndex - 1 < 0 ? sites.length - 1 : thisIndex - 1;
  var nextIndex = thisIndex + 1 >= sites.length ? 0 : thisIndex + 1;

  var indexText = "";
  //if you've chosen to include an index, this builds the link to that
  if (useIndex) {
    indexText = "<a href='" + indexPage + "'>index</a> | ";
  }

  var randomText = "";
  //if you've chosen to include a random button, this builds the link that does that
  if (useRandom) {
    randomText = '<a href="javascript:void(0)" onclick="randomSite()"><img src="https://webring.nekoweb.org/images/cat' + widgetColor + '.png" alt="Random Site"></a>';
  }

  //this is the code that displays the widget - EDIT THIS if you want to change the structure
  tag.insertAdjacentHTML(
    "afterbegin",
    '<table><tr><td class="webring-prev"><a href="' + getSafe(function() { return sites[previousIndex][0]; }, '') + '"><img src="https://webring.nekoweb.org/images/prev' + widgetColor + '.png" alt="Previous Site"></a></td><td style="text-align: center;" class="webring-info"><a href="' + indexPage + '"><img src="https://webring.nekoweb.org/images/nekowebring' + widgetColor + '.png" alt="NekoWebRing Index"></a><br><span class="webring-links">' + randomText + '</span></td><td class="webring-next"><a href="' + sites[nextIndex][0] + '"><img src="https://webring.nekoweb.org/images/next' + widgetColor + '.png" alt="Next Site"></a></td></tr></table>'
  );
}