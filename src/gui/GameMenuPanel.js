import gsap from "gsap"
import { Container, Graphics, Sprite, Text, TextStyle, TilingSprite } from "pixi.js"
import { textures, sounds } from "../constants"
import { app } from '../main'
import { settingsMenu } from "./settingsMenu"
import { loadMenu } from "./loadMenu"


export const GameMenuPanel = () => {
    const GameMenuContainer = new Container()
    GameMenuContainer.label = "GAME_MENU_CONTAINER"

    const bgTexture = textures.BG_MAIN_MENU.texture

    const bg = new TilingSprite({
        texture: bgTexture, width: app.screen.width, height: app.screen.height
    })

    const asideMenuContainer = new Container()
    asideMenuContainer.label = "Aside"
    const asideMenu = textures.UI_ASIDE_MENU.texture

    const asideMenuSprite = new Sprite(asideMenu)
    asideMenuSprite.width = app.screen.width
    asideMenuSprite.height = app.screen.height

    const menuContainer = new Container()

    const header = new Text({
        text: "История",
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

    header.label = "GAME_MENU_HEADER"
    header.position.set(50, 50)
    header.visible = true

    const menuX = 50
    const menuY = 440

    const buttons = [
        { tag: "HISTORY_BUTTON", label: "История" },
        { tag: "SAVE_BUTTON", label: "Сохранить игру" },
        { tag: "LOAD_BUTTON", label: "Загрузить игру" },
        { tag: "MAIN_MENU_BUTTON", label: "Главное меню" },
        { tag: "SETTINGS_MENU", label: "Настройки" },
        { tag: "HELP_BUTTON", label: "Помощь" },
        { tag: "BACK_BUTTON", label: "Назад" },
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
        text.y = menuY + (index * 65)

        text.eventMode = 'static'
        text.cursor = 'pointer'

        text.label = btn.tag

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

    GameMenuContainer.addChild(bg)

    asideMenuContainer.addChild(asideMenuSprite)
    asideMenuContainer.addChild(header)
    asideMenuContainer.addChild(menuContainer)

    GameMenuContainer.addChild(asideMenuContainer)

    // ПАНЕЛИ
    // История


    // Загрузить
    const loading = loadMenu(GameMenuContainer)
    loading.label = "LOAD_MODAL"
    loading.visible = true

    // Настройки
    const settings = settingsMenu(GameMenuContainer)
    settings.visible = false
    settings.label = "SETTINGS_MODAL"

    GameMenuContainer.addChild(settings)

    GameMenuContainer.alpha = 0
    GameMenuContainer.visible = false

    return GameMenuContainer
}