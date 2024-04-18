mermaid.initialize();

document.addEventListener('DOMContentLoaded', function() {
    var blocks = document.querySelectorAll('.language-mermaid')

    blocks.forEach(function(block) {
        mermaid.init(undefined, block)
    })
})
