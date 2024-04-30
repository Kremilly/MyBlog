const WikipediaPreview = ( e => {

    const cache = {}
    const elementPreviewRoot = 'wikipedia-preview'
    const preview = document.getElementById(elementPreviewRoot)

    const bodyPreviewElementRoot = document.querySelector(`#${elementPreviewRoot} a p`)
    const coverPreviewElementRoot = document.querySelector(`#${elementPreviewRoot} a.set-triangle img`)

    const isInList = element => {
        let parent = element.parentNode

        while (parent) {
            if (parent.tagName === 'ul' || parent.tagName === 'ol') {
                return true
            }

            parent = parent.parentNode
        }

        return false
    }

    const fetchWikipediaApi = (link) => {
        let region = link.match(/^(?:https?:\/\/)?([^\/]+)\./)[1].split('.')[0]

        let term = (
            decodeURIComponent(
                link.split('/').pop()
            )
        )

        let WikipediaApiUri = `https://api.kremilly.com/wikipedia?location=${
            region
        }&term=${
            term
        }&thumb_size=480&short_summary=true`;
        
        if (cache[term]) {
            return Promise.resolve(cache[term])
        } else {
            return fetch(WikipediaApiUri).then(
                response => response.json()
            ).then( data => {
                cache[term] = data
                return data
            }).catch( error => {
                console.error(error)
            })
        }
    }

    const changeElements = (link) => {
        fetchWikipediaApi(
            link
        ).then(callback => {
            let articleSummary = callback.summary
            let articleCover = callback.thumbnail
            
            bodyPreviewElementRoot.innerHTML = articleSummary.split('.')[0] + '.'

            if (articleCover != undefined) {
                coverPreviewElementRoot.src = articleCover.source
                coverPreviewElementRoot.style.display = 'block'
            } else {
                coverPreviewElementRoot.src = ''
                coverPreviewElementRoot.style.display = 'none'
            }
        })
    }

    const load = e => {
        let links = document.querySelectorAll('a[href*="wikipedia.org"]')
        
        links.forEach( link => {
            if (!isInList(link)) {
                link.addEventListener('mousemove', event => {
                    changeElements(event.target.href)
                    
                    preview.style.display = 'block'
                    preview.style.position = 'fixed'

                    preview.style.top = (event.clientY + 10) + 'px'
                    preview.style.left = (event.clientX + 10) + 'px'
                })

                link.addEventListener('mouseleave', e => {
                    coverPreviewElementRoot.src = ''
                    bodyPreviewElementRoot.innerHTML = ''
                    preview.style.display = 'none'
                })
            }
        })
    }

    load()

})()
