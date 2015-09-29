Astevoid.Menu = function (game) {}

Astevoid.Menu.prototype = {

    create: function () {
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        this.add.image(0, 0, 'menuBg'); // add background image
        this.music = this.add.audio('menuMusic');
        this.music.play('', 0, 0.3, true);
        this.selection = this.add.audio('onSelect');

        playBtn = this.add.bitmapText(this.world.centerX, this.world.centerY - 30, 'font', 'Spacebar to play', 48);
        playBtn.align = 'center';
        playBtn.x = this.game.width / 2 - playBtn.textWidth / 2;
        playBtn.inputEnabled = true;
        var startKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        startKey.onDown.add(this.startGame, this);
        playBtn.events.onInputDown.addOnce(this.startGame, this);

        musicBtn = this.add.button(48, 310, 'musicTool', this.muteMusic, this);
        musicBtn.frame = 0;
    }, // create function

    startGame: function (pointer) {

        this.selection.play();
        this.music.destroy();
        this.state.start('Game'); // start the game!

    }, // startGame

    muteMusic: function () {
        if (musicBtn.frame == 0) {
            musicBtn.frame = 1;
        } else {
            musicBtn.frame = 0;
        }
    },

}; // Menu prototype
