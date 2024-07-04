$( _ => {

    Apis.checkApi();
    Projects.projects();

    $('#tabApis').on('click', Apis.featured);
    $('#tabPins').on('click', GitHub.featured);
    $('#tabCrates').on('click', Crates.featured);
    $('#tabProjects').on('click', Projects.featured);

    $('#apisProjectsListBtn').on('click', Apis.projects);
    $('#pinnedProjectsListBtn').on('click', GitHub.projects);
    $('#cratesProjectsListBtn').on('click', Crates.projects);
    $('#featuredProjectsListBtn').on('click', Projects.projects);

    $('.featured-search').on('input', function () {
        var searchText = $(this).val().toLowerCase();

        $('.featured-body > .featured-item').each( function () {
            var listItemText = $(this).text().toLowerCase();

            if (listItemText.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

});
