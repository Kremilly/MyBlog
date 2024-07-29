$( _ => {

    Addons.sourceCode();

    $('#downloadQrCodeBtn').on('click', Addons.qrCodeDownload);

    $('#toolsBoxBtn').on('click', function () {
        $(this).toggleClass('actived');
        $('#tocBoxBtn').removeClass('actived');
        
        $('#tocBox').slideUp(250);
        $('#toolsBox').slideToggle(250);
    });

    $('#sourceCodePageBtn').on('click', function () {
        $('#toolsBoxBtn').click();
        $('#sourceCodePageModal').fadeIn(250);
    });

    $('#sourceCodePageCloseBtn').on('click', function () { $('#sourceCodePageModal').fadeOut(250); });

});
