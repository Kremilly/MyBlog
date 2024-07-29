$( _ => {

    lazyload();
    
    $('#postDownloadPdfBtn').on('click', Addons.downloadPdf);

    $('#postShareBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postShareBox').slideToggle(250);
    });

    $('#postTagsBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postFlesBtn').removeClass('actived');
        $('#postLinksBtn').removeClass('actived');
        $('#postReadAlsoBtn').removeClass('actived');

        $('#postFilesBox').hide();
        $('#postLinksBox').hide();
        $('#postReadAlsoBox').hide();
        $('#postTagsBox').slideToggle(250);
    });

    $('#postFilesBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postTagsBtn').removeClass('actived');
        $('#postLinksBtn').removeClass('actived');
        $('#postReadAlsoBtn').removeClass('actived');

        $('#postTagsBox').hide();
        $('#postLinksBox').hide();
        $('#postReadAlsoBox').hide();
        $('#postFilesBox').slideToggle(250);
    });

    $('#postReadAlsoBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postTagsBtn').removeClass('actived');
        $('#postLinksBtn').removeClass('actived');
        $('#postFilesBtn').removeClass('actived');

        $('#postTagsBox').hide();
        $('#postLinksBox').hide();
        $('#postFilesBox').hide();
        $('#postReadAlsoBox').slideToggle(250);
    });

    $('#postLinksBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postTagsBtn').removeClass('actived');
        $('#postFilesBtn').removeClass('actived');
        $('#postReadAlsoBtn').removeClass('actived');

        $('#postTagsBox').hide();
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
