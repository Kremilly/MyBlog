const PDFPreview = ( e => {

    const getLinks = e => {
        var links = document.querySelectorAll('a')

        links.forEach( link => {
            link.addEventListener('mouseenter', e => {
                if (link.href.endsWith('.pdf')) {
                    console.log(link.href)
                }
            })

            link.addEventListener('mouseleave', e => {
                // TODO
            })
        })
    }

    getLinks()
    
})()
