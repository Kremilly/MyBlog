$( e => {

    lazyload()
    Apis.checkApi()
    Projects.projects()
    ScrollTo.checkScroll()

    var hideMenuTimeout

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

    $('#toggleMenuBox, #menuBox').hover(function () {
        clearTimeout(hideMenuTimeout)
        $('#toggleMenuBox').addClass('actived-menu')
        $('#menuBox').stop(true, true).fadeIn(250)
    }, function () {
        hideMenuTimeout = setTimeout(function() {
            $('#toggleMenuBox').removeClass('actived-menu')
            $('#menuBox').stop(true, true).fadeOut(250)
        }, 300)
    })

    $('#projectsBoxBtn, #projectsBox').hover(function () {
        clearTimeout(hideMenuTimeout)
        $('#projectsBoxBtn').addClass('actived-logo')
        $('#projectsBox').stop(true, true).fadeIn(250)
    }, function () {
        hideMenuTimeout = setTimeout(function() {
            $('#projectsBoxBtn').removeClass('actived-logo')
            $('#projectsBox').stop(true, true).fadeOut(250)
        }, 300)
    })

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
