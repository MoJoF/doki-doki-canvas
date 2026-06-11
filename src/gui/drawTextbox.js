import { Container, Graphics, Sprite, Text, TextStyle } from "pixi.js"
import { textures } from "../constants"
import { app } from "../main"

export const drawTextbox = (drawBtns = true, name = null) => {
    const tbCont = new Container()
    const tbTexture = textures.TEXTBOX.texture

    const tbW = 816
    const tbH = 146

    const tbX = app.screen.width / 2 - (tbW / 2)
    const tbY = app.screen.height - tbH

    const tbSprite = new Sprite(tbTexture)

    tbSprite.width = tbW
    tbSprite.height = tbH

    tbCont.position.set(tbX, tbY)
    tbCont.addChild(tbSprite)

    if (drawBtns) {
        const menuCont = new Container()

        const buttons = [
            { tag: 'HISTORY_BUTTON', label: 'История' },
            { tag: 'SKIP_BUTTON', label: 'Пропуск' },
            { tag: 'AUTO_BUTTON', label: 'Авто' },
            { tag: 'SAVE_BUTTON', label: 'Сохранить' },
            { tag: 'LOAD_BUTTON', label: 'Загрузить' },
            { tag: 'SETTINGS_BUTTON', label: 'Настройки' }
        ]

        const totalButtons = buttons.length
        const sectionWidth = tbW / totalButtons

        // const baseY = tbY + tbH - 20
        const baseY = tbH - 20

        buttons.forEach((btn, index) => {
            // const centerX = tbX + (sectionWidth * index) + (sectionWidth / 2)
            const centerX = (sectionWidth * index) + (sectionWidth / 2)

            const text = new Text({
                text: btn.label,
                style: new TextStyle({
                    fontFamily: 'Trebuchet MS',
                    fontSize: 14,
                    fontStyle: 'italic',
                    fill: '#ffffff',
                    stroke: {
                        color: '#000000',
                        width: 2,
                        join: 'round'
                    }
                })
            })

            text.anchor.set(0.5)

            text.x = centerX
            text.y = baseY

            text.eventMode = 'static'
            text.cursor = 'pointer'

            // hover
            text.on('pointerover', () => {
                text.style.fill = '#000000'
                text.style.stroke.color = '#ffffff'
            })

            // leave
            text.on('pointerout', () => {
                text.style.fill = '#ffffff'
                text.style.stroke.color = '#000000'
            })

            menuCont.addChild(text)
        })
        tbCont.addChild(menuCont)
    }

    // NAMEBOX
    const nameboxTexture = textures.NAMEBOX.texture
    const nameboxContainer = new Container()
    nameboxContainer.label = 'namePanel'
    nameboxContainer.position.set(tbSprite.position.x + 30, tbSprite.position.y - textures.NAMEBOX.h)

    const namebox = new Sprite(nameboxTexture)
    namebox.width = textures.NAMEBOX.w
    namebox.height = textures.NAMEBOX.h

    const nameText = new Text({
        text: name,
        style: new TextStyle({
            fill: '#fff',
            fontSize: 24,
            fontFamily: 'Trebuchet MS',
            align: 'center',
            stroke: {
                color: '#D495BF',
                width: 5,
                join: 'round'
            }
        })
    })

    nameText.label = 'nameText'

    if (name) nameboxContainer.visible = true
    else nameboxContainer.visible = false

    nameboxContainer.addChild(namebox)
    nameboxContainer.addChild(nameText)

    tbCont.addChild(nameboxContainer)

    nameText.position.set(namebox.width / 2, namebox.height / 2)
    nameText.anchor.set(0.5, 0.5)

    const t = new Text({
        text: '',
        style: {
            fontFamily: 'Trebuchet MS',
            fontSize: 20,
            fill: '#fff',
            stroke: {
                color: '#000',
                width: 2,
                join: 'round'
            },
            wordWrap: true,
            wordWrapWidth: 785,
        },
    })

    t.label = 'scenario'
    t.position.set(10, 10)

    // Кликабельный контейнер
    const transparentCont = new Graphics().roundRect(0, 0, tbW, 100, 10).fill('rgba(0, 0, 0, 0)')
    transparentCont.label = 'clickable_lore'

    transparentCont.eventMode = 'static'

    tbCont.addChild(transparentCont)
    tbCont.addChild(t)

    return tbCont
}