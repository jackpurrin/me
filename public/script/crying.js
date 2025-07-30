var tag = document.getElementById(ringID);
thisSite = "https://jackpurrin.me/";
thisIndex = null;
for (i = 0; i < sites.length; i += 1) {
    if (thisSite.startsWith(sites[i])) {
        thisIndex = i;
        break;
    }
}
function randomSite() {
    otherSites = sites.slice();
    otherSites.splice(thisIndex, 1);
    randomIndex = Math.floor(Math.random() * otherSites.length);
    location.href = otherSites[randomIndex];
}
if (thisIndex == null) {
    tag.insertAdjacentHTML(
        "afterbegin",
        `
<table>
  <tr>
    <td>This site isn't part of the ${ringName} webring yet. You should talk to the manager to have your site added to the list!</td>
  </tr>
</table>
  `
    );
} else {
    previousIndex = thisIndex - 1 < 0 ? sites.length - 1 : thisIndex - 1;
    nextIndex = thisIndex + 1 >= sites.length ? 0 : thisIndex + 1;
    indexText = "";
    if (useIndex) {
        indexText = `<a href='${indexPage}'>index</a> | `;
    }
    randomText = "";
    if (useRandom) {
        randomText = `<a href='javascript:void(0)' onclick='randomSite()'>random</a> | `;
    }
    tag.insertAdjacentHTML(
        "afterbegin",
        `
                <div class="ring">
                    <a href="${sites[previousIndex]}">←</a>
                    <a href=""><h2>crying cat webring</h2></a>
                    <a href="${sites[nextIndex]}">→</a>
                    <a href="javascript:void(0)" onclick="randomSite()">↺</a>
                </div>
  `
    );
}
