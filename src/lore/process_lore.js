import { typewriter } from "../typewriter"
import { app } from "../main"
import { textures } from "../constants"
import gsap from "gsap"

export const process_lore = (lore, i) => {
    const item = lore[i]

    // UI
    const namePanel = app.stage.getChildByLabel('namePanel', { deep: true }) // контейнер с именем (textbox)
    const nameText = app.stage.getChildByLabel('nameText', { deep: true }) // текст имени 
    const scenarioText = app.stage.getChildByLabel('scenario', { deep: true }) // текст сюжета
    const bg = app.stage.getChildByLabel('bg', { deep: true })
    const monikaSprite = app.stage.getChildByLabel('Моника', { deep: true })
    const yuriSprite = app.stage.getChildByLabel('Юри', { deep: true })
    const natsukiSprite = app.stage.getChildByLabel('Нацуки', { deep: true })
    const sayoriSprite = app.stage.getChildByLabel('Сайори', { deep: true })

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
    let activeSprites = []

    if (item.sprites) {
        // Сайори
        if (item.sprites.sayori) {
            activeSprites.push(sayoriSprite)
            sayoriSprite.texture = textures[item.sprites.sayori].texture
            if (!sayoriSprite.visible) {
                sayoriSprite.visible = true
                gsap.to(sayoriSprite, { alpha: 1, duration: 0.5 })
            }
        } else {
            if (sayoriSprite.visible) {
                gsap.to(sayoriSprite, {
                    alpha: 0, duration: 0.5, onComplete: () => {
                        sayoriSprite.visible = false
                    }
                })
            }
        }
        // Нацуки 
        if (item.sprites.natsuki) {
            activeSprites.push(natsukiSprite)
            natsukiSprite.texture = textures[item.sprites.natsuki].texture
            if (!natsukiSprite.visible) {
                natsukiSprite.visible = true
                gsap.to(natsukiSprite, { alpha: 1, duration: 0.5 })
            }
        } else {
            gsap.to(natsukiSprite, {
                alpha: 0, duration: 0.5, onComplete: () => {
                    natsukiSprite.visible = false
                }
            })
        }
        // Юри
        if (item.sprites.yuri) {
            activeSprites.push(yuriSprite)
            yuriSprite.texture = textures[item.sprites.yuri].texture
            if (!yuriSprite.visible) {
                yuriSprite.visible = true
                gsap.to(yuriSprite, { alpha: 1, duration: 0.5 })
            }
        } else {
            gsap.to(yuriSprite, {
                alpha: 0, duration: 0.5, onComplete: () => {
                    yuriSprite.visible = false
                }
            })
        }
        // Моника
        if (item.sprites.monika) {
            activeSprites.push(monikaSprite)
            monikaSprite.texture = textures[item.sprites.monika].texture
            if (!monikaSprite.visible) {
                monikaSprite.visible = true
                gsap.to(monikaSprite, { alpha: 1, duration: 0.5 })
            }
        } else {
            gsap.to(monikaSprite, {
                alpha: 0, duration: 0.5, onComplete: () => {
                    monikaSprite.visible = false
                }
            })
        }

    } else {
        gsap.to([sayoriSprite, monikaSprite, natsukiSprite, yuriSprite], {
            alpha: 0, duration: 0.5, onComplete: () => {
                sayoriSprite.visible = false
                monikaSprite.visible = false
                yuriSprite.visible = false
                natsukiSprite.visible = false
            }
        })
    }

    // Анимации
    if (item.anims) {
        if (item.anims.sayori) {
            if (item.anims.sayori === 'top-down') {
                gsap.to(sayoriSprite, { y: '-=5', duration: 0.15, yoyo: true, repeat: 1 })
            } else if (item.anims.sayori === 'down') {
                gsap.to(sayoriSprite, { y: '+=10', duration: 0.5 })
            }
        }
        if (item.anims.yuri) {
            if (item.anims.yuri === 'top-down') {
                gsap.to(yuriSprite, { y: '-=5', duration: 0.15, yoyo: true, repeat: 1 })
            } else if (item.anims.yuri === 'down') {
                gsap.to(yuriSprite, { y: '+=10', duration: 0.5 })
            }
        }
        if (item.anims.natsuki) {
            if (item.anims.natsuki === 'top-down') {
                gsap.to(natsukiSprite, { y: '-=5', duration: 0.15, yoyo: true, repeat: 1 })
            } else if (item.anims.natsuki === 'down') {
                gsap.to(natsukiSprite, { y: '+=10', duration: 0.5 })
            }
        }
        if (item.anims.monika) {
            if (item.anims.monika === 'top-down') {
                gsap.to(monikaSprite, { y: '-=5', duration: 0.15, yoyo: true, repeat: 1 })
            } else if (item.anims.monika === 'down') {
                gsap.to(monikaSprite, { y: '+=10', duration: 0.5 })
            }
        }
    }
}