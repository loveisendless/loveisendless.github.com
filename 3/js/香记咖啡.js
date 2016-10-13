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

}
