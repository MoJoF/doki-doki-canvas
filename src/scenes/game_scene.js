import { textures, sounds } from "../constants.js"
import { drawTextbox } from "../gui/drawTextbox.js"
import { Container, Graphics, Sprite, Text, TextStyle } from "pixi.js"
import { app } from "../main.js"
import { gsap } from "gsap"
import { process_lore } from "../lore/process_lore.js"
import { act1 } from "../lore/act1.js"
import { GameMenuPanel } from "../gui/GameMenuPanel.js"


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
    yuriSprite.position.set(app.screen.width / 2, 0)
    yuriSprite.label = 'Юри'
    yuriSprite.alpha = 0
    yuriSprite.visible = false

    monikaSprite.anchor.set(0.5, 0)
    monikaSprite.position.set(app.screen.width / 2, 0)
    monikaSprite.label = 'Моника'
    monikaSprite.alpha = 0
    monikaSprite.visible = false

    natsukiSprite.anchor.set(0.5, 0)
    natsukiSprite.position.set(app.screen.width / 2, 0)
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

    const clickable_lore = textboxCont.getChildByLabel('clickable_lore')

    // Подменю
    const GameMenuCont = GameMenuPanel()
    GAME_CONT.addChild(GameMenuCont)

    const GameMenuHeader = GAME_CONT.getChildByLabel('GAME_MENU_HEADER', { deep: true })

    gsap.to(GAME_CONT, {
        alpha: 1, duration: 1, onComplete: () => {
            let i = 86

            process_lore(lore, i)

            clickable_lore.on('pointerdown', () => {
                i++
                process_lore(lore, i)
            })
        }
    })

    const historyBtn = GAME_CONT.getChildByLabel('HISTORY_BUTTON_TEXTBOX', { deep: true })
    const skipBtn = GAME_CONT.getChildByLabel('SKIP_BUTTON_TEXTBOX', { deep: true })
    const autoBtn = GAME_CONT.getChildByLabel('AUTO_BUTTON_TEXTBOX', { deep: true })
    const saveBtn = GAME_CONT.getChildByLabel('SAVE_BUTTON_TEXTBOX', { deep: true })
    const loadBtn = GAME_CONT.getChildByLabel('LOAD_BUTTON_TEXTBOX', { deep: true })
    const settingsBtn = GAME_CONT.getChildByLabel('SETTINGS_BUTTON_TEXTBOX', { deep: true })

    historyBtn.on('pointerdown', () => {
        GameMenuCont.visible = true
        GameMenuHeader.text = "История"
        gsap.to(GameMenuCont, { alpha: 1, duration: 1.5 })
    })

    skipBtn.on('pointerdown', () => {
        alert("Кнопка \"Пропустить\". Пока что тут просто заглушка.")
    })

    autoBtn.on('pointerdown', () => {
        alert("Кнопка \"Авто\". Пока что тут просто заглушка.")
    })

    saveBtn.on('pointerdown', () => {
        GameMenuCont.visible = true
        GameMenuHeader.text = "Сохранить"
        gsap.to(GameMenuCont, { alpha: 1, duration: 1.5 })
    })

    loadBtn.on('pointerdown', () => {
        GameMenuCont.visible = true
        GameMenuHeader.text = "Загрузить"
        gsap.to(GameMenuCont, { alpha: 1, duration: 1.5 })
    })

    settingsBtn.on('pointerdown', () => {
        GameMenuCont.visible = true
        GameMenuHeader.text = "Настройки"
        gsap.to(GameMenuCont, { alpha: 1, duration: 1.5 })
    })

    // Отработка событий в боковом меню для модалки
    // Кнопка "Назад"
    const backButton = GameMenuCont.getChildByLabel('BACK_BUTTON', { deep: true })
    backButton.on('pointerdown', () => {
        window.playSound(sounds.SELECT.src)
        gsap.to(GameMenuCont, {
            alpha: 0, duration: 1, onComplete: () => {
                GameMenuCont.visible = false
            }
        })
    })

    // Кнопка "Помощь"
    const helpButton = GameMenuCont.getChildByLabel('HELP_BUTTON', { deep: true })
    helpButton.on('pointerdown', () => {
        window.playSound(sounds.SELECT.src)
        window.open('/README.html', '_blank')
    })



    const debugPanel = new Graphics().roundRect(25, 25, 50, 30, 3).fill('rgba(0,0,0,0.75)')
    debugPanel.label = "DebugPanel"
    const t = new Text({
        text: "i: ",
        style: new TextStyle({
            fontFamily: "Trebuchet MS",
            fontSize: 16,
            fill: "#ffffff",
        })
    })

    t.label = "debugIndexText"
    t.position.set(30, 30)
    debugPanel.addChild(t)

    GAME_CONT.addChild(debugPanel)
    app.stage.addChild(GAME_CONT)
}