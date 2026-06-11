import { textures, musics, sounds } from "../constants.js"
import { Container, TilingSprite, Sprite, Text, TextStyle, wordWrap, Graphics } from "pixi.js"
import { app } from "../main.js"
import { game_scene } from "./game_scene.js"
import { nameInput } from "../gui/nameInput.js"
import { loadMenu } from "../gui/loadMenu.js"
import { settingsMenu } from "../gui/settingsMenu.js"
import gsap from "gsap"


export const main_menu_scene = () => {
    const MAIN_MENU_CONT = new Container()
    MAIN_MENU_CONT.label = 'MAIN_MENU'

    const GAME_CONT = app.stage.getChildByLabel('GAME_CONT', { deep: true })
    const WARNING_CONT = app.stage.getChildByLabel('WARNING_CONT', { deep: true })
    const WRITE_POEM_CONT = app.stage.getChildByLabel('WRITE_POEM_CONT', { deep: true })

    app.stage.removeChild(GAME_CONT)
    app.stage.removeChild(WARNING_CONT)
    app.stage.removeChild(WRITE_POEM_CONT)

    MAIN_MENU_CONT.alpha = 0

    const firstSplashCont = new Container()
    const whiteBg = new Graphics().rect(0, 0, app.screen.width, app.screen.height).fill(0xffffff)
    const firstSplash = new Sprite(textures.FIRST_SPLASH.texture)
    firstSplash.width = app.screen.width
    firstSplash.height = app.screen.height
    firstSplashCont.alpha = 0.1

    const bg = textures.BG_MAIN_MENU.texture
    const asideMenu = textures.UI_ASIDE_MENU.texture
    const logo = textures.LOGO.texture
    const yuriArt = textures.MENU_ART_YURI.texture
    const natsukiArt = textures.MENU_ART_NATSUKI.texture
    const sayoriArt = textures.MENU_ART_SAYORI.texture
    const monikaArt = textures.MENU_ART_MONIKA.texture

    const tilingSpriteBg = new TilingSprite({
        texture: bg, width: app.screen.width, height: app.screen.height
    })

    const asideMenuSprite = new Sprite(asideMenu)
    asideMenuSprite.width = app.screen.width
    asideMenuSprite.height = app.screen.height

    const logoSprite = new Sprite(logo)
    logoSprite.position.set(160, -70)

    const menuContainer = new Container()

    const header = new Text({
        text: "Загрузка",
        style: new TextStyle({
            fontFamily: "Trebuchet MS",
            fontSize: 36,
            fill: "#ffffff",
            stroke: {
                color: 'rgb(190, 105, 160)',
                width: 6,
                join: 'round'
            }
        })
    })

    header.position.set(100, 50)
    header.visible = false

    const menuX = 100
    const menuY = 550

    const buttons = [
        { tag: "NEW_GAME_MAIN_MENU_BUTTON", label: "Новая игра" },
        { tag: "LOAD_MAIN_MENU_BUTTON", label: "Загрузить" },
        { tag: "SETTINGS_MAIN_MENU_BUTTON", label: "Настройки" },
        { tag: "HELP_MAIN_MENU_BUTTON", label: "Помощь" }
    ]

    buttons.forEach((btn, index) => {
        const text = new Text({
            text: btn.label,
            style: new TextStyle({
                fontFamily: "Trebuchet MS",
                fontSize: 36,
                fill: "#ffffff",
                stroke: {
                    color: 'rgb(190, 105, 160)',
                    width: 10,
                    join: 'round'
                }
            })
        })

        text.x = menuX
        text.y = menuY + (index * 55)

        text.eventMode = 'static'
        text.cursor = 'pointer'

        // hover
        text.on('pointerover', () => {
            text.style.fill = 'rgb(190, 105, 160)'
            text.style.stroke.color = '#ffffff'
            window.playSound(sounds.HOVER.src)
        })

        // leave
        text.on('pointerout', () => {
            text.style.fill = '#ffffff'
            text.style.stroke.color = 'rgb(190, 105, 160)'
        })

        menuContainer.addChild(text)
    })

    const girlsContainer = new Container()

    const yuriSprite = new Sprite(yuriArt)
    yuriSprite.position.set(app.screen.width / 2 - 150, 20)

    const natsukiSprite = new Sprite(natsukiArt)
    natsukiSprite.position.set(app.screen.width / 2 + 150, 150)
    natsukiSprite.scale = 0.9

    const sayoriSprite = new Sprite(sayoriArt)
    sayoriSprite.position.set(app.screen.width / 2 - 320, 280)

    const monikaSprite = new Sprite(monikaArt)
    monikaSprite.position.set(app.screen.width / 2 + 300, 200)
    monikaSprite.scale = 1.2

    girlsContainer.addChild(yuriSprite)
    girlsContainer.addChild(natsukiSprite)
    girlsContainer.addChild(sayoriSprite)
    girlsContainer.addChild(monikaSprite)

    MAIN_MENU_CONT.addChild(tilingSpriteBg)
    MAIN_MENU_CONT.addChild(asideMenuSprite)
    MAIN_MENU_CONT.addChild(logoSprite)
    MAIN_MENU_CONT.addChild(menuContainer)
    MAIN_MENU_CONT.addChild(girlsContainer)

    const nameInputGroup = nameInput(MAIN_MENU_CONT)
    const loading = loadMenu(MAIN_MENU_CONT)
    const settings = settingsMenu(MAIN_MENU_CONT)

    MAIN_MENU_CONT.addChild(loading)
    MAIN_MENU_CONT.addChild(nameInputGroup)
    MAIN_MENU_CONT.addChild(settings)

    app.stage.addChild(MAIN_MENU_CONT)

    // Обрабатываем нажатие кнопки "Новая игра"
    menuContainer.children[0].on('pointerdown', () => {
        window.playSound(sounds.SELECT.src)
        header.visible = false
        header.text = ''

        logoSprite.visible = true
        girlsContainer.visible = true

        nameInputGroup.visible = true
        loading.visible = false
        settings.visible = false
    })

    // Обрабатываем нажатие кнопки "Загрузить"
    menuContainer.children[1].on('pointerdown', () => {
        window.playSound(sounds.SELECT.src)
        header.visible = true
        header.text = 'Загрузить'

        logoSprite.visible = false
        girlsContainer.visible = false

        nameInputGroup.visible = false
        loading.visible = true
        settings.visible = false
    })

    // Обрабатываем нажатие кнопки "Настройки"
    menuContainer.children[2].on('pointerdown', () => {
        window.playSound(sounds.SELECT.src)
        header.visible = true
        header.text = 'Настройки'

        logoSprite.visible = false
        girlsContainer.visible = false

        nameInputGroup.visible = false
        loading.visible = false
        settings.visible = true
    })

    menuContainer.children[3].on('pointerdown', () => {
        window.playSound(sounds.SELECT.src)
        window.open('/README.html', '_blank')
    })

    MAIN_MENU_CONT.addChild(header)

    firstSplashCont.addChild(whiteBg)
    firstSplashCont.addChild(firstSplash)

    app.stage.addChild(firstSplashCont)

    const tl = gsap.timeline({
        onComplete: () => {
            app.stage.removeChild(firstSplashCont)
        }
    })

    tl
        .to(firstSplashCont, { alpha: 1, duration: 2 })
        .to(firstSplashCont, { alpha: 0, duration: 2 })
        .to(MAIN_MENU_CONT, { alpha: 1, duration: 2 }, "-=0.5")
}