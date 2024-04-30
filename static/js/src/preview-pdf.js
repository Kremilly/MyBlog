const PDFPreview = ( e => {

    const get_links = e => {
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

    get_links()
    
})()
