const Apis = ( e => {
    
    let user_id = 232087
    let username = 'kremilly'
    let apiUri = 'https://api.kremilly.com'

    let format = (number) => {
		if (number >= 1000) {
			const milhares = number / 1000
			return milhares + 'k'
		} else {
			return number.toString()
		}
	}

    let colors = (element) => {
        fetch(`https://gist.githubusercontent.com/kremilly/0e2b5ac9779857efcf0e3fd6f62cd093/raw/112c3af99ed5db18776192609215353a18c28e9d/languages-hex-colors.json`, {
            method: 'GET',
            cache: 'default',
        }).then(
            json => json.json()
        ).then(response => {
            _.forEach(response, (value, key) => {
                if ($(element).attr('data-lang').toLowerCase() == key) {
                    $(element).css('color', value)
                }
            })
        })
    }

    let pinned = (no_anchor = false) => {
        if (window.location.pathname == '/') {
            fetch(`${apiUri}/github?user=${username}`, {
                method: 'GET',
                cache: 'default',
            }).then(
                json => json.json()
            ).then(response => {
                if (!no_anchor) window.location.hash = 'pins'

                $('.featured-tabs').removeClass('actived')
                $('#tabPins').toggleClass('actived')

                $('#featuredList').empty()

                response.forEach(item => {
                    $('#featuredList').append(`
                        <a href='${item.url}' target='_blank' class='item featured-item'>
                            <div class='name'>${item.name}</div>
                            <div class='info'>${item.description}</div>

                            <div class='footer'>
                                <div class='lang lc-${item.name}' data-lang='${item.languages[0]}'>
                                    ${item.languages[0]}
                                </div>

                                <div class='stats'>
                                    <div class='fas fa-star'></div>${format(item.stars)} stars 
                                    <div class='fas fa-code-fork'></div> ${format(item.forks)} forks
                                </div>
                            </div>
                        </a>
                    `)

                    colors(`.lc-${item.name}`)
                })

                $('#featured').show()
            })
        }
    }

    let apis = e => {
        if (window.location.pathname == '/') {
            fetch(`${apiUri}`).then(
                json => json.json()
            ).then(response => {
                window.location.hash = 'apis'

                $('.featured-tabs').removeClass('actived')
                $('#tabApis').toggleClass('actived')

                $('#featuredList').empty()

                response.list.forEach(item => {
                    let title = item.name.charAt(0).toUpperCase() + item.name.slice(1)

                    $('#featuredList').append(`
                        <a href='${item.wiki}' target='_blank' class='item featured-item'>
                            <div class='name'>${title}</div>
                        </a>
                    `)
                })

                $('#featured').show()
            })
        }
    }

    let crates = e => {
        if (window.location.pathname == '/') {
            fetch(`https://crates.io/api/v1/crates?user_id=${user_id}`).then(
                json => json.json()
            ).then(response => {
                window.location.hash = 'crates'

                $('.featured-tabs').removeClass('actived')
                $('#tabCrates').toggleClass('actived')

                $('#featuredList').empty()

                response.crates.forEach(item => {
                    let title = item.name.charAt(0).toUpperCase() + item.name.slice(1)

                    $('#featuredList').append(`
                        <a href='https://crates.io/crates/${item.name}' target='_blank' class='item featured-item'>
                            <div class='name'>${title}</div>
                            <div class='info'>${item.description}</div>
                            <div class='footer'>${format(item.downloads)} downloads • ${item.newest_version}</div>
                        </a>
                    `)
                })

                $('#featured').show()
            })
        }
    }

    let checkApi = e => {
        if (window.location.pathname == '/') {
            if (window.location.hash) {
                $('#featured').addClass('featured-caller')
            } else {
                $('#featured').removeClass('featured-caller')
            }

            switch (window.location.hash) {
                case '#apis':
                    apis()
                    break

                case '#pins':
                    pinned()
                    break

                case '#crates':
                    crates()
                    break
                    
                default:
                    pinned(true)
                    break
            }
        }
    }

    let downloadPdf = e => {
        let endpoint = window.location.href.replace(
            window.location.hash, ''
        ) + '/export'

        fetch(`${ endpoint }`).then(response => {
            if (!response.ok) { throw new Error('Network response was not ok') }
            return response.url
        }).then( url => {
            const a = document.createElement('a')

            a.href = url;
            a.download = 'arquivo.pdf'
            document.body.appendChild(a)
            a.click()

            document.body.removeChild(a)
        }).catch(error => {
            console.error('There was an error with the fetch operation:', error)
        })
    }

    return {
        apiUri: apiUri,
        apis: () => { return apis() },
        crates: () => { return crates() },
        pinned: () => { return pinned() },
        checkApi: () => { return checkApi() },
        colors: (lang) => { return colors(lang) },
        downloadPdf: () => { return downloadPdf() },
    }

})()
