Astevoid.Game = function (game) {}

Astevoid.Game.prototype = {


    create: function () {
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;
        this.gameOver = false;
        this.seconds = 0;
        this.timer = this.time.create(false);
        this.timer.loop(10, this.updateTime, this);
        this.totalAsteroids = 18;
        this.lives = 3;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.music = this.add.audio('gameMusic');
        this.music.play('', 0, 0.3, true);
        this.hit1 = this.add.audio('onHit1');
        this.hit2 = this.add.audio('onHit2');
        this.onDeath = this.add.audio('onDeath');
        this.powerUp = this.add.audio('powerUp');
        this.selection = this.add.audio('onSelect');
        this.buildWorld();
    }, // create function

    buildWorld: function () {
        this.add.image(0, 0, 'gameBg');
        this.asteroidsGroup = this.add.group();
        this.buildAsteroids();
        this.buildPlayer();
        var score = this.add.bitmapText(10, 5, 'font', ' ', 35);
        var heart1 = this.add.image(740, 8, 'heart');
        var heart2 = this.add.image(715, 8, 'heart');
        var heart3 = this.add.image(690, 8, 'heart');
        this.heart1 = heart1;
        this.heart2 = heart2;
        this.heart3 = heart3;
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
        dummy = this.add.sprite(0, 0, 'charDeath', 0);
        dummy.anchor.setTo(0.5, 0.5);
        anim = dummy.animations.add('charDeath');
        dummy.visible = false;
        this.player = player;

    }, // buildPlayer

    buildAsteroids: function () {
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
            ast.events.onOutOfBounds.add(this.respawnAsteroid, this);
        }
    }, // buildAsteroids

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
        if (this.lives == 3) {
            this.lives--;
            this.hit1.play();
            this.respawnAsteroid(ast);
            this.heart3.visible = false;
        } else if (this.lives == 2) {
            this.lives--;
            this.hit2.play();
            this.respawnAsteroid(ast);
            this.heart2.visible = false;
        } else {
            this.timer.stop();
            dummy.angle = this.player.angle;
            dummy.y = this.player.y;
            dummy.x = this.player.x;
            this.player.kill();
            dummy.visible = true;
            anim.play(24, false);
            this.onDeath.play();
            this.lives--;
            this.heart1.visible = false;
            this.music.destroy();
            this.gameOver = true;
            this.endGame();
        }
    }, // playerCollision

    endGame: function () {

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        exitBtn = this.add.bitmapText(this.world.centerX - 35, this.world.centerY - 30, 'font', 'Spacebar to Exit', 48);
        exitBtn.align = 'center';
        exitBtn.x = this.game.width * 0.5 - exitBtn.textWidth * 0.5;
        exitBtn.inputEnabled = true;
        var endKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        endKey.onDown.add(this.quitGame, this);
        exitBtn.events.onInputDown.addOnce(this.quitGame, this);

    }, // endGame

    quitGame: function (pointer) {
        this.check = store.get('hiScore');
        if (this.check < this.seconds) {
            store.set('hiScore', this.seconds);
        }
        this.timer.destroy();
        this.player.destroy();
        dummy.destroy();
        this.asteroidsGroup.destroy();
        this.heart1.destroy();
        this.heart2.destroy();
        this.heart3.destroy();
        this.onDeath.destroy();
        this.powerUp.destroy();
        this.hit1.destroy();
        this.hit2.destroy();

        this.selection.play();
        this.state.start('Menu');
        this.endBtn.destroy();
        this.score.destroy();

    }, // quitGame

    update: function () {
        this.score.setText(this.seconds);

        if ((this.seconds % 3000) == 0) {

            if (this.lives == 2) {
                this.lives++;
                this.powerUp.play();
                this.heart3.visible = true;
            } else if (this.lives == 1) {
                this.lives++;
                this.powerUp.play();
                this.heart2.visible = true;
            }
        }
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
            this.player.body.angularVelocity = -500;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.angularVelocity = 500;
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.physics.arcade.velocityFromAngle(this.player.angle, 365, this.player.body.velocity);
        }
    }, // update

}; // Game prototype
