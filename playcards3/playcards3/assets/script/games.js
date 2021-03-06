cc.Class({
    extends: cc.Component,

    properties: {
        side:cc.Integer,
        cnt:cc.Integer
    },


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
                this.cnt = 0;
            },this)
        }
        else if(this.side==0){
            //cc.log("right");
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
            let rclub = cc.find("Canvas/right_club");
            let rspade = cc.find("Canvas/right_spade");
            let rheart = cc.find("Canvas/right_heart");
            let rdiamond = cc.find("Canvas/right_diamond");
            let lclub1 = cc.find("Canvas/left_club");
            let lspade1 = cc.find("Canvas/left_spade");
            let lheart1 = cc.find("Canvas/left_heart");
            let ldiamond1 = cc.find("Canvas/left_diamond");
            let judge = cc.find("Canvas/judge");
            let cardgroup = cc.find("Canvas/cardbg");
            var othernum = lclub1.children.length + lspade1.children.length + lheart1.children.length + ldiamond1.children.length;//?????????????????????
            var mycard = rclub.children.length + rspade.children.length + rheart.children.length + rdiamond.children.length;//?????????????????????
            var mynum = othernum + judge.children.length + cardgroup.children.length;
            if(this.cnt==0){
                if (mycard < 12){
                    opt1 = cardgroup.getComponent("card_group");
                    opt1.create_card();
                }
                else{
                    if ((mycard+judge.children.length+cardgroup.children.length*2)<(othernum-cardgroup.children.length)){
                        opt1 = cardgroup.getComponent("card_group");
                        opt1.create_card();
                    }
                    else{
                        let top_id = judge.getComponent("judge").top_id;
                        let tmp = cardgroup.getComponent("card_group");
                        dnum = tmp.diamond;
                        cnum = tmp.club;
                        snum = tmp.spade;
                        hnum = tmp.heart;
                        let choice1 = top_id % 4;
                        if (choice1 == 0 && top_id != 52){//????????????
                            let choice2 = Math.max(lclub1.children.length,lspade1.children.length,lheart1.children.length,cnum,snum,hnum);
                            if(choice2 == lclub1.children.length && rclub.children.length != 0){
                                opt2 = rclub.getComponent("handcard");
                                opt2.deliver_card();
                            }
                            else if(choice2 == lspade1.children.length && rspade.children.length != 0){
                                opt3 = rspade.getComponent("handcard");
                                opt3.deliver_card();
                            }
                            else if(lheart1.children.length == choice2 && rheart.children.length != 0){
                                opt4 = rheart.getComponent("handcard");
                                opt4.deliver_card();
                            }
                            else if(choice2 == cnum && rclub.children.length != 0){
                                opt2 = rclub.getComponent("handcard");
                                opt2.deliver_card();
                            }
                            else if(choice2== snum && rspade.children.length != 0){
                                opt3 = rspade.getComponent("handcard");
                                opt3.deliver_card();
                            }
                            else if(choice2 == hnum && rheart.children.length != 0){
                                opt4 = rheart.getComponent("handcard");
                                opt4.deliver_card();
                            }
                            else{
                                let choice3 = Math.max(rclub.children.length,rspade.children.length,rheart.children.length);
                                if(choice3 == rclub.children.length){
                                    opt2 = rclub.getComponent("handcard");
                                    opt2.deliver_card();
                                }
                                else if(choice3 == rspade.children.length){
                                    opt3 = rspade.getComponent("handcard");
                                    opt3.deliver_card();
                                }
                                else if(choice3 == rheart.children.length){
                                    opt4 = rheart.getComponent("handcard");
                                    opt4.deliver_card();
                                }
                            }
                        }
                        else if(choice1 == 1 && top_id != 52){//????????????
                            let choice2 = Math.max(ldiamond1.children.length,lspade1.children.length,lheart1.children.length,dnum,snum,hnum);
                            if(choice2 == ldiamond1.children.length && rdiamond.children.length != 0){
                                opt2 = rdiamond.getComponent("handcard");
                                opt2.deliver_card();
                            }
                            else if(choice2 == lspade1.children.length && rspade.children.length != 0){
                                opt3 = rspade.getComponent("handcard");
                                opt3.deliver_card();
                            }
                            else if(lheart1.children.length == choice2 && rheart.children.length != 0){
                                opt4 = rheart.getComponent("handcard");
                                opt4.deliver_card();
                            }
                            else if(choice2 == dnum && rdiamond.children.length != 0){
                                opt2 = rdiamond.getComponent("handcard");
                                opt2.deliver_card();
                            }
                            else if(choice2== snum && rspade.children.length != 0){
                                opt3 = rspade.getComponent("handcard");
                                opt3.deliver_card();
                            }
                            else if(choice2 == hnum && rheart.children.length != 0){
                                opt4 = rheart.getComponent("handcard");
                                opt4.deliver_card();
                            }
                            else{
                                let choice3 = Math.max(rspade.children.length,rdiamond.children.length,rheart.children.length);
                                if(choice3 == rspade.children.length){
                                    opt3 = rspade.getComponent("handcard");
                                    opt3.deliver_card();
                                }
                                else if(choice3 == rdiamond.children.length){
                                    opt4 = rdiamond.getComponent("handcard");
                                    opt4.deliver_card();
                                }
                                else if(choice3 == rheart.children.length){
                                    opt4 = rheart.getComponent("handcard");
                                    opt4.deliver_card();
                                }
                            }
                        }
                        else if(choice1 == 2 && top_id != 52){//????????????
                            let choice2 = Math.max(lclub1.children.length,ldiamond1.children.length,lheart1.children.length,cnum,dnum,hnum);
                            if(choice2 == lclub1.children.length && rheart.children.length != 0){
                                opt2 = rclub.getComponent("handcard");
                                opt2.deliver_card();
                            }
                            else if(choice2 == ldiamond1.children.length && rdiamond.children.length != 0){
                                opt3 = rdiamond.getComponent("handcard");
                                opt3.deliver_card();
                            }
                            else if(lheart1.children.length == choice2 && rheart.children.length != 0){
                                opt4 = rheart.getComponent("handcard");
                                opt4.deliver_card();
                            }
                            else if(choice2 == dnum && rdiamond.children.length != 0){
                                opt2 = rdiamond.getComponent("handcard");
                                opt2.deliver_card();
                            }
                            else if(choice2== hnum && rheart.children.length != 0){
                                opt3 = rheart.getComponent("handcard");
                                opt3.deliver_card();
                            }
                            else if(choice2 == cnum && rclub.children.length != 0){
                                opt4 = rclub.getComponent("handcard");
                                opt4.deliver_card();
                            }
                            else{
                                let choice3 = Math.max(rclub.children.length,rdiamond.children.length,rheart.children.length);
                                if(choice3 == rclub.children.length){
                                    opt2 = rclub.getComponent("handcard");
                                    opt2.deliver_card();
                                }
                                else if(choice3 == rdiamond.children.length){
                                    opt4 = rdiamond.getComponent("handcard");
                                    opt4.deliver_card();
                                }
                                else if(choice3 == rheart.children.length){
                                    opt4 = rheart.getComponent("handcard");
                                    opt4.deliver_card();
                                }
                            }
                        }
                        else if(choice1 == 3 && top_id != 52){//????????????
                            let choice2 = Math.max(lclub1.children.length,lspade1.children.length,lclub1.children.length,cnum,snum,cnum);
                            if(choice2 == lclub1.children.length && rclub.children.length != 0){
                                opt2 = rclub.getComponent("handcard");
                                opt2.deliver_card();
                            }
                            else if(choice2 == lspade1.children.length && rspade.children.length != 0){
                                opt3 = rspade.getComponent("handcard");
                                opt3.deliver_card();
                            }
                            else if(ldiamond1.children.length == choice2 && rdiamond.children.length != 0){
                                opt4 = rdiamond.getComponent("handcard");
                                opt4.deliver_card();
                            }
                            else if(choice2 == cnum && rclub.children.length != 0){
                                opt2 = rclub.getComponent("handcard");
                                opt2.deliver_card();
                            }
                            else if(choice2== snum && rspade.children.length != 0){
                                opt3 = rspade.getComponent("handcard");
                                opt3.deliver_card();
                            }
                            else if(choice2 == dnum && rdiamond.children.length != 0){
                                opt4 = rdiamond.getComponent("handcard");
                                opt4.deliver_card();
                            }
                            else{
                                let choice3 = Math.max(rclub.children.length,rspade.children.length,rdiamond.children.length);
                                if(choice3 == rclub.children.length){
                                    opt2 = rclub.getComponent("handcard");
                                    opt2.deliver_card();
                                }
                                else if(choice3 == rspade.children.length){
                                    opt3 = rspade.getComponent("handcard");
                                    opt3.deliver_card();
                                }
                                else if(choice3 == rdiamond.children.length){
                                    opt4 = rdiamond.getComponent("handcard");
                                    opt4.deliver_card();
                                }
                            }
                        }
                        else{
                            let choice2 = Math.max(rclub.children.length,rspade.children.length,rdiamond.children.length,rheart.children.length);
                            if(choice2 == rclub.children.length){
                                opt2 = rclub.getComponent("handcard");
                                opt2.deliver_card();
                            }
                            else if(choice2 == rspade.children.length){
                                opt3 = rspade.getComponent("handcard");
                                opt3.deliver_card();
                            }
                            else if(choice2 == rdiamond.children.length){
                                opt4 = rdiamond.getComponent("handcard");
                                opt4.deliver_card();
                            }
                            else if(choice2 == rheart.children.length){
                                opt4 = rheart.getComponent("handcard");
                                opt4.deliver_card();
                            }
                        }
                    }
                }
            }
            this.cnt += 1;
            this.node.on("side", function(msg){
                this.side=1;
            },this)
            lbutton.getComponent(cc.Button).interactable = true;
            lclub.getComponent(cc.Button).interactable = true;
            lspade.getComponent(cc.Button).interactable = true;
            lheart.getComponent(cc.Button).interactable = true;
            ldiamond.getComponent(cc.Button).interactable = true;
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
            let result = cc.find("Canvas/?????????/??????");
            let score = cc.find("Canvas/?????????/??????");
            let board = cc.find("Canvas/?????????");
            board.active = true;
            if(score1<score2){
                result.getComponent(cc.Label).string = "Player1 win this game?????????";
                score.getComponent(cc.Label).string = "???????????????"+score1;
            }
            else if(score1>score1){
                result.getComponent(cc.Label).string = "Player2 win this game?????????";
                score.getComponent(cc.Label).string = "???????????????"+score2;
            }
            else{
                result.getComponent(cc.Label).string = "??????????????????";
                score.getComponent(cc.Label).string = "???????????????"+score1+"and"+score2;
            }
            cc.director.pause();
        },this)
    },
});
