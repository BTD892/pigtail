let apiTools=require('apiTools');
let Saver=require('Saver');

cc.Class({
    extends: cc.Component,

    properties: {

    },



    onLoad () {
        this.node.on('touchstart',this.onTouch,this);
    },
    onTouch(){
        Saver.createuuid=new apiTools().createGame(Saver.mytoken,true);
        Saver.myuuid=Saver.createuuid;
        let node_1=cc.find('Canvas/bg1/Blank/Tip_1');
        node_1.active=false;

        let node_2=cc.find('Canvas/bg1/Blank/Tip_2/text');
        // node_2.string='您创建的房间号为'+Saver.createuuid;
        // node_2=cc.find('Canvas/bg1/Blank/Tip_2/text');
        // console.log("标签的string为"+node_2.string);

       node_2.getComponent('cc.Label').string='您创建的房间号为\n'+Saver.createuuid+'\n点击确认进入你的房间';

        let node_3=cc.find('Canvas/bg1/Blank/Tip_2');
        node_3.active=true;
    },

    start () {

    },

    // update (dt) {},
});
