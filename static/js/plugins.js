mermaid.initialize()

document.addEventListener('DOMContentLoaded', function() {
    var mermaidCodeBlocks = document.querySelectorAll('pre.language-mermaid')

    mermaidCodeBlocks.forEach(function(block) {
        block.classList.remove('language-mermaid')
        block.classList.add('diagram-mermaid')
    })

    var blocks = document.querySelectorAll('.language-mermaid')

    blocks.forEach(function(block) {
        mermaid.init(undefined, block)
    })
})

Prism.initialize()

Prism.plugins.customIgnore = {
    beforeHighlight: function (env) {
        if (env.element.parentNode && env.element.parentNode.classList.contains('language-mermaid')) {
            env.code = ''
        }
    }
};

Prism.hooks.add('before-highlight', Prism.plugins.customIgnore)