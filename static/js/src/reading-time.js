const ReadingTime = ( e => {

    const getPageContent = e => {
        let textContent = ''
        let articleElement = document.querySelector('article.markdown-body')

        if (articleElement) {
            textContent = articleElement.textContent || articleElement.innerText
        }

        return textContent
    }

    const calculateReadingTime = (wordsPerMinute = 200) => {
        let removeTags = getPageContent().replace(/<[^>]*>/g, '')
        let cleanText = removeTags.replace(/[^\w\s]/g, '').trim()

        let words = cleanText.split(/\s+/)
        let timeCalculated = Math.round(words.length / wordsPerMinute)

        if (timeCalculated > 1) {
            return Math.round(
                words.length / wordsPerMinute
            ) + ' minutes'
        }

        return 'Less than a minute'
    }
    
})()
