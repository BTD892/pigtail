let apiTools=require('apiTools');
let Pager=require('Pager');
let Saver=require('Saver');

cc.Class({
    extends: cc.Component,

    properties: {
        target:{
            default:null,
            type:cc.EditBox
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    onLoad(){
        this.node.on('touchstart',this.onTouch,this);
    },
    onTouch(){
        let num=parseInt(this.target.string);

        if(num<1) {
            num=1;
            console.log("目标页数输入错误，太小了");
        }
        else if(num>(Pager.total)){//这个地方改得比较粗暴，可能会有问题
            num=Pager.total;
            console.log("目标页数输入错误，太大了");
        }

        let resInfo=new apiTools().getGameList(Saver.mytoken,5,num);

        let gamelist=[];
        gamelist=resInfo.data.games;

        Pager.sum=parseInt(resInfo.data.total);

        Pager.total=resInfo.data.total_page_num;
        Pager.currentPage_num=num;




        for (let i = 0; i < 5; i++) {
            // console.log(gamelist[i]);
            // console.log(gamelist[i].uuid);
            // console.log(gamelist[i].host_id);
            // console.log(gamelist[i].created_at);

            let self=cc.find('Canvas/bg1/Lines/L'+(i+1));
            self.active=false;
            if((num-1)*Pager.Page_size+i+1>Pager.sum){
                continue;
            }
            let son;
            son=self.getChildByName('hostID');
            son.getComponent(cc.Label).string='创建者id为：'+gamelist[i].host_id;
            son.setPosition(-270,0);

            son=self.getChildByName('isFull');
            if(gamelist[i].client_id=='0')
                son.getComponent(cc.Label).string='当前房间空闲';
            else
                son.getComponent(cc.Label).string='对战正在进行中';

            son=self.getChildByName('myUuid');
            son.getComponent(cc.Label).string=gamelist[i].uuid;

            self.active=true;

        }



        console.log("总页数为"+Pager.total+"，当前页为"+Pager.currentPage_num);

        let node=cc.find('Canvas/bg1/Lines/pageNum/text');
        node.getComponent(cc.Label).string=''+Pager.currentPage_num+'/'+Pager.total;



    }


    // update (dt) {},
});
