cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad () {
        this.node.on('touchstart',this.onTouch,this);
    },

    onTouch(){//相应点击事件的回调函数
        let node=cc.find('Canvas/bg1/Blank');
        node.active=true;
    },
    start () {

    },

    // update (dt) {},
});
