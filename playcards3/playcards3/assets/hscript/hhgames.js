// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        side:cc.Integer
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.side = 1;
    },

    start () {

    },

    update (dt) {
        if (this.side == 1){
            //cc.log("left");
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
            this.node.on("side", function(msg){
                this.side=0;
                rbutton.active = true;
                rclub.active = true;
                rspade.active = true;
                rheart.active = true;
                rdiamond.active = true;
            },this)
        }
        else if(this.side==0){
            //cc.log("right");
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
            this.node.on("side", function(msg){
                this.side=1;
                lbutton.active = true;
                lclub.active = true;
                lspade.active = true;
                lheart.active = true;
                ldiamond.active = true;
            },this)
        }
        this.node.on("over",function(msg){
            let lbutton = cc.find("Canvas/Draw_button2");
            let lclub = cc.find("Canvas/L_CLUB");
            let lspade = cc.find("Canvas/L_SPADE");
            let lheart = cc.find("Canvas/L_HEART");
            let ldiamond = cc.find("Canvas/L_DIAMOND");
            let lclub2 = cc.find("Canvas/left_club");
            let lspade2 = cc.find("Canvas/left_spade");
            let lheart2 = cc.find("Canvas/left_heart");
            let ldiamond2 = cc.find("Canvas/left_diamond");
            var score1 = lclub2.children.length+lspade2.children.length+lheart2.children.length+ldiamond2.children.length;
            lbutton.active = false;
            lclub.active = false;
            lspade.active = false;
            lheart.active = false;
            ldiamond.active = false;
            let rbutton = cc.find("Canvas/Draw_button");
            let rclub = cc.find("Canvas/R_CLUB");
            let rspade = cc.find("Canvas/R_SPADE");
            let rheart = cc.find("Canvas/R_HEART");
            let rdiamond = cc.find("Canvas/R_DIAMOND");
            let rclub2 = cc.find("Canvas/right_club");
            let rspade2 = cc.find("Canvas/right_spade");
            let rheart2 = cc.find("Canvas/right_heart");
            let rdiamond2 = cc.find("Canvas/right_diamond");
            var score2 = rclub2.children.length+rspade2.children.length+rheart2.children.length+rdiamond2.children.length;
            rbutton.active = false;
            rclub.active = false;
            rspade.active = false;
            rheart.active = false;
            rdiamond.active = false;
            let result = cc.find("Canvas/龙卷轴/胜者");
            let score = cc.find("Canvas/龙卷轴/分数");
            let board = cc.find("Canvas/龙卷轴");
            let tmp = cc.find("Canvas/重开");
            tmp.active = true;
            board.active = true;
            if(score1<score2){
                result.getComponent(cc.Label).string = "火猪猪获胜！！！";
                score.getComponent(cc.Label).string = "最终牌数："+score1;
            }
            else if(score1>score2){
                result.getComponent(cc.Label).string = "木猪猪获胜！！！";
                score.getComponent(cc.Label).string = "最终牌数："+score2;
            }
            else{
                result.getComponent(cc.Label).string = "势均力敌！！！";
                score.getComponent(cc.Label).string = "最终牌数："+score1+"and"+score2;
            }
            cc.director.pause();
        },this)
    },
    remake(){
        cc.director.resume();
        cc.director.loadScene("双人对战");
    }
});
