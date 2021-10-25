// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        cardid:cc.Integer
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.opcity = 0;
        this.node.active = false;
        cc.log(this.node.name);
    },

    start () {
        
    },

    update (dt) {},
});
