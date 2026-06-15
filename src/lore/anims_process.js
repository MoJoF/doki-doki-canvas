import gsap from "gsap"

export const anims_process = (item, sprites) => {
    if (item.anims) {
        const { sayoriSprite, natsukiSprite, yuriSprite, monikaSprite } = sprites

        if (item.anims.sayori) {
            if (item.anims.sayori === 'top-down') {
                gsap.to(sayoriSprite, { y: '-=5', duration: 0.15, yoyo: true, repeat: 1 })
            } else if (item.anims.sayori === 'down') {
                gsap.to(sayoriSprite, { y: '+=10', duration: 0.5 })
            }
        }
        if (item.anims.yuri) {
            if (item.anims.yuri === 'top-down') {
                gsap.to(yuriSprite, { y: '-=5', duration: 0.15, yoyo: true, repeat: 1 })
            } else if (item.anims.yuri === 'down') {
                gsap.to(yuriSprite, { y: '+=10', duration: 0.5 })
            }
        }
        if (item.anims.natsuki) {
            if (item.anims.natsuki === 'top-down') {
                gsap.to(natsukiSprite, { y: '-=5', duration: 0.15, yoyo: true, repeat: 1 })
            } else if (item.anims.natsuki === 'down') {
                gsap.to(natsukiSprite, { y: '+=10', duration: 0.5 })
            }
        }
        if (item.anims.monika) {
            if (item.anims.monika === 'top-down') {
                gsap.to(monikaSprite, { y: '-=5', duration: 0.15, yoyo: true, repeat: 1 })
            } else if (item.anims.monika === 'down') {
                gsap.to(monikaSprite, { y: '+=10', duration: 0.5 })
            }
        }
    }
}