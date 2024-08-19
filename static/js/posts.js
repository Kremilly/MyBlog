$( _ => {

    lazyload();
    
    $('#postDownloadPdfBtn, #postDownloadPdfBtn2').on('click', Addons.downloadPdf);

    $('#postShareBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postShareBox').slideToggle(250);
    });

    $('#postFilesBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postLinksBtn').removeClass('actived');
        $('#postReadAlsoBtn').removeClass('actived');

        $('#postLinksBox').hide();
        $('#postReadAlsoBox').hide();
        $('#postFilesBox').slideToggle(250);
    });

    $('#postReadAlsoBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postLinksBtn').removeClass('actived');
        $('#postFilesBtn').removeClass('actived');

        $('#postLinksBox').hide();
        $('#postFilesBox').hide();
        $('#postReadAlsoBox').slideToggle(250);
    });

    $('#postLinksBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postFilesBtn').removeClass('actived');
        $('#postReadAlsoBtn').removeClass('actived');

        $('#postFilesBox').hide();
        $('#postReadAlsoBox').hide();
        $('#postLinksBox').slideToggle(250);
    });

    $('#postShareBoxInput').on('click', function () {
        $(this).focus();
        $(this).select();

        let inputVal = $(this).val();
        navigator.clipboard.writeText(inputVal);
    });

});
