Astevoid.Preloader = function (game) {

    // this.ready = false;

};

Astevoid.Preloader.prototype = {

    preload: function () {

        this.load.bitmapFont('font', 'images/font/font.png', 'images/font/font.fnt');

        this.load.image('menuBg', 'images/menu_background.png');
        this.load.image('gameBg', 'images/game_background.png');

        this.load.image('playBtn', 'images/play_button.png');
        this.load.image('backBtn', 'images/back_button.png');
        this.load.image('exitBtn', 'images/exit_button.png');

        this.load.spritesheet('musicTool', 'images/musicTooltip.png', 52, 41);

        this.load.image('characterImg', 'images/character_image.png');
        this.load.image('asteroid', 'images/asteroid.png');

    }, // preload

    update: function () {

            this.state.start('Menu'); // preloads menu

        } // update
}; // Preloader.prototype
