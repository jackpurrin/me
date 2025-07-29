function full_view(ele) {
    let src = ele.parentElement.querySelector(".img-source").getAttribute("src");
    document.querySelector("#img-viewer").querySelector("img").setAttribute("src", src);
    document.querySelector("#img-viewer").style.display = "block";
}

function close_model() {
    document.querySelector("#img-viewer").style.display = "none";
}
