fetch("https://api.github.com/repos/jackpurrin/me/commits?per_page=1")
    .then((res) => res.json())
    .then((res) => {
        let date = res[0].commit.author.date;
        let year = date.slice(2, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);
        document.getElementById('date').innerHTML = 'updated: ' + month + "/" + day + "/" + year;
    });