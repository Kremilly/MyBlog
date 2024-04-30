const DocsSources = ( e => {

    const checkDocsUrlExt = link => {
        if (
            link.endsWith('.pdf') || link.endsWith('.docx') || 
            link.endsWith('.doc') || link.endsWith('.rst') || 
            link.endsWith('.yml') || link.endsWith('.yaml') ||
            link.endsWith('.json') || link.endsWith('.toml') || 
            link.endsWith('.7z') || link.endsWith('.zip') || 
            link.endsWith('.rar') || link.endsWith('.tar') || 
            link.endsWith('.tar.gz') || link.endsWith('.gz') || 
            link.endsWith('.bin') || link.endsWith('.img')  
        ) {
            return true
        }

        return false
    }

    const list = e => {
        let docs_list = []
        let links = document.querySelectorAll('a')

        let promises = Array.from(links).map( link => {
            let currentLink = link.href

            if (checkDocsUrlExt(currentLink)) {
                let fileName = link.href.split('/').pop()

                let fileNameExists = docs_list.some(item => {
                    return item.name === fileName
                })

                if (!fileNameExists) {
                    docs_list.push({
                        name: fileName,
                        url: currentLink, 
                    })
                }
            }
        })

        return Promise.all(promises).then( e => {
            let ul = document.createElement('ul')
            let pdfLinksListDiv = document.getElementById('pdfLinksList')

            docs_list.forEach( link => {
                let a = document.createElement('a')
                let li = document.createElement('li')

                a.href = link.url
                a.target = '_blank'
                a.textContent = link.name

                li.appendChild(a)
                ul.appendChild(li)
            })

            pdfLinksListDiv.appendChild(ul)
        })
    }

    list()

})()
