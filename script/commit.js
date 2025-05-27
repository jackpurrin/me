fetch('https://api.github.com/repos/jackpurrin/me/commits?per_page=1')
  .then(res => res.json())
  .then(res => {
    document.getElementById('message').innerHTML = res[0].commit.message
    document.getElementById('date').innerHTML =  res[0].commit.author.date
  })
