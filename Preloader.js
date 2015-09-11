Astevoid.Preloader = function (game) {}

Astevoid.Preloader.prototype = {

    preload: function () {

        this.load.bitmapFont('font', 'images/font/font.png', 'images/font/font.fnt');

        this.load.image('menuBg', 'images/menu_background.png');
        this.load.image('gameBg', 'images/game_background.png');

        this.load.spritesheet('musicTool', 'images/musicTooltip.png', 52, 41);
        this.load.image('heart', 'images/heart_image.png');

        this.load.image('characterImg', 'images/character_image.png');
        this.load.image('asteroid', 'images/asteroid.png');
        this.load.spritesheet('charDeath', 'images/animations/characterDeath.png', 480, 270);

        this.load.audio('menuMusic', 'music/menu_music.wav');
        this.load.audio('onDeath', 'music/onDeath.wav');
        this.load.audio('onHit1', 'music/onHit1.wav');
        this.load.audio('onHit2', 'music/onHit2.wav');
        this.load.audio('onSelect', 'music/onSelect.wav');
        this.load.audio('powerUp', 'music/powerUp.wav');
        this.load.audio('gameMusic', 'music/gameMusic.wav');

    }, // preload

    update: function () {

            this.state.start('Menu'); // preloads menu

        } // update
}; // Preloader.prototype
