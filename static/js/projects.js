const Projects = ( _ => {

    let projectsUri = window.location.href.replace(window.location.href, '') + '/api/projects';

    let projects_page = _ => {
        fetch(projectsUri).then(
            json => json.json()
        ).then(response => {
            $('#featuredListPage').empty();

            response.forEach(item => {
                $('#featuredListPage').append(`
                    <a href="${item.url}" target='_blank' class="project">
                        <h2>${ item.name }</h2>
                        <p>${ item.description }</p>
                    </a>
                `);
            });
        });
    };

    return {
        projects_page: () => { return projects_page() }
    };

})();
