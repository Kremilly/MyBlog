const PDFPreview = ({

    get_links () {
        var links = document.querySelectorAll('a')

        links.forEach( link => {
            link.addEventListener('mouseenter', e => {
                if (link.href.toLowerCase().endsWith('.pdf')) {
                    console.log(link.href)
                }
            })

            link.addEventListener('mouseleave', e => {
                // TODO
            })
        })
    },
    
})