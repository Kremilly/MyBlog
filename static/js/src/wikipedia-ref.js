const WikipediaRef = ( e => {

    const clean_article_title = articleTitle => {
        let cleaned_title = articleTitle.replace(
            /[\(\)\[\]{}!@#$%^&*+=`~;:',.<>?\\|\/]/g, ''
        ).trim()

        return cleaned_title.replace(/\s+/g, ' ')
    }

    const get_article_title = articleUrl => {
        let articleTitle = decodeURIComponent(
            articleUrl.split('/').pop().replace(
                /_/g, ' '
            )
        )

        return clean_article_title(articleTitle)
    }

    const list = e => {
        let wiki_list = []
        let links = document.querySelectorAll('a')

        let promises = Array.from(links).map( link => {
            let current_link = link.href

            if (current_link.indexOf('wikipedia.org') !== -1) {
                wiki_list.push({
                    url: current_link, 
                    title: get_article_title(current_link),
                })
            }
        })

        return Promise.all(promises).then( e => {
            let ul = document.createElement('ul')
            let wiki_links_list_div = document.getElementById('wikiLinksList')

            wiki_list.forEach( link => {
                let a = document.createElement('a')
                let li = document.createElement('li')

                a.href = link.url
                a.target = '_blank'
                a.textContent = link.title

                li.appendChild(a)
                ul.appendChild(li)
            })

            wiki_links_list_div.appendChild(ul)
        })
    }

    list()

})()
