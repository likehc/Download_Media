var hostname = location.hostname;  //tab当前URL
var port = location.port;
var protocol = location.protocol;

var firstUrl="";
function sendMessage(obj,callBackfunc){
	chrome.runtime.sendMessage(obj);

};
//Invalid URL
sendMessage({dataType:'InsertJS',protocol:protocol,hostname:hostname,port:port});


window.addEventListener("message", function(event) {
	if (event.source != window){return;};
	if (event.data.dataType =="download") {		
		var paras=event.data;
		paras.pszRefUrl=location.href, //资源的引用页,兼容迅雷的
		sendMessage(paras,callBackfunc);
	};
}, false);

function callBackfunc(_obj){
	if (_obj) {
		console.log(_obj);
	}	
}
