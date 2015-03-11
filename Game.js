Astevoid.Game = function (game) {
    // Game variable declaration
    this.gameOver;
    this.player;
    this.asteroid;
};

Astevoid.Game.prototype = {

    create: function () {

        this.gameOver = false;
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.buildWorld();
    }, // create function


    buildWorld: function () {
        this.add.image(0, 0, 'gameBg');
        player = this.add.sprite(150, 200, 'characterImg');
        player.anchor.setTo(0.5, 0.5);

        this.physics.enable(player, Phaser.Physics.ARCADE);


    }, // buildWorld





    update: function () {

            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            player.body.angularVelocity = 0;


            if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                player.body.angularVelocity = -200;
            } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                player.body.angularVelocity = 200;
            }

            if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.physics.arcade.velocityFromAngle(player.angle, 300, player.body.velocity);
            }
        } // update


}; // Game prototype
