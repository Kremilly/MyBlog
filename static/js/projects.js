const Projects = ( _ => {

    let projectsUri = window.location.href.replace(window.location.href, '') + '/api/projects';

    let featured = _ => {
        fetch(projectsUri).then(
            json => json.json()
        ).then(response => {
            window.location.hash = 'projects';

            $('.featured-tabs').removeClass('actived');
            $('#tabProjects').toggleClass('actived');

            $('#featuredList').empty();

            response.forEach(item => {
                $('#featuredList').append(`
                    <a href='${item.url}' target='_blank' class='item featured-item'>
                        <div class='name'>${ Utils.capitalize(item.name) }</div>
                    </a>
                `);
            });

            $('#featured').show();
        })
    };

    let projects = _ => {
        fetch(projectsUri).then(
            json => json.json()
        ).then(response => {
            $('#featuredProjectsListBtn').addClass('actived');

            $('#apisProjectsListBtn').removeClass('actived');
            $('#pinnedProjectsListBtn').removeClass('actived');
            $('#cratesProjectsListBtn').removeClass('actived');

            $('#projectsList').empty();

            response.forEach(item => {
                $('#projectsList').append(`
                    <a href='${item.url}' target='_blank' class='item project-item'>
                        ${item.name}
                    </a>
                `);
            });
        });
    };

    return {
        featured: () => { return featured() },
        projects: () => { return projects() },
    };

})();
