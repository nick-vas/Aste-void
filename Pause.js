Astevoid.Pause = function (game) {
    this.exitBtn;
    this.backBtn;
    this.musicStateBtn;
}

Astevoid.Pause.prototype = {

        create: function () {

            startBG = this.add.image(0, 0, 'menuBG'); // add background image


        }, // create function

        startGame: function (pointer) {

                this.state.start('Menu'); // start the game!
            } // startGame
    } // Menu prototype
