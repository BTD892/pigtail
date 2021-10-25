let Saver=require('Saver');

cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {
        //在这里编辑第二个提示框中的房间号？
        this.node.on('touchstart',this.onTouch,this);
    },
    onTouch(){


        let node_3=cc.find('Canvas/bg1/Blank');
        node_3.active=false;
        let node_1=cc.find('Canvas/bg1/Blank/Tip_1');
        node_1.active=true;
        let node_2=cc.find('Canvas/bg1/Blank/Tip_2');
        node_2.active=false;

        Saver.isHost=true;

        cc.director.loadScene("play");

    },

    start () {
        //预加载下一个场景
        cc.director.preloadScene("play", function () {
            cc.log("Next scene preloaded");
        });
    },

    // update (dt) {},
});
