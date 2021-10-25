let apiTools=require('apiTools');
let Saver=require('Saver');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //预加载下一个场景
        cc.director.preloadScene("play", function () {
            cc.log("Next scene preloaded");
        });
    },

    onLoad(){
        this.node.on('touchstart',this.onTouch,this);
    },
    onTouch(){
        let son=this.node.getChildByName('myUuid');
        Saver.myuuid=son.getComponent(cc.Label).string;
        new apiTools().joinGame(Saver.mytoken,Saver.myuuid);

        cc.director.loadScene("play");
    }
    // update (dt) {},
});
