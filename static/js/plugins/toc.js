$( e => {

    var toc = $('#featuredList')
    var headings = $('h1, h2, h3')
    var fragment = window.location.hash

    headings.each(function() {
        var heading = $(this)

        if (!heading.attr('id')) {
            heading.attr(
                'id', heading.text().replace(
                    /\s+/g, '_'
                )
            )
        }

        toc.append(
            $('<a/>').append().text(
                heading.text()
            ).attr(
                'href', '#' + heading.attr('id')
            ).attr(
                'class', 'toc featured-item'
            )
        )
    })

    if (window.location.pathname != '/') {
        toc.on('click', 'a', function () {
            var targetOffset = $(
                $(this).attr('href')
            ).offset().top
    
            $('html, body').animate({
                scrollTop: targetOffset - 50
            }, 800)
        })
    }

    if (fragment && window.location.pathname != '/') {
        $('html, body').animate({
            scrollTop: $(fragment).offset().top - 50
        }, 800)
    }

})