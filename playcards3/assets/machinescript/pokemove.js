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
        this.button.node.on('click',this.movepoke,this);
        this.button2.node.on('click',this.movepoke2,this);
        this.button3.node.on('click',this.movepoke3,this);
    },
    movepoke(){
        let finished = cc.callFunc(function(target){
            let finish2 = cc.callFunc(function(target){
                cc.director.loadScene("人机");
            },this)
            let action2 = cc.sequence(cc.fadeOut(1),finish2);
            this.node.runAction(action2);
        },this)
        let action = cc.spawn(cc.rotateBy(1,360),cc.moveTo(1,800,214),cc.scaleTo(1,0.4,0.4),finished);
        this.node.runAction(action);
    },
    movepoke2(){
        let finished = cc.callFunc(function(target){
            let finish2 = cc.callFunc(function(target){
                cc.director.loadScene("双人对战");
            },this)
            let action2 = cc.sequence(cc.fadeOut(1),finish2);
            this.node.runAction(action2);
        },this)
        let action = cc.spawn(cc.rotateBy(1,360),cc.moveTo(1,800,214),cc.scaleTo(1,0.4,0.4),finished);
        this.node.runAction(action);
    },
    movepoke3(){
        let finished = cc.callFunc(function(target){
            let finish2 = cc.callFunc(function(target){
                cc.director.loadScene("login");
            },this)
            let action2 = cc.sequence(cc.fadeOut(1),finish2);
            this.node.runAction(action2);
        },this)
        let action = cc.spawn(cc.rotateBy(1,360),cc.moveTo(1,800,214),cc.scaleTo(1,0.4,0.4),finished);
        this.node.runAction(action);
    }
});
