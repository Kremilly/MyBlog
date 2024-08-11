const Wikipedia = ( _ => {

    let endpoint = 'https://api.kremilly.com/wikipedia';

    let get = _ => {
        if ($('.wikipedia').length) {
            $('.wikipedia-page-content').each( function () {
                let text = $(this).text().replace(
                    "\n", ''
                ).split('/');

                fetch(`${ endpoint }?location=${ text[0] }&term=${ text[1] }&short_summary=true`).then(
                    json => json.json()
                ).then( response => {
                    $(this).html(response.summary);
                    $(this).attr('href', response.page_url);
                });
            });
        }
    };

    return {
        get: () => { return get() },
    };

})();
