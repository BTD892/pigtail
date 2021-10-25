let Saver=require('Saver');
let cardPaser=require('cardPaser');

cc.Class({
    extends: cc.Component,

    properties: {
        username: {
            default: null,
            type: cc.EditBox
        },
        password:{
            default: null,
            type: cc.EditBox
        },
        DataManager:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let myAccount = require("myAccount");
        console.log(myAccount.password);

        //预加载下一个场景
        cc.director.preloadScene("select", function () {
            cc.log("Next scene preloaded");
        });
    },
    btnClick(event,CustomEventData){
        let target = event.target;
        // cc.log("按钮点击事件",CustomEventData);
        // console.log("输入的用户名为"+this.username.string);
        // console.log("输入的密码为"+this.password.string);

        let apiTools =require("apiTools");
        let str=new apiTools().login(this.username.string,this.password.string)
        if(typeof(str)=="undefined" ){
            console.log("账号或密码输入错误，请重新输入！")
        }
        else{
            let myAccount=require('myAccount');
            myAccount.token=str;
            //console.log("此时当前用户的token为"+myAccount.token);

            // this.DataManager.mytoken=str;//存在DataManager里，在其他场景里也能用
            // cc.game.addPersistRootNode(this.DataManager);

            Saver.mytoken=str;
            // let tmp=new apiTools().createGame(str,false);
            // console.log('tmp='+tmp);
            // cc.log('tmp'+tmp);
            // new apiTools().joinGame(str,new apiTools().createGame(str,false));
            // new apiTools().getLastStep(str,new apiTools().createGame(str,false));
            // new apiTools().getGameInfo(str,new apiTools().createGame(str,true));
            // console.log(new apiTools().getGameList(str,3,1));
            // console.log("**************************本次接口测试结束*************************8");
            // //new apiTools().playGame(str,new apiTools().createGame(str));
            // //console.log(require('myAccount').token);
            // //console.log("111我的token是"+str);
            // console.log(this.DataManager.mytoken);
            // console.log(Saver.mytoken);

            new cardPaser.parseToArray('1 0 D10');
            new cardPaser.parseToArray('1 0 C1');
            new cardPaser.parseToArray('1 0 SJ');
            new cardPaser.parseToArray('1 1 H2');

            new cardPaser.parseToStr((1+1)/13,(1+1)%13);
            new cardPaser.parseToStr((2+1)/13,(2+1)%13);
            new cardPaser.parseToStr((3+1)/13,(3+1)%13);
            new cardPaser.parseToStr((4+1)/13,(4+1)%13);
            new cardPaser.parseToStr((5+1)/13,(5+1)%13);
            new cardPaser.parseToStr((6+1)/13,(6+1)%13);
            new cardPaser.parseToStr((7+1)/13,(7+1)%13);
            new cardPaser.parseToStr((8+1)/13,(8+1)%13);
            new cardPaser.parseToStr((9+1)/13,(9+1)%13);
            new cardPaser.parseToStr((10+1)/13,(10+1)%13);
            new cardPaser.parseToStr((11+1)/13,(11+1)%13);
            new cardPaser.parseToStr((12+1)/13,(12+1)%13);
            new cardPaser.parseToStr((13+1)/13,(13+1)%13);
            new cardPaser.parseToStr((14+1)/13,(14+1)%13);
            new cardPaser.parseToStr((15+1)/13,(15+1)%13);
            new cardPaser.parseToStr((16+1)/13,(16+1)%13);
            new cardPaser.parseToStr((17+1)/13,(17+1)%13);
            new cardPaser.parseToStr((18+1)/13,(18+1)%13);


            new cardPaser.parseToStr(24/13,24%13);
            new cardPaser.parseToStr(35/13,35%13);
            new cardPaser.parseToStr(41/13,41%13);

            cc.director.loadScene("select");
        }


    }
    // update (dt) {},
});
