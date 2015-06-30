Astevoid.Game = function (game) {}

Astevoid.Game.prototype = {
    create: function () {
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;
        this.gameOver = false;
        this.seconds = 0;
        this.timer = this.time.create(false);
        this.timer.loop(10, this.updateTime, this);
        this.totalAsteroids = 20;
        this.lives = 3;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.buildWorld();

    }, // create function

    buildWorld: function () {
        this.add.image(0, 0, 'gameBg');
        this.buildPlayer();
        this.buildAsteroids();
        var score = this.add.bitmapText(10, 5, 'font', ' ', 35);
        var heart1 = this.add.image(740, 8, 'heart');
        var heart2 = this.add.image(715, 8, 'heart');
        var heart3 = this.add.image(690, 8, 'heart');
        this.score = score;
        this.timer.start();
    }, // buildWorld

    updateTime: function () {
        this.seconds++;
    }, // updateTime

    buildPlayer: function () {

        var player = this.add.sprite(150, 200, 'characterImg');
        player.anchor.setTo(0.5, 0.5);
        this.physics.enable(player, Phaser.Physics.ARCADE);
        player.enableBody = true;
        this.player = player;

    }, // buildPlayer

    buildAsteroids: function () {
        this.asteroidsGroup = this.add.group();
        for (var i = 0; i < this.totalAsteroids; i++) {
            var ast = this.asteroidsGroup.create(this.rnd.integerInRange(800, 3000), this.rnd.realInRange(0, this.world.height), 'asteroid');
            var scale = this.rnd.realInRange(0.3, 0.7);
            ast.anchor.setTo(0.5, 0.5);
            ast.scale.x = scale;
            ast.scale.y = scale;
            this.physics.enable(ast, Phaser.Physics.ARCADE);
            ast.enableBody = true;
            ast.body.velocity.x = this.rnd.integerInRange(-100, -400);
            ast.body.angularVelocity = this.rnd.integerInRange(-300, 300);
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
            ast.reset(this.rnd.integerInRange(800, 3000), this.rnd.realInRange(0, this.world.height));
            ast.body.velocity.x = this.rnd.integerInRange(-100, -400);
            ast.body.angularVelocity = this.rnd.integerInRange(-300, 300);
            var scale = this.rnd.realInRange(0.3, 0.7);
            ast.scale.x = scale;
            ast.scale.y = scale;
        }
    }, // respawnAsteroid

    playerCollision: function (player, ast) {
        this.lives--;
        if (this.lives <= 0) {
            this.gameOver = true;
            var alive = this.add.bitmapText(100, 55, 'font', this.lives, 35);
            this.endGame();
        }

    }, // playerCollision


    endGame: function () {

        this.timer.stop();
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        exitBtn = this.add.bitmapText(this.world.centerX - 35, this.world.centerY - 30, 'font', 'Exit', 60);
        exitBtn.align = 'center';
        exitBtn.x = this.game.width / 2 - exitBtn.textWidth / 2;
        exitBtn.inputEnabled = true;
        var endKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        endKey.onDown.add(this.quitGame, this);
        exitBtn.events.onInputDown.addOnce(this.quitGame, this);

    }, // endGame

    quitGame: function (pointer) {

        this.state.start('Menu');

    }, // quitGame

    update: function () {

        this.score.setText(this.seconds);

        this.player.body.velocity.x = 10;
        this.player.body.velocity.y = 0;
        this.player.body.angularVelocity = 0;
        this.physics.arcade.overlap(this.player, this.asteroidsGroup, this.playerCollision, null, this);

        // screen wrap logic
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

        // movement
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.angularVelocity = -400;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.angularVelocity = 400;
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.physics.arcade.velocityFromAngle(this.player.angle, 350, this.player.body.velocity);
        }

    }, // update

}; // Game prototype
