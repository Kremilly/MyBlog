$( _ => {

    lazyload();
    
    $('#postDownloadPdfBtn, #postDownloadPdfBtn2').on('click', Addons.downloadPdf);

    $('#postShareBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postShareBox').slideToggle(250);
    });

    $('#postReadAlsoBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postLinksBtn').removeClass('actived');
        $('#postFilesBtn').removeClass('actived');

        $('#postLinksBox').hide();
        $('#postFilesBox').hide();
        $('#postReadAlsoBox').slideToggle(250);
    });

    $('#postShareBoxInput').on('click', function () {
        $(this).focus();
        $(this).select();

        let inputVal = $(this).val();
        navigator.clipboard.writeText(inputVal);
    });

});
