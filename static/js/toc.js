$( e => {

    let paddingTop = 60;
    let timerAnimate = 800;
    
    let tocList = $('#tocList');
    let headers = $('h1, h2, h3');
    let currentHash = window.location.hash;

    let cleanTocHeader = (text) => {
        return text.replace(/\s+/g, '_')
                   .replace(/[áàãâä]/gi, 'a')
                   .replace(/[éèêë]/gi, 'e')
                   .replace(/[íìîï]/gi, 'i')
                   .replace(/[óòõôö]/gi, 'o')
                   .replace(/[úùûü]/gi, 'u')
                   .replace(/[ç]/gi, 'c')
                   .replace(/[?!.,;:']/g, '');
    };

    $('#tocBoxBtn').click( function () {
        $(this).toggleClass('actived');
        $('#tocBox').slideToggle(250);
    });

    $('#searchToc').on('input', function () {
        let searchText = $(this).val().toLowerCase();

        $('#tocList > a').each( function () {
            let listItemText = $(this).text().toLowerCase();

            if (listItemText.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    headers.each( function () {
        let header = $(this);

        if (!header.attr('id')) {
            let sanitizedId = cleanTocHeader(header.text());
            header.attr('id', sanitizedId);
        }

        let link = $('<a/>').text(
            header.text()
        ).attr(
            'href', '#' + header.attr('id')
        );

        tocList.append(link);
    });

    if (window.location.pathname !== '/') { 
        tocList.on('click', 'a', function () {
            let targetOffset = $(
                $(this).attr('href')
            ).offset().top;

            $('html, body').animate({
                scrollTop: targetOffset - paddingTop
            }, timerAnimate);
        });
    }

    if (currentHash && window.location.pathname !== '/') {
        $('html, body').animate({
            scrollTop: $(currentHash).offset().top - paddingTop
        }, timerAnimate);
    }

});