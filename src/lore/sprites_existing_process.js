import gsap from "gsap"

export const sprites_existing_process = (item, sprites, textures) => {
    let activeSprites = []
    const { sayoriSprite, natsukiSprite, yuriSprite, monikaSprite } = sprites

    if (item.sprites) {
        // Сайори
        if (item.sprites.sayori) {
            activeSprites.push(sayoriSprite)
            sayoriSprite.texture = textures[item.sprites.sayori].texture
            if (!sayoriSprite.visible) {
                sayoriSprite.visible = true
                gsap.to(sayoriSprite, { alpha: 1, duration: 0.5 })
            }
        } else {
            if (sayoriSprite.visible) {
                gsap.to(sayoriSprite, {
                    alpha: 0, duration: 0.5, onComplete: () => {
                        sayoriSprite.visible = false
                    }
                })
            }
        }
        // Нацуки 
        if (item.sprites.natsuki) {
            activeSprites.push(natsukiSprite)
            natsukiSprite.texture = textures[item.sprites.natsuki].texture
            if (!natsukiSprite.visible) {
                natsukiSprite.visible = true
                gsap.to(natsukiSprite, { alpha: 1, duration: 0.5 })
            }
        } else {
            gsap.to(natsukiSprite, {
                alpha: 0, duration: 0.5, onComplete: () => {
                    natsukiSprite.visible = false
                }
            })
        }
        // Юри
        if (item.sprites.yuri) {
            activeSprites.push(yuriSprite)
            yuriSprite.texture = textures[item.sprites.yuri].texture
            if (!yuriSprite.visible) {
                yuriSprite.visible = true
                gsap.to(yuriSprite, { alpha: 1, duration: 0.5 })
            }
        } else {
            gsap.to(yuriSprite, {
                alpha: 0, duration: 0.5, onComplete: () => {
                    yuriSprite.visible = false
                }
            })
        }
        // Моника
        if (item.sprites.monika) {
            activeSprites.push(monikaSprite)
            monikaSprite.texture = textures[item.sprites.monika].texture
            if (!monikaSprite.visible) {
                monikaSprite.visible = true
                gsap.to(monikaSprite, { alpha: 1, duration: 0.5 })
            }
        } else {
            gsap.to(monikaSprite, {
                alpha: 0, duration: 0.5, onComplete: () => {
                    monikaSprite.visible = false
                }
            })
        }

    } else {
        gsap.to([sayoriSprite, monikaSprite, natsukiSprite, yuriSprite], {
            alpha: 0, duration: 0.5, onComplete: () => {
                sayoriSprite.visible = false
                monikaSprite.visible = false
                yuriSprite.visible = false
                natsukiSprite.visible = false
            }
        })
    }

    return activeSprites
}