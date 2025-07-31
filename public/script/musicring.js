document.addEventListener("DOMContentLoaded", () => {
    const scriptTag = document.getElementById("musicring");
    if (!scriptTag) return;

    const slug = scriptTag.getAttribute("slug") || "default-slug";
    scriptTag.outerHTML = `
        <div style="width:104px">
        <a href="//mr.jhorn.net/index.php"><img src="//mr.jhorn.net/assets/button.gif"></a>
        <a href="//mr.jhorn.net/prev.php?slug=${slug}">prev</a>
        <a href="//mr.jhorn.net/rand.php">rand</a>
        <a href="//mr.jhorn.net/next.php?slug=${slug}">next</a>
    </div>
    `;
});