window.onload = function() {
	var ls = document.getElementById('ls');
	var img = document.getElementById('img');
	var aaa = document.getElementById('aaa').getElementsByTagName('span');
	var lf = document.getElementById('lf');
	var rg = document.getElementById('rg');
	var index = 1;
	var animated = false;
	var timer;
	/*点随图切换*/
	function showaaa() {
		for(var i = 0; i < aaa.length; i++) {
			if(aaa[i].className == 'hover') {
				aaa[i].className = '';
				break;
			}
		}
		aaa[index - 1].className = 'hover';
	}
	/*图片随箭头切换*/
	function click(offset) {
		animated = true;
		var newleft = parseInt(img.style.left) + offset;
		/*动画效果*/
		var time = 300; //位移总的时间
		var interval = 10; //位移间隔时间
		var speed = offset / (time / interval); //每次的位移量

		function go() {
			if(speed < 0 && parseInt(img.style.left) > newleft || (speed > 0 && parseInt(img.style.left) < newleft)) {
				img.style.left = parseInt(img.style.left) + speed + 'px';
				setTimeout(go, interval);
			} else {
				animated = false;
				img.style.left = newleft + 'px';
				if(newleft > -1050) {
					img.style.left = -3150 + 'px';
				}
				if(newleft < -3150) {
					img.style.left = -1050 + 'px';
				}
			}
		}
		go();
	}
	/*自动切换*/
	function play(){
		timer = setInterval(function(){
			rg.onclick();
		},3000);
	}
	/*鼠标移上终止自动切换*/
	function stop(){
		clearInterval(timer);
	}


	rg.onclick = function() {
		if(!animated) {
		if(index == 3) {
			index = 1;
		} else {
			index += 1;
		}
		showaaa();
		
			click(-1050);
		}
	}
	lf.onclick = function() {
		if(!animated) {
			if(index == 1) {
				index = 3;
			} else {
				index -= 1;
			}
			showaaa();
			click(1050);
			}
		}
		/*点击点切换图片*/
	for(var i = 0; i < aaa.length; i++) {
		aaa[i].onclick = function() {
			if(this.className == 'hover') {
				return;
			}
			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -1050 * (myIndex - index);
			index = myIndex;
			click(offset);
			showaaa();
			if(!animated){
				click(offset);
			}
		}

	}
	ls.onmouseover = stop;
	ls.onmouseout = play;
	
	
	play();

}