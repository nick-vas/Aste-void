Astevoid.Preloader = function (game) {

    // this.ready = false;

};

Astevoid.Preloader.prototype = {

    preload: function () {

        this.load.image('menuBg', 'images/menu_background.png');
        this.load.image('gameBg', 'images/game_background.png');

        this.load.image('playBtn', 'images/play_button.png');
        this.load.image('backBtn', 'images/back_button.png');
        this.load.image('exitBtn', 'images/exit_button.png');

        this.load.image('musicTool_on', 'images/musicTooltip_on.png');
        this.load.image('musicTool_off', 'images/musicTooltip_off.png');
        this.load.spritesheet('musicTool', 'images/musicTooltip.png', 52, 41);

        this.load.image('characterImg', 'images/character_image.png');
        this.load.image('asteroid1Img', 'images/asteroid1_image.png');
        this.load.image('asteroid2Img', 'images/asteroid2_image.png');
        this.load.image('asteroid3Img', 'images/asteroid3_image.png');
        this.load.image('asteroid4Img', 'images/asteroid4_image.png');


    }, // preload

    update: function () {

            this.state.start('Menu'); // preloads menu

        } // update
}; // Preloader.prototype
