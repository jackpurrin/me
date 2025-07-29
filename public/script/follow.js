function follow(domain, event) {
    event.preventDefault();
    var el = document.querySelector('.follow-' + domain.replaceAll('.', '-'));
    var following = el.classList.contains('following');
    if(!confirm('Are you sure you want to ' + (following ? 'unfollow' : 'follow') + ' ' + domain + '?')) {
        return;
    }
    var url = 'https://nekoweb.org/api/:domain/toggle_follow'.replace(':domain', domain);
    fetch(url, {credentials: 'same-origin'}).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(data.error) {
            return alert(data.error);
        }
        el.classList.toggle('following', data.followed);
        var fulltext = el.getAttribute('data-fulltext');
        if(fulltext) {
            el.innerHTML = data.followed ? `Unfollow<span class="on-nekoweb"> on Nekoweb</span>` : `Follow<span class="on-nekoweb"> on Nekoweb</span>`;
        } else {
            el.innerHTML = data.followed ? '[-]' : '[+]';
        }
        el.title = data.followed ? 'Unfollow' : 'Follow';
        alert(data.followed ? 'Successfully followed ' + domain : 'Successfully unfollowed ' + domain);
    });
}

var followButtons = document.querySelectorAll('.follow');
followButtons.forEach(function(el) {
    el.addEventListener('click', function(event) {
        var domain = el.getAttribute('data-domain');
        var guest = el.getAttribute('data-guest');
        if(guest === '1') {
            var a = document.createElement('a');
            a.href = 'https://nekoweb.org/follow/' + domain;
            a.target = '_blank';
            a.click();
            return;
        };
        var shouldConfirm = el.getAttribute('data-confirm');
        var following = el.classList.contains('following');
        if(shouldConfirm) {
            var confirmed = confirm('Are you sure you want to ' + (following ? 'unfollow' : 'follow') + ' ' + domain + '?');
            if(!confirmed) {
                return;
            }
        }
        follow(domain, event);
    });
});