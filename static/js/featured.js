$( _ => {

    Projects.projects();

    $('#apisProjectsListBtn').on('click', Apis.projects);
    $('#pinnedProjectsListBtn').on('click', GitHub.projects);
    $('#cratesProjectsListBtn').on('click', Crates.projects);
    $('#featuredProjectsListBtn').on('click', Projects.projects);

});
