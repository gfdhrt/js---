function ssync(){
	var obj = {};
	obj.loadScript = function async(url,callback){
		var async = document.createElement("script");
		async.type = "text/javascript";
		if(async.readyState){ //IE
			async.onreadystatechange = function(){
				if(async.readyState == "loaded" || async.readyState == "complete"){
					async.onreadystatechange = null;
					callback;
				}
			}
		}else{
			async.onload = function(){
				callback;
			}
		}
		async.src = url;
		document.getElementsByTagName("head")[0].appendChild(async);
	}
	var jslist = [          //js链接
		"js/new_file.js"
	];
	function callback(){
		jslist.length?obj.loadScript(jslist.shift(),callback())
		: (function(){time == null })();
	}
	var time = setTimeout(function(){
		obj.loadScript(jslist.shift(),callback())
	},25);
}
ssync();
