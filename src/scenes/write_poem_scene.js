import { app } from "../main";
import { Container, Text, TextStyle, Sprite } from "pixi.js";
import { textures } from "../constants";


export const write_poem_scene = () => {
    const WRITE_POEM_CONT = new Container()
    WRITE_POEM_CONT.label = 'WRITE_POEM_CONT'

    const GAME_CONT = app.stage.getChildByLabel('GAME_CONT', { deep: true })
    const MAIN_MENU = app.stage.getChildByLabel('MAIN_MENU', { deep: true })
    const WARNING_CONT = app.stage.getChildByLabel('WARNING_CONT', { deep: true })

    app.stage.removeChild(GAME_CONT)
    app.stage.removeChild(MAIN_MENU)
    app.stage.removeChild(WARNING_CONT)

    const bg = textures.BG_NOTEBOOK.texture
    const bgSprite = new Sprite(bg)

    bgSprite.width = app.screen.width
    bgSprite.height = app.screen.height

    let wordNumber = 1

    const wordNumberText = new Text({
        text: `${wordNumber}/20`,
        style: new TextStyle({
            fontFamily: "Trebuchet MS",
            fontSize: 36,
            fill: "#000000",
            join: 'round'
        })
    })

    wordNumberText.x = 1240
    wordNumberText.y = 85

    // Генерация слов

    const wordsContainer = new Container()

    const text = new Text({
        text: 'Слово 1',
        style: new TextStyle({
            fontFamily: "Trebuchet MS",
            fontSize: 36,
            fill: "#000000",
            stroke: {
                color: '#ffffff',
                width: 3,
                join: 'round'
            }
        }),
    })

    text.x = 670
    text.y = 200
    text.for = 'Sayori'
    text.eventMode = 'static'
    text.cursor = 'pointer'

    // hover
    text.on('pointerover', () => {
        text.style.fill = 'rgb(255, 255, 255)'
        text.style.stroke.color = '#000000'
    })

    // leave
    text.on('pointerout', () => {
        text.style.fill = '#000000'
        text.style.stroke.color = '#ffffff'
    })

    text.on('pointerdown', () => {
        console.log(text.for)
    })

    wordsContainer.addChild(text)

    WRITE_POEM_CONT.addChild(bgSprite)
    WRITE_POEM_CONT.addChild(wordNumberText)
    WRITE_POEM_CONT.addChild(wordsContainer)

    app.stage.addChild(WRITE_POEM_CONT)
} 