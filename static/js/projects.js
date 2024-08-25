const Projects = ( _ => {

    let projectsUri = window.location.href.replace(window.location.href, '') + '/api/projects';

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
                        ${ item.name }
                        <div class='description'>${ item.description }</div>
                    </a>
                `);
            });
        });
    };

    return {
        projects: () => { return projects() },
    };

})();
