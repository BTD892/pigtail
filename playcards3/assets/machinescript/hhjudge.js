cc.Class({
    extends: cc.Component,

    properties: {
        top_id:cc.Integer
    },

    // LIFE-CYCLE CALLBACKS:
    start () {
        this.top_id = 52;
    },
    onLoad () {
        this.node.on("hcollision",function(msg){
            let games = this.node.parent;
            let player = games.getComponent('hhgames');
            if (player.side == 0){//右边
                let children = this.node.children;
                while(this.node.children.length != 0){
                    let pos = this.node.children.length - 1;
                    if (this.node.children[pos].cardid % 4 == 0){//方块
                        let diamond = cc.find("Canvas/right_diamond");
                        children[pos].x = this.node.x-diamond.x;
                        children[pos].y = this.node.y-diamond.y;
                        let action1 = cc.moveTo(0.5,0,0);
                        children[pos].runAction(action1);
                        let bt_node = children[pos];
                        bt_node.parent = diamond;
                    }
                    else if (this.node.children[pos].cardid % 4 == 1){//梅花
                        let club = cc.find("Canvas/right_club");
                        children[pos].x = this.node.x-club.x;
                        children[pos].y = this.node.y-club.y;
                        let action2 = cc.moveTo(0.5,0,0);
                        children[pos].runAction(action2);
                        let bt_node = children[pos];
                        bt_node.parent = club;
                    }
                    else if (this.node.children[pos].cardid % 4 == 2){//黑桃
                        let spade = cc.find("Canvas/right_spade");
                        children[pos].x = this.node.x-spade.x;
                        children[pos].y = this.node.y-spade.y;
                        let action3 = cc.moveTo(0.5,0,0);
                        children[pos].runAction(action3);
                        let bt_node = children[pos];
                        bt_node.parent = spade;
                    }
                    else{//红桃
                        let heart = cc.find("Canvas/right_heart");
                        children[pos].x = this.node.x-heart.x;
                        children[pos].y = this.node.y-heart.y;
                        let action4 = cc.moveTo(0.5,0,0);
                        children[pos].runAction(action4);
                        let bt_node = children[pos];
                        bt_node.parent = heart;
                    }
                    if(this.node.children.length == 0){
                        this.top_id = 52;
                    }
                }
            }
            else if(player.side == 1){//左边
                let children = this.node.children;
                while(this.node.children.length != 0){
                    let pos = this.node.children.length - 1;
                    if (this.node.children[pos].cardid % 4 == 0){//方块
                        let diamond = cc.find("Canvas/left_diamond");
                        cc.log("left diamond");
                        children[pos].x = this.node.x-diamond.x;
                        children[pos].y = this.node.y-diamond.y;
                        let action1 = cc.moveTo(0.5,0,0);
                        children[pos].runAction(action1);
                        let bt_node = children[pos];
                        bt_node.parent = diamond;
                    }
                    else if (this.node.children[pos].cardid % 4 == 1){//梅花
                        let club = cc.find("Canvas/left_club");
                        cc.log("left club");
                        children[pos].x = this.node.x-club.x;
                        children[pos].y = this.node.y-club.y;
                        let action2 = cc.moveTo(0.5,0,0);
                        children[pos].runAction(action2);
                        let bt_node = children[pos];
                        bt_node.parent = club;
                    }
                    else if (this.node.children[pos].cardid % 4 == 2){//黑桃
                        let spade = cc.find("Canvas/left_spade");
                        cc.log("left spade");
                        children[pos].x = this.node.x-spade.x;
                        children[pos].y = this.node.y-spade.y;
                        let action3 = cc.moveTo(0.5,0,0);
                        children[pos].runAction(action3);
                        let bt_node = children[pos];
                        bt_node.parent = spade;
                    }
                    else{//红桃
                        let heart = cc.find("Canvas/left_heart");
                        cc.log("left heart");
                        children[pos].x = this.node.x-heart.x;
                        children[pos].y = this.node.y-heart.y;
                        let action4 = cc.moveTo(0.5,0,0);
                        children[pos].runAction(action4);
                        let bt_node = children[pos];
                        bt_node.parent = heart;
                    }
                    if(this.node.children.length == 0){
                        this.top_id = 52;
                    }
                }
            }
        },this)


        this.node.on("card", function (msg){
            var num = msg.detail;
            let games = this.node.parent;
            let player = games.getComponent('hhgames');
            cc.log(player.side);
            if (player.side == 0){//右边
                if (this.top_id == 52){
                    this.top_id = num;
                }
                else{
                    var gap = Math.abs(this.top_id - num);
                    cc.log("gap:",gap);
                    if (gap % 4 == 0){
                        let children = this.node.children;
                        while(this.node.children.length != 0){
                            let pos = this.node.children.length - 1;
                            if (this.node.children[pos].cardid % 4 == 0){//方块
                                let diamond = cc.find("Canvas/right_diamond");
                                children[pos].x = this.node.x-diamond.x;
                                children[pos].y = this.node.y-diamond.y;
                                let action1 = cc.moveTo(0.5,0,0);
                                children[pos].runAction(action1);
                                let bt_node = children[pos];
                                bt_node.parent = diamond;
                                cc.log(bt_node.name,bt_node.x);
                            }
                            else if (this.node.children[pos].cardid % 4 == 1){//梅花
                                let club = cc.find("Canvas/right_club");
                                children[pos].x = this.node.x-club.x;
                                children[pos].y = this.node.y-club.y;
                                let action2 = cc.moveTo(0.5,0,0);
                                children[pos].runAction(action2);
                                let bt_node = children[pos];
                                bt_node.parent = club;
                            }
                            else if (this.node.children[pos].cardid % 4 == 2){//黑桃
                                let spade = cc.find("Canvas/right_spade");
                                children[pos].x = this.node.x-spade.x;
                                children[pos].y = this.node.y-spade.y;
                                let action3 = cc.moveTo(0.5,0,0);
                                children[pos].runAction(action3);
                                let bt_node = children[pos];
                                bt_node.parent = spade;
                            }
                            else{//红桃
                                let heart = cc.find("Canvas/right_heart");
                                children[pos].x = this.node.x-heart.x;
                                children[pos].y = this.node.y-heart.y;
                                let action4 = cc.moveTo(0.5,0,0);
                                children[pos].runAction(action4);
                                let bt_node = children[pos];
                                bt_node.parent = heart;
                            }
                            if(this.node.children.length == 0){
                                this.top_id = 52;
                            }
                        }
                    }
                    else{
                        this.top_id = num;
                    }
                }
            }
            else if(player.side == 1){//左边
                if (this.top_id == 52){
                    this.top_id = num;
                }
                else{
                    var gap = Math.abs(this.top_id - num);
                    cc.log("gap:",gap);
                    if (gap % 4 == 0){
                        let children = this.node.children;
                        while(this.node.children.length != 0){
                            let pos = this.node.children.length - 1;
                            if (this.node.children[pos].cardid % 4 == 0){//方块
                                let diamond = cc.find("Canvas/left_diamond");
                                cc.log("left diamond");
                                children[pos].x = this.node.x-diamond.x;
                                children[pos].y = this.node.y-diamond.y;
                                let action1 = cc.moveTo(0.5,0,0);
                                children[pos].runAction(action1);
                                let bt_node = children[pos];
                                bt_node.parent = diamond;
                            }
                            else if (this.node.children[pos].cardid % 4 == 1){//梅花
                                let club = cc.find("Canvas/left_club");
                                cc.log("left club");
                                children[pos].x = this.node.x-club.x;
                                children[pos].y = this.node.y-club.y;
                                let action2 = cc.moveTo(0.5,0,0);
                                children[pos].runAction(action2);
                                let bt_node = children[pos];
                                bt_node.parent = club;
                            }
                            else if (this.node.children[pos].cardid % 4 == 2){//黑桃
                                let spade = cc.find("Canvas/left_spade");
                                cc.log("left spade");
                                children[pos].x = this.node.x-spade.x;
                                children[pos].y = this.node.y-spade.y;
                                let action3 = cc.moveTo(0.5,0,0);
                                children[pos].runAction(action3);
                                let bt_node = children[pos];
                                bt_node.parent = spade;
                            }
                            else{//红桃
                                let heart = cc.find("Canvas/left_heart");
                                cc.log("left heart");
                                children[pos].x = this.node.x-heart.x;
                                children[pos].y = this.node.y-heart.y;
                                let action4 = cc.moveTo(0.5,0,0);
                                children[pos].runAction(action4);
                                let bt_node = children[pos];
                                bt_node.parent = heart;
                            }
                            if(this.node.children.length == 0){
                                this.top_id = 52;
                            }
                        }
                    }
                    else{
                        this.top_id = num;
                    }
                }
            }
        },this)
    },



    // update (dt) {},
});
