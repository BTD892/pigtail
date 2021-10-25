let Saver=require('Saver');
let apiTools=require('apiTools');
let Pager=require('Pager');

cc.Class({
    extends: cc.Component,

    properties: {
        showLine:{
            default:null,
            type:cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // let DataManager = cc.find("DataManager");
        // console.log(DataManager.mytoken);

        let resInfo=new apiTools().getGameList(Saver.mytoken,5,1);
        let self;
        let gamelist=[];
            gamelist=resInfo.data.games;
        Pager.sum=parseInt(resInfo.data.total);
        //let tmp=[];


        for (let i = 0; i < 5; i++) {
            // console.log(gamelist[i]);
            // console.log(gamelist[i].uuid);
            // console.log(gamelist[i].host_id);
            // console.log(gamelist[i].created_at);

            self=cc.find('Canvas/bg1/Lines/L'+(i+1));
            self.active=true;
            //tmp.push(self);

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


        }

        Pager.total=resInfo.data.total_page_num;
        // console.log("总页数为"+Pager.total+"，当前页为"+Pager.currentPage_num);

        let node=cc.find('Canvas/bg1/Lines/pageNum/text');
        node.getComponent(cc.Label).string=''+Pager.currentPage_num+'/'+Pager.total;

        //let self=cc.find('Canvas/bg1/Lines/L1');
        //self.
        // let drop=0;
        // for (let i = 0; i < 5; i++) {
        //     let newNode=cc.instantiate(this.showLine);
        //     newNode.parent=this.node;
        //     let son_1=newNode.getChildByName('hostID');
        //     son_1.getComponent('cc.Label').string='创建者为'+gamelist[i];
        //     son_1.setPosition(-260,0);//text相对于showLine坐标系的
        //     newNode.setPosition(0,150-drop*70);//showline相对于背景坐标系
        //     drop++;
        // }

        console.log("来到select场景"+Saver.mytoken);


    },

});

// {"code":200,"data":
//     {"games":[{"uuid":"66p3rwt6672ysccz","host_id":75,"client_id":115,"created_at":"2021-09-27T03:53:46.944Z"},{"uuid":"nwyds50fhvtindvg","host_id":75,"client_id":115,"created_at":"2021-09-27T06:59:54.751Z"},{"uuid":"h2k94mi2cfpj51pr","host_id":75,"client_id":115,"created_at":"2021-09-27T07:18:26.314Z"},{"uuid":"wu1yrmnbb1hsstse","host_id":75,"client_id":115,"created_at":"2021-09-27T08:41:44.306Z"},{"uuid":"5rs2ogsmjh4cf9x7","host_id":75,"client_id":115,"created_at":"2021-09-27T08:42:26.827Z"}]
//     ,"total":2768,"total_page_num":554},"msg":"操作成功"}