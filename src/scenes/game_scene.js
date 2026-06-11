import { textures } from "../constants.js"
import { drawTextbox } from "../gui/drawTextbox.js"
import { Container, Sprite, Text, TextStyle } from "pixi.js"
import { app } from "../main.js"
import { gsap } from "gsap"
import { process_lore } from "../lore/process_lore.js"
import { act1 } from "../lore/act1.js"


export const game_scene = (lore = []) => {
    const GAME_CONT = new Container()
    GAME_CONT.label = 'GAME_CONT'

    const MAIN_MENU_CONT = app.stage.getChildByLabel('MAIN_MENU', { deep: true })
    const WARNING_CONT = app.stage.getChildByLabel('WARNING_CONT', { deep: true })
    const WRITE_POEM_CONT = app.stage.getChildByLabel('WRITE_POEM_CONT', { deep: true })

    app.stage.removeChild(MAIN_MENU_CONT)
    app.stage.removeChild(WARNING_CONT)
    app.stage.removeChild(WRITE_POEM_CONT)

    GAME_CONT.alpha = 0

    const bg = textures.BG_RESIDENTIAL.texture
    const bgSprite = new Sprite(bg)
    const textboxCont = drawTextbox()

    bgSprite.width = app.screen.width
    bgSprite.height = app.screen.height

    bgSprite.label = 'bg'

    // Спрайты девчонок
    const sayoriSprite = new Sprite()
    const yuriSprite = new Sprite()
    const monikaSprite = new Sprite()
    const natsukiSprite = new Sprite()

    sayoriSprite.anchor.set(0.5, 0)
    sayoriSprite.position.set(app.screen.width / 2, 0)
    sayoriSprite.label = 'Сайори'
    sayoriSprite.alpha = 0
    sayoriSprite.visible = false

    yuriSprite.anchor.set(0.5, 0)
    yuriSprite.label = 'Юри'
    yuriSprite.alpha = 0
    yuriSprite.visible = false

    monikaSprite.anchor.set(0.5, 0)
    monikaSprite.label = 'Моника'
    monikaSprite.alpha = 0
    monikaSprite.visible = false

    natsukiSprite.anchor.set(0.5, 0)
    natsukiSprite.label = 'Нацуки'
    natsukiSprite.alpha = 0
    natsukiSprite.visible = false

    GAME_CONT.addChild(bgSprite)

    GAME_CONT.addChild(sayoriSprite)
    GAME_CONT.addChild(yuriSprite)
    GAME_CONT.addChild(monikaSprite)
    GAME_CONT.addChild(natsukiSprite)
    
    GAME_CONT.addChild(textboxCont)

    textboxCont.y -= 10

    app.stage.addChild(GAME_CONT)

    const clickable_lore = textboxCont.getChildByLabel('clickable_lore')

    gsap.to(GAME_CONT, {
        alpha: 1, duration: 1, onComplete: () => {
            let i = 0

            process_lore(lore, i)

            clickable_lore.on('pointerdown', () => {
                i++
                process_lore(act1, i)
            })
        }
    })
}