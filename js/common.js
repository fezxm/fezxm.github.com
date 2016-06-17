//封装的函数




/**
 * 获取对象样式
 * @param obj   object   要获取样式的对象
 * @param sName  string  要获取对象的样式 'width'
 *
 * @return 要获取对象的样式的结果；
*/
function getStyle(obj,sName){
	return (obj.currentStyle || getComputedStyle(obj,false))[sName];
}


/**
 * 批量设置对象样式
 * @param obj   object   被设置样式的对象
 * @param json  json     样式 {'width':'200px'}
 */
function setStyle(obj, json)
{
	for (var name in json)
	{
		obj.style[name]=json[name];
	}
}

/**
 * 通过class名字获取元素
 * @param oParent   object   指定父级
 * @param sClass    string   class名字
 *
 * @return aRes     array    获取到的一组对象
 */
function getByClass(oParent, sClass)
{
	var aChild=oParent.getElementsByTagName('*');
	var aRes=[];
	
	for (var i=0; i<aChild.length; i++)
	{
		var obj=aChild[i];
		var aTmp=obj.className.split(' ');
		
		if (findInArr(aTmp, sClass))
		{
			aRes.push(obj);
		}
	}
	
	return aRes;
}

/**
 * 通过class名字获取元素
 * @param arr   object   要查找的数组
 * @param target    object   数组里有没有这个元素
 *
 * @return true     找到了    继续找
 * @return fales	循环完了看看找到了没有
 */

function findInArr(arr, target)
{
	for (var i=0; i<arr.length; i++)
	{
		if (arr[i] == target)
		{
			return true;
		}
	}
	
	return false;
}

/**
 * 随机数
 * @param n   number   	从多少开始
 * @param m    number   到多少结束，不包括结束的数字
 *
 * @return   从*到*的随机数
*/
function rnd(n, m)
{
	return Math.floor(Math.random()*(m-n)+n);
}


/**
 * 补零
 * @param n   number   	-1>n<10的数
 *
 * @return   如果小于10 就变成0* 如果大于10就变成'*' 统一数据类型
*/
function toDub(n)
{
	return n<10 ? '0'+n : ''+n;
}


/**
 * 排序
 * @param a   number   	数组的第一个
 * @param b   number   	数组的第二个
 *
 * @return   如果结果大于0；就是从小到大； 如果小于0；就是从大到小；等于0则不变；
*/
function sort(arr){
	arr.sort(function (a,b){
	return a-b;
	//		b-a
	})
}


/**
 * 弧度转角度
 * @param n   number   	已知的弧度
 *
 * @return  n  number		角度
*/
function a2d(n){
	return n*180/Math.PI;
}


/**
 * 角度转弧度
 * @param n   number   	已知的角度
 *
 * @return  n  number		弧度
*/
function d2a(d){
    	return d*Math.PI/180;
}

/**
 * ajax
 * @param obj   object   
 * @param sName  string  
 *
 * @return 
*/
function ajax(options){
	//默认值
	var options=options || {};
	var url=options.url;
	if( ! url){
		return;
	}
	var type=options.type || 'get';
	var data=options.data || {};
	var timeout=options.timeout || 5000;
	//创建ajax对象
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	//发送
	switch(type.toUpperCase()){
		case 'GET':
		oAjax.open('get',url+'?'+json2url(data),true);
		oAjax.send();
		break;

		case 'POST':
		oAjax.open('post',url,true);
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		oAjax.send(json2url(data));
		break;
	}

	// 接受
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState == 4){
			clearTimeout(timer);
			if(oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304){
				options.success && options.success(oAjax.responseText);
			}else{
				options.fail && options.fail(oAjax.status);
			}
		}
	};
	var timer=setTimeout(function(){
		options.fail('连接超时');
		oAjax.onreadystatechange=null;
	},timeout);

	function json2url(data){
		var arr=[];
		data['n']=Math.random();
		for(var name in data){
			arr.push(name+'='+data[name]);
		}
		return arr.join('&');
	}
}

/**
 * 弹性运动
 * @param n   number   	
 *
 * @return  n  number		
*/
(function(global){
    var left=0;
    var iSpeed=0;
    var timer=null;
    global.doMove=function(obj,iTarget){
        clearInterval(timer);
        timer=setInterval(function(){
            iSpeed+=(iTarget-left)/5;
            iSpeed*=0.7;

            left+=iSpeed;
            obj.style.left=Math.round(left)+'px';

            if(Math.round(iSpeed)==0 && Math.round(left)==iTarget){
                clearInterval(timer);
            }
        },30);
    }
})(window);

/**
 * 普通运动
 * @param n   number   	
 *
 * @return  n  number		
*/
function getStyle(obj,name){
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}

function move(obj,json,options){
    options=options || {};
    options.duration= options.duration || 500;
    options.easing = options.easing || 'ease-out';

    var count=Math.floor(options.duration/20);

    var start={};
    var dis={};
    for(var name in json){
        start[name]=parseFloat(getStyle(obj,name));

        if(isNaN(start[name])){
            switch (name){
                case 'left':
                    start[name]=obj.offsetLeft;
                    break;
                case 'top':
                    start[name]=obj.offsetTop;
                    break;
                case 'width':
                    start[name]=obj.offsetWidth;
                    break;
                case 'height':
                    start[name]=obj.offsetHeight;
                    break;
                case 'opacity':
                    start[name]=1;
                    break;
                case 'marginLeft':
                    start[name]=obj.offsetLeft;
                    break;
                //marginTop,borderWidth,paddingLeft,fontSize.....
            }
        }

        dis[name]=json[name]-start[name];
    }

    var n=0;
    clearInterval(obj.timer);

    obj.timer=setInterval(function(){
        n++;

        for(var name in json){
            switch (options.easing){
                case 'linear':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a;
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a*a*a;
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[name]+dis[name]*(1-a*a*a);
                    break;
            }

            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name]=cur+'px';
            }
        }

        if(n==count){
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    },20);
}


/**
 * 获取到页面距离
 * @param n   number   	
 *
 * @return  n  number		
*/
function getPos(obj)
	{
		var left=0;
		var top=0;
		
		while (obj)
		{
			left+=obj.offsetLeft;
			top+=obj.offsetTop;
			
			obj=obj.offsetParent;
		}
		
		return {left:left, top:top};
	}


/**
 * jsonp
 * @param obj   object   
 * @param sName  string  
 *
 * @return 
*/
(function(){
    function jsonp(options)
    {
        options=options || {};
        var url=options.url;
        if(!url)
        {
            return;
        }

        var data=options.data || {};

        var cbName=options.cbName || 'cb';

        var fnName='jsonp_'+Math.random();
        fnName=fnName.replace('.','');

        window[fnName]=function(json)
        {
            options.success && options.success(json);
            oHead.removeChild(oSc);
           window[fnName]=null;
        }

        var oSc=document.createElement('script');
        data[cbName]=fnName;
        oSc.src=url+'?'+json2arr(data);
        var oHead=document.getElementsByTagName('head')[0];
        oHead.appendChild(oSc);

    }
    function json2arr(json)
    {
        var arr=[];
        for(var name in json)
        {
            arr.push(name+'='+json[name])
        }
       return  arr.join('&');
    }

})();










