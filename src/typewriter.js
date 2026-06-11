import { app } from './main'

export const typewriter = (fullText, t, typingSpeed = window.intervalText) => {
    t.text = ""
    let currentLength = 0
    let timer = 0

    app.ticker.add((ticker) => {
        timer += ticker.deltaTime

        if (timer >= typingSpeed && currentLength < fullText.length) {
            currentLength++
            t.text = fullText.substring(0, currentLength)
            timer = 0
        }
    })
}