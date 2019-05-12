var time=0;
function ChangeToThunder(){
	var aUrls = $("#fixedLayer>p>a");
	if (aUrls != null && aUrls != undefined && aUrls.length>0) {
		++time;
		if (time >=10) {
			self.clearInterval(stopTimer);
		};
		//有时页面会刷新两次
		if (aUrls[0].href.indexOf("thunder://") > -1 ) {
			return;
		}
		aUrls.removeAttr("download");
		aUrls.removeAttr("target");
		for (var i = aUrls.length - 1; i >= 0; i--) {
			var odlHref = aUrls[i].href;
			var newHref = ThunderURIEncode(odlHref);
			aUrls[i].href = newHref;

		}		
	};

};

//防止有些网站不可访问,而不断访问
var stopTimer = self.setInterval("ChangeToThunder()",500);