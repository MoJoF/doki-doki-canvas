import { typewriter } from "../typewriter"
import { app } from "../main"
import { textures } from "../constants"
import gsap from "gsap"
import { anims_process } from "./anims_process"
import { sprites_existing_process } from "./sprites_existing_process"



export const process_lore = (lore, i) => {
    const item = lore[i]

    // UI
    const debugIndexText = app.stage.getChildByLabel('debugIndexText', { deep: true })
    const namePanel = app.stage.getChildByLabel('namePanel', { deep: true }) // контейнер с именем (textbox)
    const nameText = app.stage.getChildByLabel('nameText', { deep: true }) // текст имени 
    const scenarioText = app.stage.getChildByLabel('scenario', { deep: true }) // текст сюжета
    const bg = app.stage.getChildByLabel('bg', { deep: true }) // Спрайт с фоном
    const monikaSprite = app.stage.getChildByLabel('Моника', { deep: true }) // Спрайт Моники
    const yuriSprite = app.stage.getChildByLabel('Юри', { deep: true }) // Спрайт Юри
    const natsukiSprite = app.stage.getChildByLabel('Нацуки', { deep: true }) // Спрайт Нацуки
    const sayoriSprite = app.stage.getChildByLabel('Сайори', { deep: true }) // Спрайт Сайори

    debugIndexText.text = `i: ${i}`

    // Обработка вывода текста
    if (item.text) {
        typewriter(item.text.replaceAll('player', window.playerName), scenarioText)
    }

    // Если есть имя человека для диалога
    if (item.name) {
        nameText.text = item.name === 'player' ? window.playerName : item.name
        namePanel.visible = true
    } else {
        nameText.text = ''
        namePanel.visible = false
    }

    // Выставляем задний фон
    if (item.bg && bg) {
        const targetTexture = textures[item.bg]?.texture

        if (targetTexture) {
            bg.texture = targetTexture

            gsap.to([sayoriSprite, monikaSprite, natsukiSprite, yuriSprite], {
                alpha: 0, duration: 0.5, onComplete: () => {
                    sayoriSprite.visible = false
                    monikaSprite.visible = false
                    yuriSprite.visible = false
                    natsukiSprite.visible = false
                }
            })
        } else {
            console.error('Ошибка загрузки текстуры...')
        }
    }

    // Если есть музыка
    if (item.music) {
        // Останавливаем музыку
        if (item.music === 'no') {
            currentMusic.pause()
            currentMusic.currentTime = 0
        } else {
            playMusic(item.music)
        }
    }

    // Определяем, должны ли быть спрайты на сцене
    const activeSprites = sprites_existing_process(item, { sayoriSprite, natsukiSprite, yuriSprite, monikaSprite }, textures)

    // Анимации
    anims_process(item, { sayoriSprite, natsukiSprite, yuriSprite, monikaSprite })
}