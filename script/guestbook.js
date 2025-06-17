const s_stylePath = "/css/guestbook.css";
const s_formId = "1FAIpQLSfNs1C5gok6NGwYFI1uNLzej8OLdetaTeX7qY3XSCyyKmotVA";
const s_nameId = "488959249";
const s_websiteId = "1782451882";
const s_textId = "2130708527";
const s_pageId = "1351310710";
const s_replyId = "1305232267";
const s_sheetId = "1-I7kMvglcawt_dAAm07l3fTZj8Ul576iIdzoBMn0PbY";
const s_timezone = -7;
const s_daylightSavings = false;
const s_dstStart = ["March", "Sunday", 2, 2];
const s_dstEnd = ["November", "Sunday", 1, 2];
const s_commentsPerPage = 5;
const s_maxLength = 300;
const s_maxLengthName = 16;
const s_commentsOpen = true;
const s_collapsedReplies = true;
const s_longTimestamp = true;
let s_includeUrlParameters = false;
const s_fixRarebitIndexPage = false;
const s_wordFilterOn = false;
const s_filterReplacement = "****";
const s_filteredWords = ["heck", "dang"];
const s_widgetTitle = "";
const s_nameFieldLabel = "Name";
const s_websiteFieldLabel = "Website (Optional)";
const s_textFieldLabel = "text";
const s_submitButtonLabel = "comment";
const s_loadingText = "loadding";
const s_noCommentsText = "write a comment, there is none!";
const s_closedCommentsText = "Comments are closed temporarily!";
const s_websiteText = "site";
const s_replyButtonText = "Reply";
const s_replyingText = "Replying to";
const s_expandRepliesText = "Show Replies";
const s_leftButtonText = "<<";
const s_rightButtonText = ">>";
if (s_fixRarebitIndexPage) {
    s_includeUrlParameters = true;
}
const c_cssLink = document.createElement("link");
c_cssLink.type = "text/css";
c_cssLink.rel = "stylesheet";
c_cssLink.href = s_stylePath;
document.getElementsByTagName("head")[0].appendChild(c_cssLink);
const v_mainHtml = `
    <div id="c_inputDiv">
        <form id="c_form" onsubmit="c_submitButton.disabled = true; v_submitted = true;" method="post" target="c_hiddenIframe" action="https://docs.google.com/forms/d/e/${s_formId}/formResponse"></form>
    </div>
    <div id="c_container">${s_loadingText}</div>
`;
const v_formHtml = `
    <div id="c_nameWrapper" class="c-inputWrapper">
        <label class="c-label c-nameLabel" for="entry.${s_nameId}">${s_nameFieldLabel}</label>
        <input class="c-input c-nameInput" name="entry.${s_nameId}" id="entry.${s_nameId}" type="text" maxlength="${s_maxLengthName}" required>
    </div>

    <div id="c_websiteWrapper" class="c-inputWrapper">
        <label class="c-label c-websiteLabel" for="entry.${s_websiteId}">${s_websiteFieldLabel}</label>
        <input class="c-input c-websiteInput" name="entry.${s_websiteId}" id="entry.${s_websiteId}" type="url" pattern="https://.*">
    </div>

    <div id="c_textWrapper" class="c-inputWrapper">
        <label class="c-label c-textLabel" for="entry.${s_textId}">${s_textFieldLabel}</label>
        <textarea class="c-input c-textInput" name="entry.${s_textId}" id="entry.${s_textId}" rows="4" cols="50"  maxlength="${s_maxLength}" required></textarea>
    </div>

    <input id="c_submitButton" name="c_submitButton" type="submit" value="${s_submitButtonLabel}" disabled>
`;
document.getElementById("c_widget").innerHTML = v_mainHtml;
const c_form = document.getElementById("c_form");
if (s_commentsOpen) {
    c_form.innerHTML = v_formHtml;
} else {
    c_form.innerHTML = s_closedCommentsText;
}
const c_container = document.getElementById("c_container");
let v_pageNum = 1;
let v_amountOfPages = 1;
let v_commentMax = 1;
let v_commentMin = 1;
let v_filteredWords;
if (s_wordFilterOn) {
    v_filteredWords = s_filteredWords.join("|");
    v_filteredWords = new RegExp(String.raw`\b(${v_filteredWords})\b`, "ig");
}
let c_submitButton;
if (s_commentsOpen) {
    c_submitButton = document.getElementById("c_submitButton");
} else {
    c_submitButton = document.createElement("button");
}
let v_pagePath = window.location.pathname;
if (s_includeUrlParameters) {
    v_pagePath += window.location.search;
}
if (s_fixRarebitIndexPage && v_pagePath == "/") {
    v_pagePath = "/?pg=1";
}
const c_pageInput = document.createElement("input");
c_pageInput.value = v_pagePath;
c_pageInput.type = "text";
c_pageInput.style.display = "none";
c_pageInput.id = "entry." + s_pageId;
c_pageInput.name = c_pageInput.id;
c_form.appendChild(c_pageInput);
let c_replyingText = document.createElement("span");
c_replyingText.style.display = "none";
c_replyingText.id = "c_replyingText";
c_form.appendChild(c_replyingText);
c_replyingText = document.getElementById("c_replyingText");
let c_replyInput = document.createElement("input");
c_replyInput.type = "text";
c_replyInput.style.display = "none";
c_replyInput.id = "entry." + s_replyId;
c_replyInput.name = c_replyInput.id;
c_form.appendChild(c_replyInput);
c_replyInput = document.getElementById("entry." + s_replyId);
let v_submitted = false;
let c_hiddenIframe = document.createElement("iframe");
c_hiddenIframe.id = "c_hiddenIframe";
c_hiddenIframe.name = "c_hiddenIframe";
c_hiddenIframe.style.display = "none";
c_hiddenIframe.setAttribute("onload", "if(v_submitted){fixFrame()}");
c_form.appendChild(c_hiddenIframe);
c_hiddenIframe = document.getElementById("c_hiddenIframe");
function fixFrame() {
    v_submitted = false;
    c_hiddenIframe.srcdoc = "";
    getComments();
}
function getComments() {
    c_submitButton.disabled;
    c_replyingText.style.display = "none";
    c_replyInput.value = "";
    if (s_commentsOpen) {
        document.getElementById(`entry.${s_nameId}`).value = "";
        document.getElementById(`entry.${s_websiteId}`).value = "";
        document.getElementById(`entry.${s_textId}`).value = "";
    }
    const url = `https://docs.google.com/spreadsheets/d/${s_sheetId}/gviz/tq?`;
    const retrievedSheet = getSheet(url);
    retrievedSheet.then((result) => {
        const json = JSON.parse(result.split("\n")[1].replace(/google.visualization.Query.setResponse\(|\);/g, ""));
        const isPage = (col) => col.label == "Page";
        let pageIdx = json.table.cols.findIndex(isPage);
        let comments = [];
        if (json.table.parsedNumHeaders > 0) {
            let r = 0
            for (r = 0; r < json.table.rows.length; r += 1) {
                let val1;
                if (!json.table.rows[r].c[pageIdx]) {
                    val1 = "";
                } else {
                    val1 = json.table.rows[r].c[pageIdx].v;
                }
                if (val1 == v_pagePath) {
                    let comment = {};
                    for (c = 0; c < json.table.cols.length; c += 1) {
                        let val2;
                        if (!json.table.rows[r].c[c]) {
                            val2 = "";
                        } else {
                            val2 = json.table.rows[r].c[c].v;
                        }
                        comment[json.table.cols[c].label] = val2;
                    }
                    comment.Timestamp2 = json.table.rows[r].c[0].f;
                    comments.push(comment);
                }
            }
        }
        if (comments.length == 0 || Object.keys(comments[0]).length < 2) {
            c_container.innerHTML = s_noCommentsText;
        } else {
            displayComments(comments);
        }
        c_submitButton.disabled = false;
    });
}
function getSheet(url) {
    return new Promise(function (resolve, reject) {
        fetch(url).then((response) => {
            if (!response.ok) {
                reject("Could not find Google Sheet with that URL");
            } else {
                response.text().then((data) => {
                    if (!data) {
                        reject("Invalid data pulled from sheet");
                    }
                    resolve(data);
                });
            }
        });
    });
}
let a_commentDivs = [];
function displayComments(comments) {
    a_commentDivs = [];
    c_container.innerHTML = "";
    let replies = [];
    for (i = 0; i < comments.length; i += 1) {
        if (comments[i].Reply) {
            replies.push(comments[i]);
            comments.splice(i, 1);
            i -= 1;
        }
    }
    v_amountOfPages = Math.ceil(comments.length / s_commentsPerPage);
    v_commentMax = s_commentsPerPage * v_pageNum;
    v_commentMin = v_commentMax - s_commentsPerPage;
    comments.reverse();
    for (i = 0; i < comments.length; i += 1) {
        let comment = createComment(comments[i]);
        let button = document.createElement("button");
        button.innerHTML = s_replyButtonText;
        button.value = comment.id;
        button.setAttribute("onclick", `openReply(this.value)`);
        button.className = "c-replyButton";
        comment.appendChild(button);
        comment.style.display = "none";
        if (i >= v_commentMin && i < v_commentMax) {
            comment.style.display = "block";
        }
        comment.className = "c-comment";
        c_container.appendChild(comment);
        a_commentDivs.push(document.getElementById(comment.id));
    }
    for (i = 0; i < replies.length; i += 1) {
        let reply = createComment(replies[i]);
        const parentId = replies[i].Reply;
        const parentDiv = document.getElementById(parentId);
        let container;
        if (!document.getElementById(parentId + "-replies")) {
            container = document.createElement("div");
            container.id = parentId + "-replies";
            if (s_collapsedReplies) {
                container.style.display = "none";
            }
            container.className = "c-replyContainer";
            parentDiv.appendChild(container);
        } else {
            container = document.getElementById(parentId + "-replies");
        }
        reply.className = "c-reply";
        container.appendChild(reply);
    }
    if (s_collapsedReplies) {
        const containers = document.getElementsByClassName("c-replyContainer");
        for (i = 0; i < containers.length; i += 1) {
            const num = containers[i].childNodes.length;
            const parentDiv = containers[i].parentElement;
            const button = document.createElement("button");
            button.innerHTML = s_expandRepliesText + ` (${num})`;
            button.setAttribute("onclick", `expandReplies(this.parentElement.id)`);
            button.className = "c-expandButton";
            parentDiv.insertBefore(button, parentDiv.lastChild);
        }
    }
    if (v_amountOfPages > 1) {
        let pagination = document.createElement("div");
        leftButton = document.createElement("button");
        leftButton.innerHTML = s_leftButtonText;
        leftButton.id = "c_leftButton";
        leftButton.name = "left";
        leftButton.setAttribute("onclick", `changePage(this.name)`);
        if (v_pageNum == 1) {
            leftButton.disabled = true;
        }
        leftButton.className = "c-paginationButton";
        pagination.appendChild(leftButton);
        rightButton = document.createElement("button");
        rightButton.innerHTML = s_rightButtonText;
        rightButton.id = "c_rightButton";
        rightButton.name = "right";
        rightButton.setAttribute("onclick", `changePage(this.name)`);
        if (v_pageNum == v_amountOfPages) {
            rightButton.disabled = true;
        }
        rightButton.className = "c-paginationButton";
        pagination.appendChild(rightButton);
        pagination.id = "c_pagination";
        c_container.appendChild(pagination);
    }
}
function createComment(data) {
    let comment = document.createElement("div");
    let timestamps = convertTimestamp(data.Timestamp);
    let timestamp;
    if (s_longTimestamp) {
        timestamp = timestamps[0];
    } else {
        timestamp = timestamps[1];
    }
    const id = data.Name + "|--|" + data.Timestamp2;
    comment.id = id;
    let name = document.createElement("h3");
    let filteredName = data.Name;
    if (s_wordFilterOn) {
        filteredName = filteredName.replace(v_filteredWords, s_filterReplacement);
    }
    name.innerText = filteredName;
    name.className = "c-name";
    comment.appendChild(name);
    let time = document.createElement("span");
    time.innerText = timestamp;
    time.className = "c-timestamp";
    comment.appendChild(time);
    if (data.Website) {
        let site = document.createElement("a");
        site.innerText = s_websiteText;
        site.href = data.Website;
        site.className = "c-site";
        comment.appendChild(site);
    }
    let text = document.createElement("p");
    let filteredText = data.Text;
    if (s_wordFilterOn) {
        filteredText = filteredText.replace(v_filteredWords, s_filterReplacement);
    }
    text.innerText = filteredText;
    text.className = "c-text";
    comment.appendChild(text);
    return comment;
}
function convertTimestamp(timestamp) {
    const vals = timestamp.split("(")[1].split(")")[0].split(",");
    const date = new Date(vals[0], vals[1], vals[2], vals[3], vals[4], vals[5]);
    const timezoneDiff = (s_timezone * 60 + date.getTimezoneOffset()) * -1;
    let offsetDate = new Date(date.getTime() + timezoneDiff * 60 * 1000);
    if (s_daylightSavings) {
        offsetDate = isDST(offsetDate);
    }
    return [offsetDate.toLocaleString(), offsetDate.toLocaleDateString()];
}
function isDST(date) {
    const dstStart = [getMonthNum(s_dstStart[0]), getDayNum(s_dstStart[1]), s_dstStart[2], s_dstStart[3]];
    const dstEnd = [getMonthNum(s_dstEnd[0]), getDayNum(s_dstEnd[1]), s_dstEnd[2], s_dstEnd[3]];
    const year = date.getFullYear();
    let startDate = new Date(year, dstStart[0], 1);
    startDate = nthDayOfMonth(dstStart[1], dstStart[2], startDate, dstStart[3]).getTime();
    let endDate = new Date(year, dstEnd[0], 1);
    endDate = nthDayOfMonth(dstEnd[1], dstEnd[2], endDate, dstEnd[3]).getTime();
    time = date.getTime();
    if (time >= startDate && time < endDate) {
        date.setHours(date.getHours() - 1);
    }
    return date;
}
function nthDayOfMonth(day, n, date, hour) {
    var count = 0;
    var idate = new Date(date);
    idate.setDate(1);
    while (count < n) {
        idate.setDate(idate.getDate() + 1);
        if (idate.getDay() == day) {
            count += 1;
        }
    }
    idate.setHours(hour);
    return idate;
}
function getDayNum(day) {
    let num;
    switch (day.toLowerCase()) {
        case "sunday":
            num = 0;
            break;
        case "monday":
            num = 1;
            break;
        case "tuesday":
            num = 2;
            break;
        case "wednesday":
            num = 3;
            break;
        case "thursday":
            num = 4;
            break;
        case "friday":
            num = 5;
            break;
        case "saturday":
            num = 6;
            break;
        default:
            num = 0;
            break;
    }
    return num;
}
function getMonthNum(month) {
    let num;
    switch (month.toLowerCase()) {
        case "january":
            num = 0;
            break;
        case "february":
            num = 1;
            break;
        case "march":
            num = 2;
            break;
        case "april":
            num = 3;
            break;
        case "may":
            num = 4;
            break;
        case "june":
            num = 5;
            break;
        case "july":
            num = 6;
            break;
        case "august":
            num = 7;
            break;
        case "september":
            num = 8;
            break;
        case "october":
            num = 9;
            break;
        case "november":
            num = 10;
            break;
        case "december":
            num = 11;
            break;
    }
    return num;
}
const link = document.createElement("a");
link.href = "#c_inputDiv";
function openReply(id) {
    if (c_replyingText.style.display == "none") {
        c_replyingText.innerHTML = s_replyingText + ` ${id.split("|--|")[0]}...`;
        c_replyInput.value = id;
        c_replyingText.style.display = "block";
    } else {
        c_replyingText.innerHTML = "";
        c_replyInput.value = "";
        c_replyingText.style.display = "none";
    }
    link.click();
}
function expandReplies(id) {
    const targetDiv = document.getElementById(`${id}-replies`);
    if (targetDiv.style.display == "none") {
        targetDiv.style.display = "block";
    } else {
        targetDiv.style.display = "none";
    }
}
function changePage(dir) {
    const leftButton = document.getElementById("c_leftButton");
    const rightButton = document.getElementById("c_rightButton");
    let num;
    switch (dir) {
        case "left":
            num = -1;
            break;
        case "right":
            num = 1;
            break;
        default:
            num = 0;
            break;
    }
    let targetPage = v_pageNum + num;
    if (targetPage > v_amountOfPages || targetPage < 1) {
        return;
    }
    leftButton.disabled = false;
    rightButton.disabled = false;
    if (targetPage == 1) {
        leftButton.disabled = true;
    }
    if (targetPage == v_amountOfPages) {
        rightButton.disabled = true;
    }
    v_pageNum = targetPage;
    v_commentMax = s_commentsPerPage * v_pageNum;
    v_commentMin = v_commentMax - s_commentsPerPage;
    for (i = 0; i < a_commentDivs.length; i += 1) {
        a_commentDivs[i].style.display = "none";
        if (i >= v_commentMin && i < v_commentMax) {
            a_commentDivs[i].style.display = "block";
        }
    }
}
getComments();