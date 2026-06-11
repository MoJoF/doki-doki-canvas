import { Container, Text, TextStyle, Sprite } from "pixi.js";
import { textures } from "../constants";
import { app } from "../main";


export const loadMenu = (parent) => {
    const loadContainer = new Container()
    loadContainer.position.set(1016, 186.5)

    const pageNumberText = new Text({
        text: 'Страница 1',
        style: new TextStyle({
            fontFamily: "Trebuchet MS",
            fontSize: 32,
            fill: "#000",
            join: 'round'
        })
    })

    let saves = [1, 1, 1, 1, 1, 1]
    let savesCoords = [
        { x: -450, y: 92.5 },
        { x: 0, y: 92.5 },
        { x: 450, y: 92.5 },
        { x: -450, y: 320 },
        { x: 0, y: 320 },
        { x: 450, y: 320 }
    ]

    const emptySavePic = textures.SAVE_FRAME.texture

    const savesCont = new Container()
    // Рендеринг меню сохранений
    saves.forEach((item, index) => {
        // Расставляем элементы в первый ряд
        const saveItem = new Container()

        const saveItemSprite = new Sprite(emptySavePic)
        saveItemSprite.position.set(savesCoords[index].x, savesCoords[index].y)
        saveItemSprite.width = textures.SAVE_FRAME.w
        saveItemSprite.height = textures.SAVE_FRAME.h
        saveItemSprite.scale = 1.25

        const saveText = new Text({
            text: 'Пустой слот',
            style: new TextStyle({
                fill: 'rgba(0,0,0,.5)',
                fontSize: 20,
                fontFamily: 'Trebuchet MS',
                stroke: {
                    color: '#fff',
                    width: 0,
                    join: 'round'
                }
            })
        })

        saveItem.width = saveItemSprite.width * saveItemSprite.scale
        saveItem.height = saveItemSprite.height * saveItemSprite.scale + 50

        saveItem.addChild(saveItemSprite)
        saveItem.addChild(saveText)

        saveText.anchor.set(0.5)
        saveText.position.set(savesCoords[index].x + saveItemSprite.width / 2, savesCoords[index].y + saveItemSprite.height + 15)

        saveItem.eventMode = 'static'
        saveItem.cursor = 'pointer'

        // Механика наведения, а также выбора сохранения
        saveItem.on('pointerover', () => {
            saveText.style.fill = '#000'
            saveText.style.stroke.width = 2
        })

        saveItem.on('pointerout', () => {
            saveText.style.fill = 'rgba(0, 0, 0, 0.5)'
            saveText.style.stroke.width = 0
        })

        savesCont.addChild(saveItem)

        loadContainer.addChild(savesCont)
    })

    // Пагинация
    const paginationsCont = new Container()

    let activePage = 1

    for (let i = 0; i < 9; i++) {
        const pageText = new Text({
            text: i + 1,
            style: new TextStyle({
                fill: activePage !== i + 1 ? 'rgba(0,0,0,.5)' : 'rgb(190, 105, 160)',
                fontSize: 32,
                fontFamily: 'Trebuchet MS'
            })
        })

        pageText.position.x += i * 30

        pageText.eventMode = 'static'
        pageText.cursor = 'pointer'

        pageText.on('pointerover', () => {
            if (pageText.text != activePage) {
                pageText.style.fill = '#000'
            }
        })

        pageText.on('pointerout', () => {
            if (pageText.text != activePage) {
                pageText.style.fill = 'rgba(0,0,0,.5)'
            }
        })

        // Смена страницы
        pageText.on('pointerdown', () => {
            const clickedPage = Number(pageText.text);

            if (clickedPage !== activePage) {
                activePage = clickedPage;

                pageNumberText.text = 'Страница ' + activePage

                // Проходим по всем кнопкам в контейнере и обновляем их цвета
                paginationsCont.children.forEach((child) => {
                    const childPage = Number(child.text);
                    if (childPage === activePage) {
                        child.style.fill = 'rgb(190, 105, 160)'; // Цвет активной
                    } else {
                        child.style.fill = 'rgba(0,0,0,.5)';       // Цвет неактивной
                    }
                });
            }
        })

        paginationsCont.addChild(pageText)
    }

    paginationsCont.y = 600
    paginationsCont.x = 0

    loadContainer.addChild(pageNumberText)
    loadContainer.addChild(paginationsCont)

    parent.addChild(loadContainer)

    loadContainer.visible = false

    return loadContainer
}