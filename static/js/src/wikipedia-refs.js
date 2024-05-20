const WikipediaRefs = ( e => {

    const cleanArticleTitle = articleTitle => {
        return articleTitle.replace(
            /[\(\)\[\]{}!@#$%^&*+=`~;:',.<>?\\|\/]/g, ''
        ).trim().replace(
            /\s+/g, ' '
        )
    }

    const getArticleTitle = articleUrl => {
        return cleanArticleTitle(
            decodeURIComponent(
                articleUrl.split('/').pop().replace(
                    /_/g, ' '
                )
            )
        )
    }

    const list = e => {
        let wikiList = []
        let links = document.querySelectorAll('a')

        let promises = Array.from(links).map( link => {
            let currentLink = link.href

            if (currentLink.indexOf('wikipedia.org') !== -1) {
                wikiList.push({
                    url: currentLink, 
                    title: getArticleTitle(currentLink),
                })
            }
        })

        return Promise.all(promises).then( e => {
            let ul = document.createElement('ul')
            let wikiLinksListDiv = document.getElementById('wikiLinksList')
            wikiLinksListDiv.className = 'plugin-section'

            wikiList.forEach( link => {
                let a = document.createElement('a')
                let li = document.createElement('li')
                li.className = 'pdd-left'

                a.href = link.url
                a.target = '_blank'
                a.textContent = link.title

                li.appendChild(a)
                ul.appendChild(li)
            })

            wikiLinksListDiv.appendChild(ul)
        })
    }

    list()

})()
