import { R } from "../../reactifyInstance"

const currentSound = new Audio()
currentSound.volume = 1

R.emit('module.sound:ready', { volume: currentSound.volume })

R.on('sound.play', sound => {
    if (!currentSound.currentSrc) {
        currentSound.pause()
        currentSound.currentTime = 0
    }
    currentSound.src = sound.src
    currentSound.play()
})

R.on('sound.change', sound => {
    currentSound.volume = sound.volume
})