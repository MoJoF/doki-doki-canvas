import { Application } from "pixi.js";
import { R } from './reactifyInstance.js'

// import { textures, loadTextures, sounds } from './constants'
import { drawTextbox } from "./gui/drawTextbox";
import { typewriter } from "./typewriter";
import { main_menu_scene } from "./scenes/main_menu_scene";
import { game_scene } from "./scenes/game_scene";
import { write_poem_scene } from "./scenes/write_poem_scene";
import { warning_scene } from "./scenes/warning_scene";
import { act1 } from "./lore/act1";
import "./constants.js"
import "./modules/mainModule.js"


export const app = new Application()

await app.init({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x121212,
    webgl: { antialias: true },
    webgpu: { antialias: false },
});

R.emit('app.initialized')

globalThis.__PIXI_APP__ = app;

document.body.appendChild(app.canvas)

window.CURRENT_SCENE = "WARNING"

// Глобальный массив с лором
window.lore = []

// Текущий элемент для ввода текста
window.currentInput = ""
// Задержка между выводом символов
window.intervalText = 0.25

// Текущая музыка
window.currentMusic = new Audio()
window.currentMusic.loop = true
window.currentMusic.volume = 0.75


// Имя игрока
window.playerName = "[NONE]"

window.playMusic = (src) => {
    if (!window.currentMusic.currentSrc) {
        window.currentMusic.pause()
        window.currentMusic.currentTime = 0
    }
    window.currentMusic.src = src
    window.currentMusic.play()
}

R.on('textures.loaded', () => {
    if (window.CURRENT_SCENE === 'MAIN_MENU') {
        main_menu_scene()
    } else if (window.CURRENT_SCENE === 'GAME') {
        game_scene(act1)
    } else if (window.CURRENT_SCENE === 'WRITE_POEM') {
        write_poem_scene()
    } else if (window.CURRENT_SCENE === 'WARNING') {
        warning_scene()
    }
})



window.addEventListener('keydown', e => {
    const ignoredKeys = ['Enter', 'Escape', 'Shift', 'Control', 'Alt', 'Tab', 'CapsLock', 'Meta'];
    if (ignoredKeys.includes(e.key)) return;

    if (e.key === 'Backspace') {
        if (currentInput.text.length > 0) {
            currentInput.text = currentInput.text.slice(0, -1);
        }
        return;
    }

    if (e.key.length === 1) {
        currentInput.text += e.key;
    }
});
