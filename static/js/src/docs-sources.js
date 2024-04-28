const DocsSources = (() => {

    const check_docs_url_ext = link => {
        if (
            link.endsWith('.pdf') || link.endsWith('.docx') || 
            link.endsWith('.doc') || link.endsWith('.rst') || 
            link.endsWith('.md') || link.endsWith('.mdx')
        ) {
            return true
        }

        return false
    }

    const list = e => {
        let docs_list = []
        let links = document.querySelectorAll('a')

        let promises = Array.from(links).map( link => {
            let current_link = link.href

            if (check_docs_url_ext(current_link)) {
                let file_name = link.href.split('/').pop()

                let file_name_exists = docs_list.some(item => {
                    return item.name === file_name
                })

                if (!file_name_exists) {
                    docs_list.push({
                        name: file_name,
                        url: current_link, 
                    })
                }
            }
        })

        return Promise.all(promises).then( e => {
            let ul = document.createElement('ul')
            let pdf_links_list_div = document.getElementById('pdfLinksList')

            docs_list.forEach( link => {
                let a = document.createElement('a')
                let li = document.createElement('li')

                a.href = link.url
                a.textContent = link.name

                li.appendChild(a)
                ul.appendChild(li)
            })

            pdf_links_list_div.appendChild(ul)
        })
    }

    list()

})()
