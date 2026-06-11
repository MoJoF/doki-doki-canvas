import { app } from "../main";
import { game_scene } from "../scenes/game_scene";
import { textures } from "../constants";
import { Container, Sprite, Text, TextStyle } from "pixi.js";
import { act1 } from "../lore/act1";


export const nameInput = () => {
    const nameInputGroup = new Container()
    nameInputGroup.anchor = 0.5

    const frame = textures.FRAME.texture
    const frameSprite = new Sprite(frame)
    frameSprite.scale = 0.75
    frameSprite.anchor = 0.5

    nameInputGroup.position.set(app.screen.width / 2, app.screen.height / 2)
    nameInputGroup.addChild(frameSprite)

    // Надпись "Введите имя"
    const title = new Text({
        text: 'Введите имя:',
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
    title.anchor = 0.5
    title.y -= 60

    // Добавление input для ввода имени
    const nameText = new Text({
        text: 'ИМЯ',
        style: new TextStyle({
            fontFamily: "Trebuchet MS",
            fontSize: 32,
            fill: "#ffffff",
            stroke: {
                color: 'rgb(0, 0, 0)',
                width: 3,
                join: 'round'
            }
        })
    })

    nameText.anchor = 0.5

    currentInput = nameText

    nameText.eventMode = 'static'

    nameText.on('pointerdown', () => {
        window.currentInput = nameText
    })

    // Кнопка подтвердить
    const btnSubmit = new Text({
        text: 'Подтвердить',
        style: new TextStyle({
            fontFamily: "Trebuchet MS",
            fontSize: 24,
            fill: '#fff',
            stroke: {
                color: 'rgb(190, 105, 160)',
                width: 4,
                join: 'round'
            }
        })
    })

    btnSubmit.eventMode = 'static'
    btnSubmit.cursor = 'pointer'
    btnSubmit.anchor.set(0.5)
    btnSubmit.y += 60

    btnSubmit.on('pointerover', () => {
        btnSubmit.style.fill = 'rgb(190, 105, 160)'
        btnSubmit.style.stroke.color = '#fff'
    })

    btnSubmit.on('pointerout', () => {
        btnSubmit.style.fill = '#fff'
        btnSubmit.style.stroke.color = 'rgb(190, 105, 160)'
    })

    btnSubmit.on('pointerdown', () => {
        if (currentInput.text) {
            window.playerName = currentInput.text
            currentInput = ""
            nameInputGroup.visible = false
            window.CURRENT_SCENE = "GAME"
            game_scene(act1)
        }
    })

    const closeNameCont = new Text({
        text: 'X',
        style: new TextStyle({
            fontFamily: "Trebuchet MS",
            fontSize: 20,
            fill: "#ffffff",
            stroke: {
                color: 'rgb(190, 105, 160)',
                width: 3,
                join: 'round'
            }
        })
    })

    closeNameCont.position.x += 203.5
    closeNameCont.position.y -= 90.5
    closeNameCont.eventMode = 'static'
    closeNameCont.cursor = 'pointer'

    closeNameCont.on('pointerover', () => {
        closeNameCont.style.fill = 'rgb(190, 105, 160)'
        closeNameCont.style.stroke.color = '#fff'
    })

    closeNameCont.on('pointerout', () => {
        closeNameCont.style.fill = '#fff'
        closeNameCont.style.stroke.color = 'rgb(190, 105, 160)'
    })

    closeNameCont.on('pointerdown', () => {
        nameInputGroup.visible = false
        window.currentInput = ""
    })

    nameInputGroup.visible = false

    nameInputGroup.addChild(title)
    nameInputGroup.addChild(nameText)
    nameInputGroup.addChild(btnSubmit)
    nameInputGroup.addChild(closeNameCont)

    return nameInputGroup
}