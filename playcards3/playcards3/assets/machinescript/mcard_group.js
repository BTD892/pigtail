cc.Class({
    extends: cc.Component,

    properties: {
        cards:[cc.Node],
        card_ready:[cc.Boolean],
        R_button:cc.Button,
        L_button:cc.Button,
        range:cc.Integer,
        target:cc.Node,
        diamond:cc.Integer,
        heart:cc.Integer,
        club:cc.Integer,
        spade:cc.Integer
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
        this.range = 52;
        for (var i=0;i<52;i++){
            this.node.children[i].cardid = i;
            this.node.children[i].active = false;
        }
    },

    update (dt) {
        this.R_button.node.on('click',this.create_card,this);
        this.L_button.node.on('click',this.create_card,this);
    },
    create_card() {
        let children = this.node.children;
        let games = this.node.parent;
        let lbutton = cc.find("Canvas/Draw_button2");
        let lclub = cc.find("Canvas/L_CLUB");
        let lspade = cc.find("Canvas/L_SPADE");
        let lheart = cc.find("Canvas/L_HEART");
        let ldiamond = cc.find("Canvas/L_DIAMOND");
        choice = games.getComponent("mgames");
        if (choice.side == 1){//left
            let choice_button = cc.find("Canvas/Draw_button2");
            choice_button.getComponent(cc.Button).interactable = false;
            lbutton.getComponent(cc.Button).interactable = false;
            lclub.getComponent(cc.Button).interactable = false;
            lspade.getComponent(cc.Button).interactable = false;
            lheart.getComponent(cc.Button).interactable = false;
            ldiamond.getComponent(cc.Button).interactable = false;
            cc.log(choice_button.name,"关闭左键");
        }
        var rand = Math.random();
        num = Math.floor(rand * this.range);
        if(num%4==0){
            this.diamond+=1;
        }
        else if(num%4==1){
            this.club+=1;
        }
        else if(num%4==2){
            this.spade+=1;
        }
        else if(num%4==3){
            this.heart+=1;
        }
        let judge = cc.find("Canvas/judge");
        cc.log("cardgroup:",children.length);
        cc.log("random card id:",num);
        children[num].active = true;//???????
        // children[num].x = -400;
        cc.log(children[num].name);
        let bt_node = children[num];
        bt_node.parent = judge; 
        bt_node.x = -400;
        let finished = cc.callFunc(function (target){
            this.range -= 1;
            cc.log("range:",this.range);
            let msgForDispatchEvent = new cc.Event.EventCustom("card", true);
            msgForDispatchEvent.detail = bt_node.cardid;
            bt_node.dispatchEvent(msgForDispatchEvent);
            if (choice.side == 1){//left
                let choice_button = cc.find("Canvas/Draw_button2");
                choice_button.getComponent(cc.Button).interactable = true;
                cc.log(choice_button.name,"打开左键");
            }
            else{//right
                let choice_button = cc.find("Canvas/Draw_button");
                choice_button.getComponent(cc.Button).interactable = true;
                cc.log(choice_button.name,"打开右键");
            }
            if (choice.side == 1){
                lbutton.getComponent(cc.Button).interactable = true;
                lclub.getComponent(cc.Button).interactable = true;
                lspade.getComponent(cc.Button).interactable = true;
                lheart.getComponent(cc.Button).interactable = true;
                ldiamond.getComponent(cc.Button).interactable = true;
            }
            let side = new cc.Event.EventCustom("side", true);
            side.detail = "over";
            this.node.dispatchEvent(side);
            cc.log(bt_node.parent.name);
            if (children.length == 0){
                let msgover = new cc.Event.EventCustom("over",true);
                msgover.detail = "Game Over";
                this.node.dispatchEvent(msgover);
            }
        }, this);
        let spawn = cc.spawn(cc.fadeIn(0.5),cc.rotateBy(0.5,360));
        let action = cc.sequence(spawn, cc.moveTo(0.5, 0, 0), cc.scaleTo(1.25,1.25), cc.scaleTo(1,1), finished);
        bt_node.runAction(action);
    }
});
