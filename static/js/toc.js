$( e => {

    var tocList = $('#tocList');
    var headers = $('h1, h2, h3');
    var currentHash = window.location.hash;

    $('#tocBoxBtn').click( function () {
        $(this).toggleClass('actived');
        $('#tocBox').slideToggle(250);
    });

    $('#searchToc').on('input', function () {
        var searchText = $(this).val().toLowerCase();

        $('#tocList > a').each( function () {
            var listItemText = $(this).text().toLowerCase();

            if (listItemText.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });


    headers.each( function () {
        var header = $(this);

        if (!header.attr('id')) {
            var sanitizedId = header.text().replace(/\s+/g, '_')
                                           .replace(/[áàãâä]/gi, 'a')
                                           .replace(/[éèêë]/gi, 'e')
                                           .replace(/[íìîï]/gi, 'i')
                                           .replace(/[óòõôö]/gi, 'o')
                                           .replace(/[úùûü]/gi, 'u')
                                           .replace(/[ç]/gi, 'c')
                                           .replace(/[?!.,;:']/g, '');

            header.attr('id', sanitizedId);
        }

        var link = $('<a/>')
                        .text(header.text())
                        .attr('class', 'toc')
                        .attr('href', '#' + header.attr('id'));

        tocList.append(link);
    });

    if (window.location.pathname !== '/') {
        tocList.on('click', 'a', function () {
            var targetOffset = $(
                $(this).attr('href')
            ).offset().top;

            $('html, body').animate({
                scrollTop: targetOffset - 50
            }, 800);
        });
    }

    if (currentHash && window.location.pathname !== '/') {
        $('html, body').animate({
            scrollTop: $(currentHash).offset().top - 50
        }, 800);
    }

});