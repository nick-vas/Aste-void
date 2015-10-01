Astevoid.Menu = function (game) {}

Astevoid.Menu.prototype = {

    create: function () {
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;
        store.disabled = false;
        this.add.image(0, 0, 'menuBg'); // add background image
        this.music = this.add.audio('menuMusic');
        this.music.fadeIn(4000, true);
        this.selection = this.add.audio('onSelect');

        this.topScore = this.add.bitmapText(this.game.width * 0.5, this.world.centerY - 50, 'font', '0000', 48);
        this.topScore.align = 'center';
        this.topScore.anchor.setTo(0.5, 0.5);
        this.hiScore = store.get('hiScore');
        if (this.hiScore > 0) {
            this.topScore.setText(this.hiScore);
        }

        this.playBtn = this.add.bitmapText(this.world.centerX, this.world.centerY + 20, 'font', 'Spacebar to play', 48);
        this.playBtn.align = 'center';
        this.playBtn.x = this.game.width * 0.5 - this.playBtn.textWidth * 0.5;
        this.playBtn.inputEnabled = true;
        var startKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        startKey.onDown.add(this.startGame, this);
        this.playBtn.events.onInputDown.addOnce(this.startGame, this);

        musicBtn = this.add.button(35, 325, 'musicTool', this.muteMusic, this);
        if (this.game.sound.mute) {
            musicBtn.frame = 1;
        } else musicBtn.frame = 0;

    }, // create function

    startGame: function (pointer) {

        this.selection.play();
        this.music.destroy();
        if (first == 0) {
            this.state.start('Instr');
        } else this.state.start('Game'); // start the game!


    }, // startGame

    /*
    supportsStorage: function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }, */ // does the browser support storage? // should do..

    muteMusic: function () {
        if (musicBtn.frame == 0) {
            this.game.sound.mute = true;
            musicBtn.frame = 1;
        } else {
            this.game.sound.mute = false;
            musicBtn.frame = 0;
        }
    },

}; // Menu prototype
