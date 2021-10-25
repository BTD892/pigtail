cc.Class({
    extends: cc.Component,

    properties: {
        button:cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.button.node.on('click',this.deliver_card, this);
    },

    start () {

    },
    deliver_card(){
        let lbutton = cc.find("Canvas/Draw_button2");
        let lclub = cc.find("Canvas/L_CLUB");
        let lspade = cc.find("Canvas/L_SPADE");
        let lheart = cc.find("Canvas/L_HEART");
        let ldiamond = cc.find("Canvas/L_DIAMOND");
        lbutton.getComponent(cc.Button).interactable = false;
        lclub.getComponent(cc.Button).interactable = false;
        lspade.getComponent(cc.Button).interactable = false;
        lheart.getComponent(cc.Button).interactable = false;
        ldiamond.getComponent(cc.Button).interactable = false;
        let children = this.node.children;
        let len = this.node.children.length;
        let judge = cc.find("Canvas/judge");
        let father = this.node.parent;
        player = father.getComponent('games');
        top = judge.getComponent("judge");
        let finished = cc.callFunc(function (target){
            let bt_node = children[len-1];
            bt_node.parent = judge;
            bt_node.x = 0;
            bt_node.y = 0;
            if (((top.top_id - bt_node.cardid)%4==0) && (top.top_id != 52)){
                cc.log("所出的碰撞手牌：",bt_node.name);
                let collision = new cc.Event.EventCustom("hcollision", true);
                collision.detail = "nice";
                bt_node.dispatchEvent(collision);
            }
            else{
                top.top_id = bt_node.cardid;
            }
            if (player.side == 1){//左边
                let side = new cc.Event.EventCustom("side", true);
                side.detail = "over";
                this.node.dispatchEvent(side);
                cc.log("现在是左边");
            }
            else{//右边
                player.side = 1;
                cc.log("现在是右边");
            }
            lbutton.getComponent(cc.Button).interactable = true;
            lclub.getComponent(cc.Button).interactable = true;
            lspade.getComponent(cc.Button).interactable = true;
            lheart.getComponent(cc.Button).interactable = true;
            ldiamond.getComponent(cc.Button).interactable = true;
        }, this);
        let spawn = cc.spawn(cc.moveTo(0.2,judge.x-this.node.x,judge.y-this.node.y),cc.rotateBy(0.2,360));
        let action = cc.sequence(spawn,cc.scaleTo(0.2,1.25), cc.scaleTo(0.2,1),finished);
        children[len-1].runAction(action);
    },
    update (dt) {},
});
