fetch('https://api.github.com/repos/jackpurrin/jackpurrin-me/commits?per_page=1')
.then(res => res.json())
.then(res => {
    let sha = res[0].sha;
    let authorDate = new Date(res[0].commit.author.date);
    document.getElementById('commitLatest').innerText = res[0].commit.message;
    document.getElementById('shortHash').innerText = "latest commit:" + sha.substring(0, 7) + " on " + authorDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
    document.getElementById('commitLink').href = "https://github.com/jackpurrin/jackpurrin-me/commit/" + sha
});
