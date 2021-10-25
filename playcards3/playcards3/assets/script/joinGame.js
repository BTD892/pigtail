let apiTools=require('apiTools');
let Saver=require('Saver');

cc.Class({
    extends: cc.Component,

    properties: {
        joinUuid:{
            default:null,
            type:cc.EditBox
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //预加载下一个场景
        cc.director.preloadScene("play", function () {
            cc.log("Next scene preloaded");
        });
    },

    btnClick(){

        console.log("要查询的房间号为"+this.joinUuid.string);
        Saver.myuuid=this.joinUuid.string;
        new apiTools().joinGame(Saver.mytoken,Saver.myuuid);

        cc.director.loadScene("play");
    }


    // update (dt) {},
});
