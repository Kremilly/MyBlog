$(document).ready( function() {

    var toc = $("#tocPage");
    var headings = $("h1, h2, h3");

    headings.each(function() {
        var heading = $(this);

        if (!heading.attr("id")) {
            heading.attr(
                "id", heading.text().replace(/\s+/g, "_")
            );
        }

        toc.append(
            $("<a/>").append().text(
                heading.text()
            ).attr(
                "href", "#" + heading.attr("id")
            ).attr(
                "class", "toc"
            )
        );
    });

    toc.on("click", "a", function(event) {
        var targetOffset = $(
            $(this).attr("href")
        ).offset().top;

        $("html, body").animate({
            scrollTop: targetOffset - 50
        }, 800);
    });

    var fragment = window.location.hash;
    if (fragment) {
        var targetOffset = $(fragment).offset().top;
        $("html, body").animate({
            scrollTop: targetOffset - 50
        }, 800);
    }

});