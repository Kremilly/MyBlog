const WikipediaPreview = ( e => {

    const cache = {}
    const element_preview_root = 'wikipedia-preview'
    const preview = document.getElementById(element_preview_root)

    const fetch_wikipedia_api = (region, term) => {
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
        let region = link.match(/^(?:https?:\/\/)?([^\/]+)\./)[1].split('.')[0]

        let term = (
            decodeURIComponent(
                link.split('/').pop()
            )
        )

        fetch_wikipedia_api(
            region, term
        ).then(callback => {
            let summary_article = callback.summary
            let cover_article = callback.thumbnail
            
            let body = document.querySelector(`#${element_preview_root} a p`)
            let cover = document.querySelector(`#${element_preview_root} a.set-triangle img`)
            
            body.innerHTML = summary_article

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
            link.addEventListener('mousemove', event => {
                let mouseX = event.clientX
                let mouseY = event.clientY

                let link = event.target.href
                
                preview.style.display = 'block'
                preview.style.position = 'fixed'

                preview.style.top = (mouseY + 10) + 'px'
                preview.style.left = (mouseX + 10) + 'px'

                change_elements(link)
            })

            link.addEventListener('mouseleave', e => {
                preview.style.display = 'none'
            })
        })
    }

    load()

})()
