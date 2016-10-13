// JavaScript Document
function getStyle(obj,name){
    return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
function move(obj,json,options){
    options = options || {};
    options.duration= options.duration || 500;
    options.easing=options.easing || 'ease-out';
    //总次数
    var count=Math.floor(options.duration/30);
    //当前走了多少次
    var n=0;
    var start={};
    var dis={};
    for(var name in json){
        start[name]=parseFloat(getStyle(obj,name));
        dis[name]=json[name]-start[name];
    }
    clearInterval(obj.timer);
    obj.timer= setInterval(function(){
        n++;
        for (var name in json){
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
            }else {
                obj.style[name]=cur+'px';

            }
            if(n==count){
                clearInterval(obj.timer);

                options.fn && options.fn();
            }
        }
    },30);
}
window.onload=function(){
	var oUl1=document.getElementById('ul1');
	var oUl2=document.getElementById('ul2');
	var aLi1=oUl1.children;
	var aLi2=oUl2.children;

	var bWidth=document.documentElement.clientWidth;
	oUl2.style.left=bWidth*0.7+'px';

	for(var i=0;i<aLi2.length;i++){
		aLi2[i].index=i;
		aLi2[i].onmouseover=function(){
			for (var i=0;i<aLi2.length;i++){
				aLi2[i].className='';
				move(aLi1[i],{opacity:0},{duration:1000});
			}
			this.className='active';
			move(aLi1[this.index],{opacity:1},{duration:1000});
		}
	}
	
	
	
	var oDiv=document.getElementById('canpin');
	var oBox=document.getElementById('tbox');
	var oImg=document.getElementById('imgs');
	var aA=oDiv.getElementsByTagName('a');
	var oUl=oBox.getElementsByTagName('ul')[0];
	var timer=null
    var W=oUl.offsetWidth;
    oUl.innerHTML=oUl.innerHTML+oUl.innerHTML;
    oUl.style.width=W*2+'px';
	var aLi=oUl.children;
	function toMove(speed){
		for(var i=0;i<aLi.length;i++){
			aLi[i].className='';

		}
		if(oUl.offsetLeft<=-oUl.offsetWidth/2){
			 oUl.style.left=0;
		}
		if(oUl.offsetLeft>0){
			 oUl.style.left=-oUl.offsetWidth/2+'px';
		 }
		 oUl.style.left=oUl.offsetLeft+speed+"px";
		 
		 var s=Math.ceil(Math.abs(oUl.offsetLeft-aLi[1].offsetWidth/2)/aLi[1].offsetWidth);
		 aLi[s].className='active'; 
		 oImg.src='img/canpin_'+s+'.png';	   
    }

	aA[0].onclick=function(){
		clearInterval(timer);
		var sum=0;
		timer=setInterval(function(){
			sum+=2;
			if(sum>=oUl.offsetWidth/6){
				clearInterval(timer);	
			}
			toMove(-2);
			
		},30);
	}
	aA[1].onclick=function(){
		clearInterval(timer);
		var sum=0;
		timer=setInterval(function(){
			sum+=2;
			if(sum>=oUl.offsetWidth/6){
				clearInterval(timer);	
			}
			toMove(2);
		},30);
	}
	
}

 