const Apis = ( e => {
    
    let username = 'kremilly';
    let apiUri = 'https://api.kremilly.com';

    let format = (number) => {
		if (number >= 1000) {
			const milhares = number / 1000;
			return milhares + "k";
		} else {
			return number.toString();
		}
	}

    let pinned = e => {
        fetch(`${apiUri}/github?user=${username}`).then(
            json => json.json()
        ).then(response => {
            response.forEach(item => {
                $('#ghPinnedReposList').append(`
                    <a href="${item.url}" target="_blank" class="repo">
                        <div class="name">
                            <div class="fas fa-star"></div>
                            ${item.name}
                        </div>

                        <div class="info">${item.description}</div>

                        <div class="footer">
                            ${item.languages[0]} • ${format(item.stars)} stars • ${format(item.forks)} forks
                        </div>
                    </a>
                `);
            })

            $('#ghPinnedRepos').show();
        })
    }

    return {
        apiUri: apiUri,
        pinned: (username) => { return pinned(username); },
    };

})();
