$( e => {

    lazyload()
    Apis.checkApi()
    Projects.projects()
    ScrollTo.checkScroll()

    $('#tabApis').on('click', Apis.apis)
    $('#tabPins').on('click', Apis.pinned)
    $('#tabCrates').on('click', Apis.crates)
    $('#tabProjects').on('click', Apis.projects)

    $(window).on('scroll', ScrollTo.checkScroll)
    $('#scrollToTopBtn').on('click', ScrollTo.top)
    $('#postDownloadPdfBtn').on('click', Apis.downloadPdf)

    $('#apisProjectsListBtn').on('click', Projects.apis)
    $('#pinnedProjectsListBtn').on('click', Projects.pinned)
    $('#cratesProjectsListBtn').on('click', Projects.crates)
    $('#featuredProjectsListBtn').on('click', Projects.projects)

    $('#postTagsBtn').on('click', function () {
        $(this).toggleClass('actived')
        $('#postFlesBtn').removeClass('actived')

        $('#postFilesBox').hide()
        $('#postTagsBox').slideToggle(250)
    })

    $('#postShareBtn').on('click', function () {
        $(this).toggleClass('actived')
        $('#postShareBox').slideToggle(250)
    })

    $('#projectsBoxBtn').on('click', function () {
        $(this).toggleClass('actived')
        $('#projectsBox').slideToggle(250)
    })

    $('#postFilesBtn').on('click', function () {
        $(this).toggleClass('actived')
        $('#postTagsBtn').removeClass('actived')

        $('#postTagsBox').hide()
        $('#postFilesBox').slideToggle(250)
    })

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

    $('#postShareBoxInput').on('click', function () {
        $(this).focus()
        $(this).select()

        let inputVal = $(this).val()
        navigator.clipboard.writeText(inputVal)
    })

})
