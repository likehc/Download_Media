var time=0;
var isLoad=false;
function ChangeToThunder(){
	if (isLoad) {
			return;
	}
	var aUrls = $("#fixedLayer>p>a");
	if (aUrls != null && aUrls != undefined && aUrls.length>0) {
		++time;
		if (time >=10) {
			self.clearInterval(stopTimer);
		};

		aUrls.removeAttr("target");
		
		for (var i = aUrls.length - 1; i >= 0; i--) {
			var href = aUrls[i].href;
			var suffixSplit = href.split('.');
			var suffix =".mp4";
			out:
			for (var j = suffixSplit.length - 1; j >= 0; j--) {
				if (suffixSplit[j].indexOf('?')!=-1) {
					suffix= '.'+suffixSplit[j].split('?')[0];
					break out; //跳出多次循环
				};				
			}
			var fileName = aUrls[i].download+suffix;
			fileName = CheckFileName(fileName);			
			aUrls[i].setAttribute('onclick',`DownloadFile('`+href+`','`+fileName+`')`);
			// aUrls[i].removeAttribute("download");
			// aUrls[i].removeAttribute("href");
		}
		isLoad =true;
		aUrls.removeAttr("download");
		aUrls.removeAttr("href");
	};

};

//防止有些网站不可访问,而不断访问
var stopTimer = self.setInterval("ChangeToThunder()",500);