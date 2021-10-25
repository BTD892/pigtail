class apiTools{
        //str:'';
        // constructor() {
        //     this.token='';
        // }
        login(usr,pwd)//登录，返回用户token
        {
            let xhr;
            // let self=this;
            let mytoken='';

            xhr=new XMLHttpRequest();

            // if (window.XMLHttpRequest) { // Mozilla, Safari...
            //     xhr = new XMLHttpRequest();
            // } else if (window.ActiveXObject) { // IE
            //     try {
            //         xhr = new ActiveXObject('Msxml2.XMLHTTP');
            //     } catch (e) {
            //         try {
            //             xhr = new ActiveXObject('Microsoft.XMLHTTP');
            //         } catch (e) {}
            //     }
            // }
            if (xhr) {
                xhr.onreadystatechange = function onReadyStateChange() {
                    // 该函数会被调用四次
                    //console.log(xhr.readyState);
                    if (xhr.readyState === 4) {
                        // everything is good, the response is received
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);

                            let parseStr = JSON.parse(xhr.responseText);//将json转为对象
                            console.log(parseStr.data.token);//直接通过对象名.属性的方式获取token值
                            // self.token=parse.data.token;
                            mytoken=parseStr.data.token;
                            cc.log('hhhhhhhhh'+mytoken);
                            //str=parse.data.token;

                            // let myAccount= require("myAccount");
                            // myAccount.token=parse.data.token;


                        } else {
                            console.log('There was a problem with the request.');
                        }
                    } else {
                        // still not ready
                        //console.log('still not ready...');
                    }
                };
                xhr.open('POST', 'http://172.17.173.97:8080/api/user/login', false);//这个记得设置成同步false，不然没法给局部变量赋值
                // 设置 Content-Type 为 application/x-www-form-urlencoded
                // 以表单的形式传递数据
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send('student_id='+usr+'&password='+pwd);//在开启校园网vpn或连接校园网的情况下才能成功调用

            }

            //console.log("我在末尾"+this.token);
            console.log("api中取得的用户token为"+mytoken);
            return mytoken;
        }

        createGame(mytoken,isPrivate){//创建对局
            let xhr;
            let myuuid='';
            //console.log("使用的token为"+mytoken);
            if (window.XMLHttpRequest) { // Mozilla, Safari...
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                    try {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (e) {}
                }
            }
            if (xhr) {
                xhr.onreadystatechange = function onReadyStateChange() {
                    // 该函数会被调用四次
                    //console.log(xhr.readyState);
                    if (xhr.readyState === 4) {
                        // everything is good, the response is received
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            let parseStr = JSON.parse(xhr.responseText);//将json转为对象
                            console.log(parseStr.data.uuid);//直接通过对象名.属性的方式获取token值
                            myuuid=parseStr.data.uuid;
                            if(parseStr.code=='200') console.log("创建对局成功");


                        } else {
                            console.log('There was a problem with the request.');
                        }
                    } else {
                        // still not ready
                        //console.log('still not ready...');
                    }
                };
                xhr.open('POST', 'http://172.17.173.97:9000/api/game', false);//这个记得设置成同步false，不然没法给局部变量赋值
                // 设置 Content-Type 为 application/x-www-form-urlencoded
                // 以表单的形式传递数据
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Authorization',mytoken);
                xhr.send('private='+isPrivate);//在开启校园网vpn或连接校园网的情况下才能成功调用

            }
            console.log("myuuid为"+myuuid);
            return myuuid;

        }

        joinGame(mytoken,myuuid){//加入对局
            let xhr;
            //console.log("使用的token为"+mytoken);
            if (window.XMLHttpRequest) { // Mozilla, Safari...
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                    try {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (e) {}
                }
            }
            if (xhr) {
                xhr.onreadystatechange = function onReadyStateChange() {
                    // 该函数会被调用四次
                    //console.log(xhr.readyState);
                    if (xhr.readyState === 4) {
                        // everything is good, the response is received
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            let parseStr = JSON.parse(xhr.responseText);//将json转为对象
                            if(parseStr.code=='200') console.log("加入对局成功");
                            // console.log(parseStr.);//直接通过对象名.属性的方式获取token值



                        } else {
                            console.log('There was a problem with the request.');
                        }
                    } else {
                        // still not ready
                        //console.log('still not ready...');
                    }
                };
                xhr.open('POST', 'http://172.17.173.97:9000/api/game/'+myuuid, false);//这个记得设置成同步false，不然没法给局部变量赋值
                // 设置 Content-Type 为 application/x-www-form-urlencoded
                // 以表单的形式传递数据
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Authorization',mytoken);
                xhr.send();//在开启校园网vpn或连接校园网的情况下才能成功调用

            }

        }
        playGame(mytoken,myuuid,mytype,myCard){//执行玩家操作
            console.log("参数为mytype"+mytype+" myCard="+myCard);
            let xhr;
            let myOperate='';
            if (window.XMLHttpRequest) { // Mozilla, Safari...
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                    try {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (e) {}
                }
            }
            if (xhr) {
                xhr.onreadystatechange = function onReadyStateChange() {
                    // 该函数会被调用四次
                    //console.log(xhr.readyState);
                    if (xhr.readyState === 4) {
                        // everything is good, the response is received
                        if (xhr.status === 200) {
                            console.log('执行玩家操作'+xhr.responseText);
                            let parseStr = JSON.parse(xhr.responseText);//将json转为对象
                            myOperate=parseStr;


                        } else {
                            console.log('There was a problem with the request.');
                        }
                    } else {
                        // still not ready
                        //console.log('still not ready...');
                    }
                };
                xhr.open('PUT', 'http://172.17.173.97:9000/api/game/'+myuuid+'?type='+mytype+'&card='+myCard, false);//这个记得设置成同步false，不然没法给局部变量赋值
                // 设置 Content-Type 为 application/x-www-form-urlencoded
                // 以表单的形式传递数据
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Authorization',mytoken);
                // if(mytype==0)
                //     xhr.send('type='+mytype);
                // else
                    xhr.send();//在开启校园网vpn或连接校园网的情况下才能成功调用

            }
            return myOperate;
        }
        //需要返回值
        getLastStep(mytoken,myuuid){//获取上步操作
            let xhr;
            let lastStep='';
            if (window.XMLHttpRequest) { // Mozilla, Safari...
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                    try {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (e) {}
                }
            }
            if (xhr) {
                xhr.onreadystatechange = function onReadyStateChange() {
                    // 该函数会被调用四次
                    //console.log(xhr.readyState);
                    if (xhr.readyState === 4) {
                        // everything is good, the response is received
                        if (xhr.status === 200) {
                            //console.log('获取上步操作'+xhr.responseText);
                            let parseStr = JSON.parse(xhr.responseText);//将json转为对象
                            lastStep=parseStr;


                        } else {
                            console.log('There was a problem with the request.');
                        }
                    } else {
                        // still not ready
                       // console.log('still not ready...');
                    }
                };
                xhr.open('GET', 'http://172.17.173.97:9000/api/game/'+myuuid+'/last', false);//这个记得设置成同步false，不然没法给局部变量赋值
                // 设置 Content-Type 为 application/x-www-form-urlencoded
                // 以表单的形式传递数据
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Authorization',mytoken);
                xhr.send();//在开启校园网vpn或连接校园网的情况下才能成功调用

            }
            return lastStep;
        }

        //需要返回值
        getGameInfo(mytoken,myuuid){//获取对局信息
            let xhr;
            if (window.XMLHttpRequest) { // Mozilla, Safari...
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                    try {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (e) {}
                }
            }
            if (xhr) {
                xhr.onreadystatechange = function onReadyStateChange() {
                    // 该函数会被调用四次
                    //console.log(xhr.readyState);
                    if (xhr.readyState === 4) {
                        // everything is good, the response is received
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            let parseStr = JSON.parse(xhr.responseText);//将json转为对象


                        } else {
                            console.log('There was a problem with the request.');
                        }
                    } else {
                        // still not ready
                        //console.log('still not ready...');
                    }
                };
                xhr.open('GET', 'http://172.17.173.97:9000/api/game/'+myuuid, false);//这个记得设置成同步false，不然没法给局部变量赋值
                // 设置 Content-Type 为 application/x-www-form-urlencoded
                // 以表单的形式传递数据
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Authorization',mytoken);
                xhr.send();//在开启校园网vpn或连接校园网的情况下才能成功调用

            }
        }
        getGameList(mytoken,page_size,page_num){//获取对局列表
            let xhr;
            let gamelist=[];
            let res=null;

            if (window.XMLHttpRequest) { // Mozilla, Safari...
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                    try {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (e) {}
                }
            }
            if (xhr) {
                xhr.onreadystatechange = function onReadyStateChange() {
                    // 该函数会被调用四次
                    //console.log(xhr.readyState);
                    if (xhr.readyState === 4) {
                        // everything is good, the response is received
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            let parseStr = JSON.parse(xhr.responseText);//将json转为对象
                            res=parseStr;

                            //直接当数组用
                            console.log(parseStr.data.games);
                            console.log(parseStr.data.games[0]);
                            console.log(parseStr.data.games[1]);
                            console.log(parseStr.data.games[2]);
                            gamelist=parseStr.data.games;


                        } else {
                            console.log('There was a problem with the request.');
                        }
                    } else {
                        // still not ready
                        //console.log('still not ready...');
                    }
                };
                //GET请求无请求体，参数直接加在接口url路径上
                xhr.open('GET', 'http://172.17.173.97:9000/api/game/index?page_size='+page_size+'&page_num='+page_num, false);//这个记得设置成同步false，不然没法给局部变量赋值
                // 设置 Content-Type 为 application/x-www-form-urlencoded
                // 以表单的形式传递数据
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Authorization',mytoken);
                xhr.send();//在开启校园网vpn或连接校园网的情况下才能成功调用

            }
            //return gamelist;
            return res;

        }


}
module.exports=apiTools;