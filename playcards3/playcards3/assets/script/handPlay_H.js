let apiTools=require('apiTools');
let Saver=require('Saver');
let cardcount=require('cardcount');
let cardPaser=require('cardPaser');

cc.Class({
    extends: cc.Component,

    properties: {

    },

//这个js脚本要分别绑定到四种花色的节点上（绑在4个节点上，对手的不用，也不能用）
    onLoad () {
        this.node.on('touchstart',this.onTouch,this);
    },

    start () {
    },
    onTouch(){
        //这一部分也需要在pOperate部分进行同步处理
        console.log("准备出牌");

        //这部分有bug


        let length=cardcount.myH.length;
        if(length<1){
            console.log("手上没有H牌");
        }else{

            let cardNum=cardcount.myH[length-1];
            console.log("手上有H牌，牌号为"+cardNum);

            let isOver=new apiTools().playGame(Saver.mytoken,Saver.myuuid,1,cardPaser.parseToStr((cardNum+1)/13,(cardNum+1)%13));

            if(isOver.code=='200'){


                let arr=[];
                arr=cardPaser.parseToArray(isOver.data.last_code);

                let target=cc.find('Canvas/bg/Game/cardHeap/c'+cardNum);
                let action=cc.moveTo(2,0,-148.05-150);
                target.runAction(action);

                //  这里可能需要设置同步，延迟2秒等ui完成移动
                cardcount.myH.splice(length-1,1);



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
            }


        }

    }


    // update (dt) {},
});
