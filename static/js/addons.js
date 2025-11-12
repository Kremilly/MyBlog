const Addons = ( _ => {

    let downloadPdf = _ => {
        let endpoint = window.location.href.split('#')[0].replace(
            '/blog', '/api/export/blog'
        );

        fetch(endpoint).then(response => {
            if (!response.ok) { throw new Error('Network response was not ok') }
            return response.url
        }).then( url => {
            const a = document.createElement('a');

            a.href = url;
            a.download = Utils.getSlug() + '.pdf';
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
        }).catch(error => {
            console.error('There was an error with the fetch operation:', error);
        });
    };

    return {
        downloadPdf: _ => { return downloadPdf() },
    };

})();
