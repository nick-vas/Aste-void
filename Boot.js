var Jumpathlon = {};

Jumpathlon.Boot = function (game) {};

Jumpathlon.Boot.prototype = {
    preload: function () {

    },

    create: function () {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.maxWidth = 769;
        this.scale.maxHeight = 400;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.stage.forcePortrait = true;
        this.scale.setScreenSize(true);

        this.input.addPointer();
        this.stage.backgroundColor = '--';

        //preloader initiation
        this.state.start('Preloader');
    }
}
