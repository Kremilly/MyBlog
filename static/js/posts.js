$( _ => {

    lazyload();
    
    $('#postDownloadPdfBtn, #postDownloadPdfBtn2').on('click', Addons.downloadPdf);

    $('#postReadAlsoBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#postLinksBtn').removeClass('actived');
        $('#postFilesBtn').removeClass('actived');

        $('#postLinksBox').hide();
        $('#postFilesBox').hide();
        $('#postReadAlsoBox').slideToggle(250);
    });

});
