Astevoid.Game = function (game) {
    // Game variable declaration
    this.gameOver;
    this.player;
    this.asteroidsGroup;
    this.totalAsteroids;
    this.quitBtn;
};

Astevoid.Game.prototype = {

    create: function () {
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;
        this.gameOver = false;
        this.totalAsteroids = 10;
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.buildWorld();

    }, // create function


    buildWorld: function () {

        this.add.image(0, 0, 'gameBg');
        this.buildPlayer();
        this.buildAsteroids();

    }, // buildWorld

    buildPlayer: function () {

        var player = this.add.sprite(150, 200, 'characterImg');
        player.anchor.setTo(0.5, 0.5);
        this.physics.enable(player, Phaser.Physics.ARCADE);
        player.enableBody = true;
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.body.angularVelocity = 0;
        this.player = player;

    }, // buildPlayer

    buildAsteroids: function () {
        this.asteroidsGroup = this.add.group();
        for (var i = 0; i < this.totalAsteroids; i++) {
            var ast = this.asteroidsGroup.create(this.rnd.integerInRange(769, 2000), this.rnd.realInRange(0, this.world.height), 'asteroid');
            var scale = this.rnd.realInRange(0.3, 0.7);
            ast.anchor.setTo(0.5, 0.5);
            ast.scale.x = scale;
            ast.scale.y = scale;
            this.physics.enable(ast, Phaser.Physics.ARCADE);
            ast.enableBody = true;
            ast.body.velocity.x = this.rnd.integerInRange(-150, -400);
            ast.checkWorldBounds = true;
            ast.events.onOutOfBounds.add(this.resetAsteroid, this);
        }

    }, // buildAsteroids

    resetAsteroid: function (ast) {
        if (ast.x < 0) {
            this.respawnAsteroid(ast);
        }
    }, // resetAsteroid


    respawnAsteroid: function (ast) {
        if (this.gameOver == false) {
            ast.reset(this.rnd.integerInRange(769, 2000), this.rnd.realInRange(15, this.world.height - 70));
            ast.body.velocity.x = this.rnd.integerInRange(-150, -400);
        }
    }, // respawnAsteroid

    playerCollision: function (player, ast) {

        //this.game.debug.bodyInfo(ast, 20, 30);
        //this.game.debug.bodyInfo(player, 20, 30);

        this.gameOver = true;
        this.endGame();

    }, // playerCollision


    endGame: function () {

        this.quitBtn = this.add.button(this.world.centerX - 35, this.world.centerY - 30, 'exitBtn', this.quitGame, this);

    }, // endGame

    quitGame: function (pointer) {

        this.state.start('Menu');

    }, // quitGame

    update: function () {

            this.player.body.velocity.x = 10;
            this.player.body.velocity.y = 0;
            this.player.body.angularVelocity = 0;
            this.physics.arcade.overlap(this.player, this.asteroidsGroup, this.playerCollision, null, this);

            if (this.player.x < 0) {
                this.player.x = this.game.width;
            } else if (this.player.x > this.game.width) {
                this.player.x = 0;
            }

            if (this.player.y < 0) {
                this.player.y = this.game.height;
            } else if (this.player.y > this.game.height) {
                this.player.y = 0;
            }


            if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.player.body.angularVelocity = -400;
            } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.player.body.angularVelocity = 400;
            }

            if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.physics.arcade.velocityFromAngle(this.player.angle, 300, this.player.body.velocity);
            }

        } // update

}; // Game prototype
