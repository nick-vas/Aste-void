Astevoid.Preloader = function (game) {}

Astevoid.Preloader.prototype = {

    preload: function () {

        this.load.bitmapFont('font', 'images/font/font.png', 'images/font/font.fnt');

        this.load.image('logo', 'images/logo_comp.png');
        this.load.image('logoType', 'images/logo_type_comp.png');
        this.load.image('menuBg', 'images/menu_background_comp.png');
        this.load.image('gameBg', 'images/game_background_comp.png');

        this.load.spritesheet('musicTool', 'images/musicTooltip_comp.png', 52, 41);
        this.load.image('heart', 'images/heart_image_comp.png');

        this.load.image('characterImg', 'images/character_image_comp.png');
        this.load.image('asteroid', 'images/asteroid_comp.png');
        this.load.spritesheet('charDeath', 'images/animations/characterDeath_comp.png', 480, 270);

        this.load.audio('menuMusic', 'music/menu_music.wav');
        this.load.audio('onDeath', 'music/onDeath.wav');
        this.load.audio('onHit1', 'music/onHit1.wav');
        this.load.audio('onHit2', 'music/onHit2.wav');
        this.load.audio('onSelect', 'music/onSelect.wav');
        this.load.audio('powerUp', 'music/powerUp.wav');
        this.load.audio('gameMusic', 'music/gameMusic.wav');
        this.load.audio('introSound', 'music/intro_aurrr.wav');
        this.check = store.get('hiScore');
        first = 0;
        if (this.check == null) {
            store.set('hiScore', 0);
        }

    }, // preload

    update: function () {

            this.state.start('Intro'); // preloads intro

        } // update
}; // Preloader.prototype
