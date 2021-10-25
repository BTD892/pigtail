module.exports = {
    parseToArray(str){
        let res=[];
        if(str[4]=='C'){//牌型为梅花
            res.push(0);
        } else if(str[4]=='D'){//牌型为方块
            res.push(1);
        } else if(str[4]=='H'){//牌型为红桃
            res.push(2);
        }else if(str[4]=='S'){//牌型为黑桃
            res.push(3);
        }

        if(str.length==7){//数字为10
            res.push(9);
        }else{
            if(str[5]=='J'){
                res.push(10);
            } else if(str[5]=='Q'){
                res.push(11);
            }else if(str[5]=='K'){
                res.push(12);
            }else{
                res.push(parseInt(str[5])-1);
            }

        }

        if(str[2]=='1'){
            res[2]=1;
        }else res[2]=0;
        console.log(str+"\n转换出"+res);
        return res;
    },
    parseToStr(color,num){//color=最顶上牌号/13,num=最顶上牌号%13
        let str='';
        console.log("color="+color+' num='+num);
        if(num==0) color--;
        color=Math.floor(color);
        if(0==color){
            str+='C';
        }else if(1==color){
            str+='D';
        }else  if(2==color){
            str+='H';
        }else if(3==color){
            str+='S';
        }
        if(num==0) {
            str+='K';
        }
        else if(0<num&&num<=10){
            str+=num;
        } else if(num==11){
            str+='J';
        }else if(12==num){
            str+='Q';
        }

        console.log(str);
        return str;
    }


};