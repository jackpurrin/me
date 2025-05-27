fetch('https://api.github.com/repos/jackpurrin/me/commits?per_page=1')
  .then(res => res.json())
  .then(res => {
		let fetchedMessage = res[0].commit.message
		let replacedMessage = fetchedMessage.replace("Signed-off-by:", "Authored by:");
		console.log(replacedMessage)
    document.getElementById('message').innerHTML = replacedMessage
		let date = res[0].commit.author.date
		let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
		let hour = date.slice(11, 13);
		let min = date.slice(14, 16);
		document.getElementById('date').innerHTML = year + " - " + month + " - " + day + " - " + hour + " - " + min + ""
  })
