const Apis = ( e => {
    
    let user_id = 232087;
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

    let pinned = (no_anchor = false) => {
        fetch(`${apiUri}/github?user=${username}`, {
            method: 'GET',
            cache: 'default',
        }).then(
            json => json.json()
        ).then(response => {
            if (!no_anchor) window.location.hash = "pins";

            $('.featured-tabs').removeClass('actived');
            $('#tabPins').toggleClass('actived');

            $('#featuredList').empty();

            response.forEach(item => {
                $('#featuredList').append(`
                    <a href="${item.url}" target="_blank" class="item">
                        <div class="name">${item.name}</div>
                        <div class="info">${item.description}</div>
                        <div class="footer">${item.languages[0]} • ${format(item.stars)} stars • ${format(item.forks)} forks</div>
                    </a>
                `);
            })

            $('#featured').show();
        })
    }

    let apis = e => {
        fetch(`${apiUri}/json`).then(
            json => json.json()
        ).then(response => {
            window.location.hash = "apis";

            $('.featured-tabs').removeClass('actived');
            $('#tabApis').toggleClass('actived');

            $('#featuredList').empty();

            response.list.forEach(item => {
                let title = item.name.charAt(0).toUpperCase() + item.name.slice(1);

                $('#featuredList').append(`
                    <a href="${item.wiki}" target="_blank" class="item">
                        <div class="name">${title}</div>
                    </a>
                `);
            })

            $('#featured').show();
        })
    }

    let crates = e => {
        fetch(`https://crates.io/api/v1/crates?user_id=${user_id}`).then(
            json => json.json()
        ).then(response => {
            window.location.hash = "crates";

            $('.featured-tabs').removeClass('actived');
            $('#tabCrates').toggleClass('actived');

            $('#featuredList').empty();

            response.crates.forEach(item => {
                let title = item.name.charAt(0).toUpperCase() + item.name.slice(1);

                $('#featuredList').append(`
                    <a href="https://crates.io/crates/${item.name}" target="_blank" class="item">
                        <div class="name">${title}</div>
                        <div class="info">${item.description}</div>
                        <div class="footer">${format(item.downloads)} downloads • ${item.newest_version}</div>
                    </a>
                `);
            })

            $('#featured').show();
        })
    }

    let checkApi = e => {
        if (window.location.hash) {
            $('#featured').addClass('featured-caller');
        } else {
            $('#featured').removeClass('featured-caller');
        }

        switch (window.location.hash) {
            case '#apis':
                apis();
                break;

            case '#pins':
                pinned();
                break;

            case '#crates':
                crates();
                break;
                
            default:
                pinned(true);
                break;
        }
    }

    return {
        apiUri: apiUri,
        apis: () => { return apis(); },
        crates: () => { return crates(); },
        pinned: () => { return pinned(); },
        checkApi: () => { return checkApi(); }
    };

})();
