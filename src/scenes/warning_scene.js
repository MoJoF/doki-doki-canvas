import { textures, sounds, musics } from "../constants.js";
import { typewriter } from "../typewriter.js";
import { drawTextbox } from "../gui/drawTextbox.js";
import { app } from "../main.js";
import { Container, Sprite, TextStyle, Text } from "pixi.js";
import { resizeSprite } from "../gui/resizeSprite.js";
import { main_menu_scene } from "./main_menu_scene.js";
import gsap from "gsap";


export const warning_scene = () => {
    const WARNING_CONT = new Container()
    WARNING_CONT.label = 'WARNING_CONT'

    const GAME_CONT = app.stage.getChildByLabel('GAME_CONT', { deep: true })
    const MAIN_MENU = app.stage.getChildByLabel('MAIN_MENU', { deep: true })
    const WRITE_POEM_CONT = app.stage.getChildByLabel('WRITE_POEM_CONT', { deep: true })

    app.stage.removeChild(GAME_CONT)
    app.stage.removeChild(MAIN_MENU)
    app.stage.removeChild(WRITE_POEM_CONT)

    const warningBgSprite = new Sprite(textures.BG_WARNING.texture)
    warningBgSprite.width = app.screen.width
    warningBgSprite.height = app.screen.height
    warningBgSprite.anchor.set(0.5)

    warningBgSprite.alpha = 0

    // Запускаем расчет сразу
    resizeSprite(warningBgSprite);

    app.renderer.on('resize', () => resizeSprite(warningBgSprite));

    const textbox = drawTextbox(false)
    textbox.y -= 10
    textbox.alpha = 0

    const textInTextbox = new Text({
        text: '',
        style: new TextStyle({
            fontFamily: 'Trebuchet MS',
            fontSize: 20,
            fill: '#fff',
            wordWrap: true,
            wordWrapWidth: 785,
            stroke: {
                width: 3,
                color: '#000',
                join: 'round'
            }
        })
    })

    textInTextbox.position.set(textbox.children[0].x + 10, textbox.children[0].y + 10)

    textbox.eventMode = 'static'
    textbox.addChild(textInTextbox)

    WARNING_CONT.addChild(warningBgSprite)
    WARNING_CONT.addChild(textbox)

    const tl = gsap.timeline({
        onComplete: () => {
            let i = 0
            const warningText = [
                { text: 'Данный ресурс является не творением команды Team Salvato, а фанатской копией.' },
                { text: 'Эта игра не рекомендована для детей и легко впечатлительных личностей.' },
                { text: 'Личности, страдающие от беспокойства или депрессии, могут пострадать при прохождении данной игры.' },
                { text: 'Для предупреждений о содержании, пожалуйста, посетите: http://ddlc.moe/warning.html или перейдите /WARNING.html.' },
                { text: 'Играя в Doki Doki Literature Club, вы подтверждаете, что вам как минимум 16 лет и вы согласны увидеть очень тревожащее содержимое.' },
                {
                    actions: [
                        { title: 'Я согласен', fn: () => main_menu_scene() }
                    ]
                }
            ]

            typewriter(warningText[i].text, textInTextbox, 0.5)

            textbox.on('pointerdown', () => {
                if (i !== warningText.length - 1) {
                    i++
                    const item = warningText[i]
                    if (item.text) {
                        if (textbox.alpha !== 1) {
                            gsap.to(textbox, { alpha: 1, duration: 0.5 })
                        }
                        typewriter(item.text, textInTextbox, 0.5)
                    }

                    if (!item.text) gsap.to(textbox, { alpha: 0, duration: 0.5 })

                    if (item.actions) {
                        const buttonsContainer = new Container()
                        buttonsContainer.alpha = 0
                        buttonsContainer.position.set(app.screen.width / 2, app.screen.height / 2)

                        item.actions.forEach(btn => {
                            const btnContainer = new Container()
                            const btnSprite = new Sprite(textures.BTN_BG.texture)
                            const btnText = new Text({
                                text: btn.title,
                                style: new TextStyle({
                                    fill: '#000',
                                    fontFamily: 'Trebuchet MS',
                                    fontSize: 20,
                                    join: 'round'
                                })
                            })

                            btnSprite.anchor.set(0.5)
                            btnText.anchor.set(0.5)

                            btnContainer.addChild(btnSprite)
                            btnContainer.addChild(btnText)

                            btnContainer.eventMode = 'static'

                            btnContainer.on('pointerover', () => {
                                btnSprite.texture = textures.BTN_HOVER_BG.texture
                                btnText.style.fill = 'rgb(190, 105, 160)'
                                playSound(sounds.HOVER.src)
                            })

                            btnContainer.on('pointerout', () => {
                                btnSprite.texture = textures.BTN_BG.texture
                                btnText.style.fill = '#000'
                            })

                            btnContainer.on('pointerdown', () => {
                                playSound(sounds.SELECT.src)
                                window.playMusic(musics.INTRO.src)
                                btn.fn()
                                app.stage.removeChild(WARNING_CONT)
                            })

                            buttonsContainer.addChild(btnContainer)
                        })

                        WARNING_CONT.addChild(buttonsContainer)
                        gsap.to(buttonsContainer, { alpha: 1, duration: 1 })
                    }
                }
            })
        }
    })

    tl.to(warningBgSprite, { alpha: 1, duration: 2 })
    tl.to(textbox, { alpha: 1, duration: 1 })

    app.stage.addChild(WARNING_CONT)
}