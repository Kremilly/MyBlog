const Projects = ( e => {

    let apisList = e => {
        fetch(Apis.apiUri).then(
            json => json.json()
        ).then(response => {
            $('#apisProjectsListBtn').addClass('actived')

            $('#pinnedProjectsListBtn').removeClass('actived')
            $('#cratesProjectsListBtn').removeClass('actived')
            $('#featuredProjectsListBtn').removeClass('actived')

            $('#projectsList').empty()

            response.list.forEach(item => {
                $('#projectsList').append(`
                    <a href='${item.wiki}' target='_blank' class='item project-item'>
                        ${_.capitalize(item.name)}
                    </a>
                `)
            })
        })
    }

    let pinnedList = e => {
        fetch(`${Apis.apiUri}/github?user=${ Apis.username }`).then(
            json => json.json()
        ).then(response => {
            $('#pinnedProjectsListBtn').addClass('actived')

            $('#apisProjectsListBtn').removeClass('actived')
            $('#cratesProjectsListBtn').removeClass('actived')
            $('#featuredProjectsListBtn').removeClass('actived')

            $('#projectsList').empty()

            response.forEach(item => {
                $('#projectsList').append(`
                    <a href='${item.url}' target='_blank' class='item project-item'>
                        ${item.name}
                    </a>
                `)
            })
        })
    }

    let projectsList = e => {
        fetch(Apis.projectsUri).then(
            json => json.json()
        ).then(response => {
            $('#featuredProjectsListBtn').addClass('actived')

            $('#apisProjectsListBtn').removeClass('actived')
            $('#pinnedProjectsListBtn').removeClass('actived')
            $('#cratesProjectsListBtn').removeClass('actived')

            $('#projectsList').empty()

            response.forEach(item => {
                $('#projectsList').append(`
                    <a href='${item.url}' target='_blank' class='item project-item'>
                        ${item.name}
                    </a>
                `)
            })
        })
    }

    let cratesList = e => {
        fetch(Apis.cratesURI).then(
            json => json.json()
        ).then(response => {
            $('#cratesProjectsListBtn').addClass('actived')

            $('#apisProjectsListBtn').removeClass('actived')
            $('#pinnedProjectsListBtn').removeClass('actived')
            $('#featuredProjectsListBtn').removeClass('actived')

            $('#projectsList').empty()

            response.crates.forEach(item => {
                console.log(item)

                $('#projectsList').append(`
                    <a href='https://crates.io/crates/${item.name}' target='_blank' class='item project-item'>
                        ${_.capitalize(item.name)}
                    </a>
                `)
            })
        })
    }

    return {
        apis: () => { return apisList() },
        crates: () => { return cratesList() },
        pinned: () => { return pinnedList() },
        projects: () => { return projectsList() },
    }

})()
