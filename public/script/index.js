webAddress = window.location.href;
domainElement = document.getElementById("domain");

function checkDomain() {
    if (webAddress.includes("file://") ) {
        if (Math.random() >= 0.5) {
            domainElement.innerHTML = "check out my main domain @ <a href='https://jackpurrin.me/'>jackpurrin.me</a>!";
        } else {
            domainElement.innerHTML = "check out my nekoweb domain @ <a href='https://jackpurrin.nekoweb.org/'>nekoweb.jackpurrin.org</a>!";
        }
    }
    else if (webAddress.includes("nekoweb")) {
        domainElement.innerHTML = "check out my main domain @ <a href='https://jackpurrin.me/'>jackpurrin.me</a>!";
    }
    else if (webAddress.includes(".me")) {
        domainElement.innerHTML = "check out my nekoweb domain @ <a href='https://jackpurrin.nekoweb.org/'>nekoweb.jackpurrin.org</a>!";
    }
    else {
        console.log("unknown domain")
    }
}

checkDomain()