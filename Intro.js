Astevoid.Intro = function (game) {}

Astevoid.Intro.prototype = {

    create: function () {

        this.add.image(0, 0, 'gameBg');
        this.logo = this.add.image(this.world.centerX, this.world.centerY - 20, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.scale.x = 0;
        this.logo.scale.y = 0;

        var tween = this.add.tween(this.logo.scale).to({
            x: 0.7,
            y: 0.7
        }, 2000, Phaser.Easing.Linear.None, true, 0, 0);

        tween.onComplete.add(this.completed, this);

    },

    completed: function () {

        this.add.image(0, 0, 'gameBg');
        this.logo = this.add.image(this.world.centerX, this.world.centerY - 20, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);

    },
};
