Astevoid.Game = function (game) {
    // Game variable declaration
    this.gameOver;
};

Astevoid.Game.prototype = {

    create: function () {

        this.gameOver = false;
        this.buildWorld();
    }, // create function


    buildWorld: function () {
        this.add.image(0, 0, 'gameBg');

    }, // buildWorld





    update: function () {

        } // update


}; // Game prototype
