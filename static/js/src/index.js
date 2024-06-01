$( e => {

    lazyload()

    Apis.checkApi()
    
    ScrollTo.checkScroll()

    $('#tabApis').on('click', Apis.apis)
    $('#tabPins').on('click', Apis.pinned)
    $('#tabCrates').on('click', Apis.crates)
    $('#scrollToTopBtn').on('click', ScrollTo.top)
    $('#postDownloadPdfBtn').on('click', Apis.downloadPdf)

    $('#postShareBtn').on('click', function () {
        $(this).toggleClass('actived')
        $('#postShareBox').fadeToggle(250)
    })

    $('#postTagsBtn').on('click', function () {
        $('.left-btn').removeClass('actived')
        $(this).toggleClass('actived')

        $('.box').hide()
        $('#postTagsBox').slideToggle(250)
    })

    $('#postFilesBtn').on('click', function () {
        $('.left-btn').removeClass('actived')
        $(this).toggleClass('actived')

        $('.box').hide()
        $('#postFilesBox').slideToggle(250)
    })

    $('#postShareBoxInput').on('click', function () {
        $(this).focus()
        $(this).select()

        navigator.clipboard.writeText(
            $(this).val()
        )
    })

    $(window).on('scroll', ScrollTo.checkScroll)

    $('.featured-search').on('input', function () {
        var searchText = $(this).val().toLowerCase()

        $('.featured-body > .featured-item').each( function () {
            var listItemText = $(this).text().toLowerCase()

            if (listItemText.includes(searchText)) {
                $(this).show()
            } else {
                $(this).hide()
            }
        })
    })

})