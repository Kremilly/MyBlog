$( e => {

    lazyload();

    Apis.checkApi();

    $("#tocPage").toc();

    $('#tabApis').on('click', Apis.apis);
    $('#tabPins').on('click', Apis.pinned);
    $('#tabCrates').on('click', Apis.crates);
    $('#scrollToTopBtn').on('click', ScrollTo.top);

    $(window).on('scroll', ScrollTo.checkScroll);

    $('#searchItemsFeatured').on('input', function () {
        var searchText = $(this).val().toLowerCase()

        $('#featuredList > .item').each( function () {
            var listItemText = $(this).text().toLowerCase()

            if (listItemText.includes(searchText)) {
                $(this).show()
            } else {
                $(this).hide()
            }
        })
    })

})