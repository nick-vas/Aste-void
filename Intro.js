Astevoid.Intro = function (game) {}

Astevoid.Intro.prototype = {

    create: function () {
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;
        this.music = this.add.audio('introSound');
        this.music.play('', 0, 0.3, false);
        this.music.onStop.add(this.startMenu, this);
        this.add.image(0, 0, 'gameBg');
        this.logo = this.add.image(this.world.centerX, this.world.centerY - 45, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.scale.x = 0;
        this.logo.scale.y = 0;

        var tweenLogo = this.add.tween(this.logo.scale).to({
            x: 0.7,
            y: 0.7
        }, 2000, Phaser.Easing.Linear.None, true, 0, 0);

        tweenLogo.onComplete.add(this.completed, this);

    },

    completed: function () {
        this.type = this.add.image(this.world.centerX, this.world.centerY + 150, 'logoType');
        this.type.anchor.setTo(0.5, 0.5);
        this.type.scale.x = 0.5;
        this.type.scale.y = 0.5;
        this.type.alpha = 0;
        var tweenType = this.add.tween(this.type).to({
            alpha: 1
        }, 1500, Phaser.Easing.Linear.None, true, 0, 0);

        //tweenType.onComplete.add(this.startMenu, this);

    },

    startMenu: function () {

        this.logo.destroy();
        this.type.destroy();

        this.state.start('Menu');
    }
};
