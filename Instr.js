Astevoid.Instr = function (game) {}

Astevoid.Instr.prototype = {

    create: function () {
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;
        this.add.image(0, 0, 'gameBg');
        this.selection = this.add.audio('onSelect');
        this.story = this.add.bitmapText(this.world.centerX, this.world.centerY - 180, 'font', 'You wake up hangover in your spaceship \n only to find yourself amidst an asteroid field.\n In the face of death only one thing remains... \n \nHighscores!!! \n\n Up arrow key to thrust \n \n Left and Right to steer \n \n 3000 points earn you a life', 32);
        this.story.align = 'center';
        this.story.x = this.game.width * 0.5 - this.story.textWidth * 0.5;

        this.playBtn = this.add.bitmapText(this.world.centerX, this.world.centerY + 150, 'font', 'Spacebar to play', 32);
        this.playBtn.align = 'center';
        this.playBtn.x = this.game.width * 0.5 - this.playBtn.textWidth * 0.5;
        this.playBtn.inputEnabled = true;
        this.startKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.startKey.onDown.add(this.startGame, this);
        this.playBtn.events.onInputDown.addOnce(this.startGame, this);
    },

    startGame: function (pointer) {
        first = 1;
        this.selection.play();
        this.story.destroy();
        this.state.start('Game');
    },


};
