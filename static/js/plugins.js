// mermaid version 10.9.0

mermaid.initialize()

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
})
