import { Container, Sprite, Text, TextStyle } from 'pixi.js'
import { textures } from '../constants'
import { app, R } from '../main'
import PixiSlider from "../gui/slider.js"


export const settingsMenu = (parent) => {
    const settingsContainer = new Container()
    settingsContainer.position.set(560, 170)

    const textOptionsContainer = new Container()

    const textOptionsText = new Text({
        text: 'Скорость текста',
        style: new TextStyle({
            fill: '#fff',
            fontFamily: 'Trebuchet MS',
            fontSize: 36,
            stroke: {
                color: 'rgb(190, 105, 160)',
                width: 5
            }
        })
    })

    const fasterText = new Text({
        text: 'Быстрее',
        style: new TextStyle({
            fill: '#000',
            fontFamily: 'Trebuchet MS',
            fontSize: 24
        })
    })

    fasterText.position.set(0, 57)

    const slowerText = new Text({
        text: 'Медленнее',
        style: new TextStyle({
            fill: '#000',
            fontFamily: 'Trebuchet MS',
            fontSize: 24
        })
    })

    slowerText.position.set(430, 57)

    // Скорость печатания текста
    const textSpeedSlider = new PixiSlider(300, 0.1, 10)
    textSpeedSlider.position.set(111, 72)
    textSpeedSlider.setValue(intervalText)
    textSpeedSlider.onValueChange = (v) => {
        window.intervalText = v
    }

    textOptionsContainer.addChild(textOptionsText)
    textOptionsContainer.addChild(fasterText)
    textOptionsContainer.addChild(textSpeedSlider)
    textOptionsContainer.addChild(slowerText)


    const audioOptionsContainer = new Container()
    audioOptionsContainer.position.set(textOptionsContainer.x + textOptionsContainer.width + 40, textOptionsContainer.y)

    const textAudio1 = new Text({
        text: 'Громкость музыки',
        style: new TextStyle({
            fill: '#fff',
            fontFamily: 'Trebuchet MS',
            fontSize: 36,
            stroke: {
                color: 'rgb(190, 105, 160)',
                width: 5
            }
        })
    })
    // Слайдер громкости музыки
    const audioVolumeSlider = new PixiSlider(300, 0, 100)
    audioVolumeSlider.y += 72
    audioVolumeSlider.setValue(currentMusic.volume * 100)
    audioVolumeSlider.onValueChange = (v) => {
        window.currentMusic.volume = v / 100
    }
    audioOptionsContainer.addChild(textAudio1)
    audioOptionsContainer.addChild(audioVolumeSlider)

    const soundVolumeContainer = new Container()
    soundVolumeContainer.position.set(audioOptionsContainer.x, audioOptionsContainer.y + 100)

    const textAudio2 = new Text({
        text: 'Громкость звуков',
        style: new TextStyle({
            fill: '#fff',
            fontFamily: 'Trebuchet MS',
            fontSize: 36,
            stroke: {
                color: 'rgb(190, 105, 160)',
                width: 5,
                join: 'round'
            }
        })
    })

    // Слайдер громкости звука
    const soundVolumeSlider = new PixiSlider(300, 0, 100)
    soundVolumeSlider.y += 72

    R.when('module.sound:ready', sound => {
        soundVolumeSlider.setValue(sound.volume * 100)
    })

    soundVolumeSlider.onValueChange = (v) => {
        R.emit('sound.change', { volume: v / 100 })

    }
    soundVolumeContainer.addChild(textAudio2)
    soundVolumeContainer.addChild(soundVolumeSlider)

    settingsContainer.addChild(textOptionsContainer)
    settingsContainer.addChild(audioOptionsContainer)
    settingsContainer.addChild(soundVolumeContainer)
    settingsContainer.visible = false

    return settingsContainer
}