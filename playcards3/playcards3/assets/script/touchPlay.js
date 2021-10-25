let apiTools=require('apiTools');
let Saver=require('Saver');
let cardcount=require('cardcount');
let cardPaser=require('cardPaser');
let self;

cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad () {
        self=this;
        this.node.on('touchstart',this.onTouch,this);
    },

    start () {

    },

    onTouch(){
        console.log('摸牌键被按了');

        let isOver=new apiTools().playGame(Saver.mytoken,Saver.myuuid,0,'');//测试时可以让双方自动摸牌，同时快速切换界面，快速结束测试

        if(isOver.code=='200'){//成功摸牌

            let arr=[];
            arr=cardPaser.parseToArray(isOver.data.last_code);

            let cardNum=arr[0]*13+arr[1];
            let target=cc.find('Canvas/bg/Game/cardHeap/c'+(arr[0]*13+arr[1]));
            let action;

            action=cc.moveTo(2,0,0);//移至判定区

            target.runAction(action);

            self.scheduleOnce(function () {//这里可能有问题

            },2);

            let judgeSum=cardcount.judge.length;
            if(judgeSum==0){
                cardcount.judge.push(cardNum);
            }else{
                let top=cardcount.judge[judgeSum-1];
                let topCard=cc.find('Canvas/bg/Game/cardHeap/c'+top);
                topCard.active=false;
                console.log("当前牌型为"+arr[0]+"顶部牌型为"+Math.floor(top/13));
                cardcount.judge.push(cardNum);
                if(Math.floor(top/13)==arr[0]){
                    judgeSum=cardcount.judge.length;


                    while(judgeSum>0){
                        console.log("准备吃牌");
                        let tmp=cc.find('Canvas/bg/Game/cardHeap/c'+cardcount.judge[judgeSum-1]);
                        tmp.active=true;
                        //action=cc.moveTo(2,-390,215-75-45-100);
                        //console.log(Math.floor(cardcount.judge[judgeSum-1])/13);
                        if(Math.floor(cardcount.judge[judgeSum-1]/13)==0){
                            //console.log("吃掉的当前牌型为"+Math.floor(cardcount.judge[judgeSum-1])/13);
                            cardcount.myC.push(cardcount.judge[judgeSum-1]);
                            let act1=cc.moveTo(2,-390,215);
                            tmp.runAction(act1);
                        }else if(Math.floor(cardcount.judge[judgeSum-1]/13)==1){
                            //.log("吃掉的当前牌型为"+Math.floor(cardcount.judge[judgeSum-1])/13);
                            cardcount.myD.push(cardcount.judge[judgeSum-1]);
                            let act2=cc.moveTo(2,-390,65);
                            tmp.runAction(act2);
                        }else if(Math.floor(cardcount.judge[judgeSum-1]/13)==2){
                            //console.log("吃掉的当前牌型为"+Math.floor(cardcount.judge[judgeSum-1])/13);
                            cardcount.myH.push(cardcount.judge[judgeSum-1]);
                            let act3=cc.moveTo(2,-390,-85);
                            tmp.runAction(act3);
                        }else if(Math.floor(cardcount.judge[judgeSum-1]/13)==3){
                            //console.log("吃掉的当前牌型为"+Math.floor(cardcount.judge[judgeSum-1])/13);
                            cardcount.myS.push(cardcount.judge[judgeSum-1]);
                            let act4=cc.moveTo(2,-390,-235);
                            tmp.runAction(act4);
                        }
                        cardcount.judge.splice(judgeSum-1,1);
                        this.schedule(function () {//可能有问题

                        },2)
                        judgeSum--;
                        //这里可能也要设置同步
                    }


                }


            }

            cardcount.mycount+=1;
            console.log('成功摸牌,摸牌数为'+cardcount.mycount);
            Saver.admitAction=true;

            console.log("本人持有的卡牌");
            console.log("C有"+cardcount.myC.length+"张,");
            console.log("D有"+cardcount.myD.length+"张,");
            console.log("H有"+cardcount.myH.length+"张,");
            console.log("S有"+cardcount.myS.length+"张");



        }
    }

    // update (dt) {},
});
