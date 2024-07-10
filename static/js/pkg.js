$( _ => {

    $('#pkgBoxBtn').click( function () {
        $('#tocBoxBtn').removeClass('actived');
        $(this).toggleClass('actived');

        $('#tocBox').slideUp();
        $('#pkgBox').slideToggle(250);
    });

    $('#copyPkgCmd').click(function() {
        $(this).select();

        let inputVal = $(this).val();
        navigator.clipboard.writeText(inputVal);
    });

});