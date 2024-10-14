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

    let projects_page = _ => {
        fetch(projectsUri).then(
            json => json.json()
        ).then(response => {
            $('#projectsListPage').empty();

            response.forEach(item => {
                $('#projectsListPage').append(`
                    <a href="${item.url}" target='_blank' class="project">
                        <h2>${ item.name }</h2>
                        <p>${ item.description }</p>
                    </a>
                `);
            });
        });
    };

    return {
        projects: () => { return projects() },
        projects_page: () => { return projects_page() }
    };

})();
