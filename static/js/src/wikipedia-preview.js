const WikipediaPreview = ( e => {

    const cache = {}
    const element_preview_root = 'wikipedia-preview'
    const preview = document.getElementById(element_preview_root)

    const body = document.querySelector(`#${element_preview_root} a p`)
    const cover = document.querySelector(`#${element_preview_root} a.set-triangle img`)

    const is_in_list = element => {
        let parent = element.parentNode

        while (parent) {
            if (parent.tagName === 'UL' || parent.tagName === 'OL') {
                return true
            }

            parent = parent.parentNode
        }

        return false
    }

    const fetch_wikipedia_api = (link) => {
        let region = link.match(/^(?:https?:\/\/)?([^\/]+)\./)[1].split('.')[0]

        let term = (
            decodeURIComponent(
                link.split('/').pop()
            )
        )

        let api_wikipedia_uri = `https://api.kremilly.com/wikipedia?location=${
            region
        }&term=${
            term
        }&thumb_size=480&short_summary=true`;
        
        if (cache[term]) {
            return Promise.resolve(cache[term])
        } else {
            return fetch(api_wikipedia_uri).then(
                response => response.json()
            ).then( data => {
                cache[term] = data
                return data
            }).catch( error => {
                console.error(error)
            })
        }
    }

    const change_elements = (link) => {
        fetch_wikipedia_api(
            link
        ).then(callback => {
            let summary_article = callback.summary
            let cover_article = callback.thumbnail
            
            body.innerHTML = summary_article.split('.')[0] + '.'

            if (cover_article != undefined) {
                cover.src = cover_article.source
                cover.style.display = 'block'
            } else {
                cover.src = ''
                cover.style.display = 'none'
            }
        })
    }

    const load = e => {
        let links = document.querySelectorAll('a[href*="wikipedia.org"]')
        
        links.forEach( link => {
            if (!is_in_list(link)) {
                link.addEventListener('mousemove', event => {
                    change_elements(event.target.href)
                    
                    preview.style.display = 'block'
                    preview.style.position = 'fixed'

                    preview.style.top = (event.clientY + 10) + 'px'
                    preview.style.left = (event.clientX + 10) + 'px'
                })

                link.addEventListener('mouseleave', e => {
                    cover.src = ''
                    body.innerHTML = ''
                    preview.style.display = 'none'
                })
            }
        })
    }

    load()

})()
