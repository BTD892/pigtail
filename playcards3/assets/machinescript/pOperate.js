let apiTools=require('apiTools');
let Saver=require('Saver');
let cardcount=require('cardcount');
let cardPaser=require('cardPaser');
let flag=1;
let self;

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.schedule(function(){
        //     cc.log(" component 定时器 ")
        //     //0代表执行1次，
        //     //cc.macro.REPEAT_FOREVER
        // },1,cc.macro.REPEAT_FOREVER,0);//一秒检测一次
        //if(Saver.isOver==false)
        self=this;
        this.schedule(this.checkMyTurn,1,cc.macro.REPEAT_FOREVER,0);//一秒检测一次

    },

    start () {
        new apiTools().getLastStep(Saver.mytoken,Saver.myuuid);

    },

    update (dt) {
        // setTimeout(function () {
        //     new apiTools().getLastStep(Saver.mytoken,Saver.myuuid);
        // },3000);



    },


    checkMyTurn(){
        // self.scheduleOnce(function () {
        //     console.log("等待结束"+new Date());
        // },20);
        let res=new apiTools().getLastStep(Saver.mytoken,Saver.myuuid);
        //console.log(res);

        let btn_1=cc.find('Canvas/bg/Game/touchCard');


        if((res.code=='200')&& (res.data.your_turn==true)){//轮到你的回合
            //Saver.admitAction=false;
            if(res.data.last_code!==''&&Saver.admitAction==true){//这边有个有关同步的重大bug，已经解决了，通过调整Saver.adminAction的值
                Saver.admitAction=false;
                let arr=[];
                arr=cardPaser.parseToArray(res.data.last_code);

                let cardNum=arr[0]*13+arr[1];
                let target=cc.find('Canvas/bg/Game/cardHeap/c'+(arr[0]*13+arr[1]));
                let action;

                action=cc.moveTo(2,0,0);


                target.runAction(action);
                // setTimeout(function () {
                //      //target.stopAction(action_1);
                // },6);

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
                            if(Math.floor(cardcount.judge[judgeSum-1]/13)==0){
                                //console.log("吃掉的当前牌型为"+Math.floor(cardcount.judge[judgeSum-1])/13);
                                cardcount.myC.push(cardcount.judge[judgeSum-1]);
                                let act1=cc.moveTo(2,390,215);
                                tmp.runAction(act1);
                            }else if(Math.floor(cardcount.judge[judgeSum-1]/13)==1){
                                //.log("吃掉的当前牌型为"+Math.floor(cardcount.judge[judgeSum-1])/13);
                                cardcount.myD.push(cardcount.judge[judgeSum-1]);
                                let act2=cc.moveTo(2,390,65);
                                tmp.runAction(act2);
                            }else if(Math.floor(cardcount.judge[judgeSum-1]/13)==2){
                                //console.log("吃掉的当前牌型为"+Math.floor(cardcount.judge[judgeSum-1])/13);
                                cardcount.myH.push(cardcount.judge[judgeSum-1]);
                                let act3=cc.moveTo(2,390,-85);
                                tmp.runAction(act3);
                            }else if(Math.floor(cardcount.judge[judgeSum-1]/13)==3){
                                //console.log("吃掉的当前牌型为"+Math.floor(cardcount.judge[judgeSum-1])/13);
                                cardcount.myS.push(cardcount.judge[judgeSum-1]);
                                let act4=cc.moveTo(2,390,-235);
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



            //Saver.isMyturn=true;
            flag=1;

            btn_1.active=true;

            //下面这段可以不注释
            let node_1=cc.find('Canvas/bg/Game/Tip_1');
            let node_2=cc.find('Canvas/bg/Game/Tip_2');
            node_1.active=false;
            node_2.active=true;


        }
        else if(res.code=='400'&&(res.data.err_msg=='对局已结束')){
            console.log('突然400了');
            Saver.isOver=true;

            let node=cc.find('Canvas/bg/Game/Tip_3');
            node.active=true;
            let node_1=cc.find('Canvas/bg/Game/Tip_1');
            let node_2=cc.find('Canvas/bg/Game/Tip_2');
            node_1.active=false;
            node_2.active=false;

            new apiTools().getGameInfo(Saver.mytoken,Saver.myuuid);
            this.unschedule(this.checkMyTurn);
        }//else if(res.code=='200'&&(res.data.last_code=='')){
            //
        // }
        else{//轮到对手的回合
            //这里要做的就是调用查看上一步操作的接口，返回对手的操作，解析并显示一次
            //可以设置一个标记，让动画只进行一次，如flag=1时执行，执行一次后减1，在“我"下完后，flag加1

            //Saver.isMyturn=false;
            btn_1.active=false;

            let node_1=cc.find('Canvas/bg/Game/Tip_1');
            let node_2=cc.find('Canvas/bg/Game/Tip_2');
            node_1.active=true;
            node_2.active=false;
            if(flag==1){
                // setTimeout(function () {
                //
                // },4000);
                flag=0;

            }



        }
    }
});