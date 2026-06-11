import { Assets } from "pixi.js"

export const textures = {
    BG_BEDROOM: { src: './assets/images/bg/bedroom.png' },
    BG_RESIDENTIAL: { src: './assets/images/bg/residential.png' },
    BG_RESIDENTIAL: { src: './assets/images/bg/class.png' },
    TEXTBOX: { src: './assets/images/gui/textbox.png', w: 816, h: 146 },
    NAMEBOX: { src: './assets/images/gui/namebox.png', w: 168, h: 39 },
    FRAME: { src: './assets/images/gui/frame.png', w: 600, h: 250 },

    // SAYORI
    SAYORI_1: { src: './assets/images/sayori/Say16.webp', w: 960, h: 960 },
    SAYORI_2: { src: './assets/images/sayori/3c.png', w: 960, h: 960 },
    SAYORI_3: { src: './assets/images/sayori/Say1.webp', w: 960, h: 960 },
    SAYORI_4: { src: './assets/images/sayori/Say17.webp', w: 960, h: 960 },
    SAYORI_5: { src: './assets/images/sayori/Ori10.webp', w: 960, h: 960 },
    SAYORI_6: { src: './assets/images/sayori/Ori9.webp', w: 960, h: 960 },
    SAYORI_7: { src: './assets/images/sayori/Say10.webp', w: 960, h: 960 },
    SAYORI_8: { src: './assets/images/sayori/Ori18.webp', w: 960, h: 960 },
    SAYORI_9: { src: './assets/images/sayori/Say2.webp', w: 960, h: 960 },
    SAYORI_10: { src: './assets/images/sayori/Say25.webp', w: 960, h: 960 },
    SAYORI_13: { src: './assets/images/sayori/Say7.webp', w: 960, h: 960 },
    SAYORI_14: { src: './assets/images/sayori/3b.webp', w: 960, h: 960 },
    
    // WARNING
    BG_WARNING: { src: './assets/images/bg/warning.png', w: 1280, h: 720 },
    BG_WARNING2: { src: './assets/images/bg/warning2.png', w: 1280, h: 720 },
    BTN_BG: { src: './assets/images/gui/button/choice_idle_background.png', w: 400, h: 35 },
    BTN_HOVER_BG: { src: './assets/images/gui/button/choice_hover_background.png', w: 400, h: 35 },
    
    // MAIN MENU
    FIRST_SPLASH: { src: './assets/images/bg/splash.png', w: 1280, h: 720 },
    LOGO: { src: './assets/images/gui/logo.png', w: 512, h: 512 },
    BG_MAIN_MENU: { src: './assets/images/gui/menu_bg.png', w: 1380, h: 1320 },
    SAVE_FRAME: { src: './assets/images/gui/button/slot_idle_background_new.png', w: 256, h: 144 }, 
    UI_ASIDE_MENU: { src: './assets/images/gui/overlay/main_menu.png', w: 1280, h: 720 },
    MENU_ART_SAYORI: { src: './assets/images/gui/menu_art_s.png', w: 411, h: 1080 },
    MENU_ART_NATSUKI: { src: './assets/images/gui/menu_art_n.png', w: 400, h: 1080 },
    MENU_ART_YURI: { src: './assets/images/gui/menu_art_y.png', w: 481, h: 1080 },
    MENU_ART_MONIKA: { src: './assets/images/gui/menu_art_m.png', w: 602, h: 1080 },

    // WRITE POEM 
    BG_NOTEBOOK: { src: '/assets/images/bg/notebook.png' }
}

export const loadTextures = async () => {
    for (const key in textures) {
        const texture = await Assets.load(textures[key].src)
        textures[key].texture = texture
    }
}

export const sounds = {
    HOVER: { src: './assets/audio/gui/sfx/hover.ogg' },
    SELECT: { src: './assets/audio/gui/sfx/select.ogg' }
}

export const musics = {
    INTRO: { src: './assets/audio/bgm/1.ogg' },
    FIRST_MEET_SAYORI: { src: './assets/audio/bgm/2.ogg' },
}

