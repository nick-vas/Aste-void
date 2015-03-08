Astevoid.Menu = function (game) {

    this.startBg;
    this.playBtn;
}

Astevoid.Menu.prototype = {

        create: function () {

            startBg = this.add.image(0, 0, 'menuBg'); // add background image
            playBtn = this.add.image(this.world.centerX - 35, this.world.centerY - 30, 'playBtn');
            playBtn.inputEnabled = true;
            playBtn.events.onInputDown.addOnce(this.startGame, this);

        }, // create function

        startGame: function (pointer) {

                this.state.start('Game'); // start the game!
            } // startGame
    } // Menu prototype
