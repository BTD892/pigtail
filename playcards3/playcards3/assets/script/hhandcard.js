cc.Class({
    extends: cc.Component,

    properties: {
        button:cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.log(this.button.Node.name)
        this.button.node.on('click',this.deliver_card, this);
        // cc.log(this.button.node.name);
    },

    start () {

    },
    deliver_card(){
        let children = this.node.children;
        let len = this.node.children.length;
        let judge = cc.find("Canvas/judge");
        let father = this.node.parent;
        player = father.getComponent('hgames');
        top = judge.getComponent("hjudge");
        if (player.side == 0){
            cc.log("day");
            let rbutton = cc.find("Canvas/Draw_button");
            let rclub = cc.find("Canvas/R_CLUB");
            let rspade = cc.find("Canvas/R_SPADE");
            let rheart = cc.find("Canvas/R_HEART");
            let rdiamond = cc.find("Canvas/R_DIAMOND");
            rbutton.active = false;
            rclub.active = false;
            rspade.active = false;
            rheart.active = false;
            rdiamond.active = false;
        }
        else{
            cc.log("night");
            let lbutton = cc.find("Canvas/Draw_button2");
            let lclub = cc.find("Canvas/L_CLUB");
            let lspade = cc.find("Canvas/L_SPADE");
            let lheart = cc.find("Canvas/L_HEART");
            let ldiamond = cc.find("Canvas/L_DIAMOND");
            lbutton.active = false;
            lclub.active = false;
            lspade.active = false;
            lheart.active = false;
            ldiamond.active = false;
        }
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
                player.side = 0;
                cc.log("现在是左边");
                let rbutton = cc.find("Canvas/Draw_button");
                let rclub = cc.find("Canvas/R_CLUB");
                let rspade = cc.find("Canvas/R_SPADE");
                let rheart = cc.find("Canvas/R_HEART");
                let rdiamond = cc.find("Canvas/R_DIAMOND");
                rbutton.active = true;
                rclub.active = true;
                rspade.active = true;
                rheart.active = true;
                rdiamond.active = true;
            }
            else{//右边
                player.side = 1;
                cc.log("现在是右边");
                let lbutton = cc.find("Canvas/Draw_button2");
                let lclub = cc.find("Canvas/L_CLUB");
                let lspade = cc.find("Canvas/L_SPADE");
                let lheart = cc.find("Canvas/L_HEART");
                let ldiamond = cc.find("Canvas/L_DIAMOND");
                lbutton.active = true;
                lclub.active = true;
                lspade.active = true;
                lheart.active = true;
                ldiamond.active = true;
            }
        }, this);
        let spawn = cc.spawn(cc.moveTo(0.3,judge.x-this.node.x,judge.y-this.node.y),cc.rotateBy(0.3,360));
        let action = cc.sequence(spawn,cc.scaleTo(1.25,1.25), cc.scaleTo(1,1),finished);
        children[len-1].runAction(action);
    },
    update (dt) {},
});
