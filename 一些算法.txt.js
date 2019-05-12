// 用递归删除相应的父级目录
function delAdvertisement(adv){
	let className = adv.parentElement.getAttribute("class") !=null ? adv.parentElement.getAttribute("class"):adv.parentElement.getAttribute("id");
	let matchLength = className.match(/[0-9a-z]/).input;
	if (className != null && className.length==8 && className ==matchLength) {
		delAdvertisement(adv.parentElement);
	}else{
		adv.remove();
	}

};
// 调用delAdvertisement
var divs = $("div");
for (var i = divs.length - 1; i >= 0; i--) {
	if (divs[i].innerText == "Advertisement") {
		delAdvertisement(divs[i]); //递归删除广告父元素
	};
}


//------循环读取 前台 变量------
// 获取页面变量,但页面无此变量则报错
window.onload = function(){
	var scriptNums = document.createElement('script');
	scriptNums.type = 'text/javascript';
	scriptNums.innerHTML = "document.body.setAttribute('mediaData-fpm',encodings.length);";
	document.head.appendChild(scriptNums);
	document.head.removeChild(scriptNums);
	var mediaNums = document.body.getAttribute('mediaData-fpm');
	InsertmediaData(mediaNums);	//mediaNums应是一个数字,即可下载视频的数量
}

function InsertmediaData(mediaNums){
	for (var j=0;j<mediaNums;j++)
	{
		var script = document.createElement('script');
		script.type = 'text/javascript';
		 //encodings 为前台数据,内部包含视频下载链接[清晰度,文件地址]
		script.innerHTML = "document.body.setAttribute('mediaData-fpm',[encodings["+j+"].name,encodings["+j+"].filename]);"; 
		document.head.appendChild(script);
		document.head.removeChild(script);
		var mediaUrl = document.body.getAttribute('mediaData-fpm');
		if (mediaUrl != null) {
			GetBodyUrls(mediaUrl);
  		}
	}

	if (aBody!= "") {
		var div = document.createElement("div");
		div.id = "fixedLayer";
		div.innerHTML = aBody;
		document.body.appendChild(div);
	}
};

function GetBodyUrls(_mediaUrl){
	var f = _mediaUrl.split(',');
	//f[1] = location.protocol+f[1];	//此处如果是内部域,则加上
	var mediaInfo={name:f[0],filename:f[1]};
	aBody +=  '<p><a id="mediadownload'+mediaInfo.name +'" href="'+mediaInfo.filename+'" download="'+fileName+'" target="_blank">Download '+ mediaInfo.name+'</a></p>';
};
//