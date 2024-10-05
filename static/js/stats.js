const Stats = ( _ => {

    let cookieName = 'stats';
    let referer = window.location.pathname.split('/');

    let add = _ => {
        if (!Utils.getCookie(cookieName) || Utils.getCookie(cookieName) != referer[2]) {
            if (referer[1] === 'blog' || referer[1] === 'docs') {
                let referer = window.location.pathname.split('/');

                fetch(`https://kremilly.accounts-3ae.workers.dev/views/${ referer[2] }?tipo=${ referer[1] }`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(
                    response => response.json()
                ).then(response => {
                    Utils.setCookie(cookieName, referer[2], 1);
                });
            }
        }
    };

    let get = _ => {
        let referer = window.location.pathname.split('/');

        if (referer[1] === 'blog' || referer[1] === 'docs') {
            fetch(`https://kremilly.accounts-3ae.workers.dev/views/${ referer[2] }?tipo=${ referer[1] }`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                response => response.json()
            ).then(response => {
                $('#stats-post').html(`
                    <div class='fas fa-chart-simple icon'></div>
                    ${ response.acessos + ' acessos' }
                `);
            });
        }
    };

    return {
        add: () => { return add() },
        get: () => { return get() },
    };

})();