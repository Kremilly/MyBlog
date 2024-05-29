const ReadingTime = ( e => {

    const getPageContent = e => {
        let textContent = ''
        let articleElement = document.querySelector('article.post-content')

        if (articleElement) {
            textContent = articleElement.textContent || articleElement.innerText
        }

        return textContent
    }

    const calculateReadingTime = e => {
        let wordsPerMinute = 200

        let words = getPageContent().replace(
            /<[^>]*>/g, ''
        ).replace(
            /[^\w\s]/g, ''
        ).trim().split(/\s+/)

        let timeCalculated = Math.round(words.length / wordsPerMinute)

        if (timeCalculated > 1) {
            return Math.round(
                words.length / wordsPerMinute
            ) + ' minutes'
        }

        return 'Less than a minute'
    }

    return {
        calculateReadingTime: calculateReadingTime
    }
    
})()
