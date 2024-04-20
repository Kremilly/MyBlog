mermaid.initialize({
    theme: 'dark',
    securityLevel: 'loose',
})

document.addEventListener('DOMContentLoaded', function() {
    let mermaidCodeBlocks = document.querySelectorAll('pre.language-mermaid');

    mermaidCodeBlocks.forEach( block => {
        block.classList.remove('language-mermaid')
        block.classList.add('diagram-mermaid')
    })

    mermaidCodeBlocks.forEach( block => {
        let diagramDiv = document.createElement('div')
        diagramDiv.classList.add('mermaid')
        
        diagramDiv.textContent = block.textContent

        block.textContent = ''
        block.appendChild(diagramDiv)

        mermaid.init(undefined, diagramDiv)
    })

    let renderMarkdownToHTML = (markdownText) => {
        var md = window.markdownit()
        return md.render(markdownText)
    }

    document.querySelectorAll('p').forEach(function(paragraph) {
        var markdownText = paragraph.textContent.trim()
        
        if (markdownText.startsWith('|')) {
            var htmlOutput = renderMarkdownToHTML(markdownText)
            paragraph.innerHTML = htmlOutput.trim()
        }
    })
})