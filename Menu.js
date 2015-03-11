Astevoid.Menu = function (game) {

    this.startBg;
    this.playBtn;
    this.musicBtn;
}

Astevoid.Menu.prototype = {

        create: function () {

            startBg = this.add.image(0, 0, 'menuBg'); // add background image

            playBtn = this.add.button(this.world.centerX - 35, this.world.centerY - 30, 'playBtn', this.startGame, this);

            musicBtn = this.add.button(48, 310, 'musicTool', this.muteMusic, this);
            musicBtn.frame = 0;
        }, // create function

        startGame: function (pointer) {

            this.state.start('Game'); // start the game!
        }, // startGame

        muteMusic: function () {
            if (musicBtn.frame == 0) {
                musicBtn.frame = 1;
            } else {
                musicBtn.frame = 0;
            }
        }

    } // Menu prototype
