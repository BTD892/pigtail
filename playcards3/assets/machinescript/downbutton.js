// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        button:cc.Button,
        button2:cc.Button,
        button3:cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.button.node.on('click',this.move_chin,this);
        this.button2.node.on('click',this.move_chin,this);
        this.button3.node.on('click',this.move_chin,this);
    },
    move_chin(){
        let finished = cc.callFunc(function(target){
            let action2 = cc.moveBy(1,0,50);
            this.node.runAction(action2);
        },this)
        let action = cc.sequence(cc.moveBy(1,0,-50),finished);
        this.node.runAction(action)
    }
});
