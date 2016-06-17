


// //物体滚动距离的函数
$(function(){
    var mList=$('.m-list ')
    var mNelist=$('.m-nelist')
    $(window).scroll(function(){
         
           scroll([mList,mNelist]);
    }) 
    setOpacity([mList,mNelist]);  
})


 
function scroll(arr)
    {
        for(var i=0;i<arr.length;i++)
        {
            var top=arr[i].offset().top-$(window).height();
            var scroll=$(document).scrollTop();
             if(scroll>top)
            { 
                arr[i].addClass('fadein');
            }
         } 
    };

 function setOpacity(arr){
        for(var i=0;i<arr.length;i++)
        {
            arr[i].css({opacity:0})
            arr[i].addClass('tranlate');
        }
};








/*    endMod拉钩
$(function (){
    var oBtn=$('.m-list li');
    var oSpan=$('.m-list  span');
    //alert(oBtn.eq(3).offset().top);
    oBtn.each(function(index){
        oBtn.eq(index).hover(function(ev){
            //移入 右 下
            var n=getN(ev);
              console.log(n);
            switch(n){
                case 0:
                    oSpan.eq(index).css({'left':'400px','top':'0'});
                    break;
                case 1:
                    oSpan.eq(index).css({'left':0,'top':'400px'});
                    break;
                case 2:
                    oSpan.eq(index).css({'left':'-400px','top':0});
                    break;
                case 3:
                    oSpan.eq(index).css({'left':0,'top':'-400px'});
                    break;
            }
            oSpan.eq(index).stop().animate({left:0, top:0});
        },function(ev){
            //移出               1.8 0.7
            var n=getN(ev);
            switch (n){
                case 0:
                    oSpan.eq(index).stop().animate({'top':0,'left':'400px'});
                    break;
                case 1:
                    oSpan.eq(index).stop().animate({'top':'400px','left':0});
                    break;
                case 2:
                    oSpan.eq(index).stop().animate({'top':0,'left':'-400px'});
                    break; 
                case 3:
                    oSpan.eq(index).stop().animate({'top':'-400px','left':0});
            }
        })
         function getN(ev)
            {
                var x=oBtn.eq(index).offset().left+oBtn.eq(index).outerWidth()/2-ev.pageX;
                var y=oBtn.eq(index).offset().top+oBtn.eq(index).outerHeight()/2-ev.pageY;
              
                var a=d2a(Math.atan2(y, x));
                return Math.round((a+180)/90)%4;
            }

    });
    
    function d2a(d)
    {
        return d*180/Math.PI;
    }

});
*/


//轮播图
$(function(){

    $('.welcomeUl li').each(function(i){
            $(this).click(function(){
                card(i)
            })
            var next=0;
            $('#last').click(function(){
                 next--;  
                if(next<0)next=3;
                 card(next);
            })
            $('#next').click(function(){
               next++;  
                if(next>=4)next=0;
                card(next)
            })
    })

    function card(i)
    {
                 $('.welcomeUl li').eq(i).addClass('on').siblings().removeClass('on')
                $('#welcome .welcome').eq(i).css({'zIndex':10,'backgroundImage':'url(img/b'+i+'.jpg)','transform':'scale(1)'}).stop().animate({'opacity':1},{duration:300}).siblings('.welcome').css({'zIndex':0,'transform':'scale(1.5)'}).stop().animate({'opacity':0},{duration:200})
    };
})

/*Canvas 时钟*/
window.onload=function(){
        //轮播图
/*    (function(){
        var oMwe=document.getElementById('welcome');
        var aBImg=oMwe.children;
        //alert(aBImg.length)
        var aLi=document.getElementById('welcomeUl').children;
        var n=0;
        for(var i=0; i<aLi.length; i++){
            (function(index){
                aLi[i].onclick=function(){
                    for(var i=0; i<aLi.length; i++){
                        aBImg[i].className='welcome';
                        aLi[i].className='';
                    }
                    aLi[index].className='on';
                    aBImg[index].className='welcome on';
                    aBImg[index].style.backgroundImage='url(css/img/b'+(index)+'.jpg)';
                };
           })(i)
        }

    })();*/
            var oC=document.getElementById('m-j-clock');

            var gd=oC.getContext('2d'); //画笔
                        //  开始位置    结束位置    半径  颜色  线宽
            function drawArc(start,end,r,color,lineWidth){
                start=start-90;
                end=end-90;
                r=r || 100;
                color=color || 'red';
                lineWidth=lineWidth || 15;  //线宽
                gd.lineJoin='round';    //连接点样式
                //gd.lineCap='round';   起始和结束样式
                gd.beginPath();
                gd.strokeStyle=color;
                gd.lineWidth=lineWidth;
                gd.arc(160,80,r,d2a(start),d2a(end),false);
                gd.stroke();
            }

            function clock(){
                gd.clearRect(0,0,oC.width,oC.height);   //清除画布
                var oDate=new Date();
                var h=oDate.getHours();
                var m=oDate.getMinutes();
                var s=oDate.getSeconds();
                var ms=oDate.getMilliseconds();

                drawArc(0,6*s+ms/1000*6,60,'red');
                drawArc(0,6*m+s/60*6,40,'green');
                drawArc(0,30*(h%12)+m/60*30,20,'blue');

                //画文字
                gd.font='20px a';
                gd.textAlign='center';
                var str=h+':'+m+':'+s;
                gd.fillText(str,55,45);
            }
            clock();
            setInterval(clock,30);
        };