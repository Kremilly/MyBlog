const Utils = ( _ => {

    let format = number => {
		if (number >= 1000) {
			return (number / 1000).toFixed(2) + 'k';
		} else {
			return number.toString();
		}
	};

    let langColor = language => {
        fetch(`https://gist.githubusercontent.com/Kremilly/0e2b5ac9779857efcf0e3fd6f62cd093/raw/112c3af99ed5db18776192609215353a18c28e9d/languages-hex-colors.json`, {
            method: 'GET',
            cache: 'default',
        }).then(
            response => response.json()
        ).then(colors => {
            document.querySelectorAll(language).forEach(element => {
                const lang = element.getAttribute('data-lang').toLowerCase();

                if (colors.hasOwnProperty(lang)) {
                    element.style.color = colors[lang];
                }
            });
        })
    };

    let removeAccents = text => {
        return text.replace(/\s+/g, '_')
                   .replace(/[áàãâä]/gi, 'a')
                   .replace(/[éèêë]/gi, 'e')
                   .replace(/[íìîï]/gi, 'i')
                   .replace(/[óòõôö]/gi, 'o')
                   .replace(/[úùûü]/gi, 'u')
                   .replace(/[ç]/gi, 'c')
                   .replace(/[?!.,;:']/g, '');
    };

    let capitalize = text => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    let getSlug = _ => {
        var pathname = window.location.pathname;
        return slug = pathname.split('/').pop();
    };

    let copy = element => {
        const range = document.createRange();
        range.selectNodeContents(element);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range); 

        navigator.clipboard.writeText(selection.toString());
    };

    return {
        getSlug: _ => { return getSlug() },
        copy: (element) => { return copy(element) },
        format: (number) => { return format(number) },
        capitalize: (text) => { return capitalize(text) },
        langColor: (language) => { return langColor(language) },
        removeAccents: (text) => { return removeAccents(text) },
    };

})();
