const Cookies = ( _ => {

    let set = (name, value, days) => {
        const date = new Date();

        date.setTime(
            date.getTime() + (
                days * 24 * 60 * 60 * 1000
            )
        );

        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    };

    let get = name => {
        const cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return cookie ? cookie[2] : null;
    };

    return {
        get: (name) => { return get(name) },
        set: (name, value, days) => { return set(name, value, days) },
    };

})();
