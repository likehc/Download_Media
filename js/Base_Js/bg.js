var bg = function(){
//---------编程格式---以上忽略

//共用变量
var exId;	//扩展程序id
var tabId;	//当前tab id
var hasJsInserted = false;	//是否有网站需要注入JS
var downloadStatus = new ShowMsg();


var jsPath ='js/Urls_JS/';
var downloadTypePath ='js/DownloadType/';
var base_JsPath = "js/Base_Js/";

if (localStorage.downloadType =="" || localStorage.downloadType ==undefined ) {
	localStorage.downloadType ='0';
}
//console.log(document.domain);
// chrome.management.getAll(function(exInfoArray){
//     console.log(exInfoArray);
// });

// chrome.management.get(tabId, function(exInfo){
//     console.log(exInfo);
// });

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
exId=sender.id;
if (sender.hasOwnProperty("tab")){tabId=sender.tab.id}else{return}; //点击扩展时,也会激活此事件
// 注入js事件
if (message.dataType == 'InsertJS') {

	//xxyyzz
	if(message.hostname.indexOf('ilearningx.huawei.com')>-1 ){InsertJs("ilearningx_huawei.js");};
	

};

//下载事件
if(message.dataType == 'download'){
	if (message.url ==null || message.url==""){return;};
		var pars = new Object();
		pars.url=message.url;
		if (message.hasOwnProperty("filename")){pars.filename=message.filename};  // 保存的文件名,
		if (message.hasOwnProperty("conflictAction")){pars.conflictAction=message.conflictAction};  // 重名文件的处理方式
		if (message.hasOwnProperty("saveAs")){pars.saveAs=message.saveAs};   // 是否弹出另存为窗口
		if (message.hasOwnProperty("method")){pars.method=message.method};  // 请求方式（POST 或 GET）
		if (message.hasOwnProperty("headers")){pars.headers=message.headers}; // 自定义 header 数组,
		if (message.hasOwnProperty("body")){pars.body=message.body};  // POST 的数据

		chrome.downloads.download(pars,downloadCallback);	
};
 // sendResponse(downloadStatus);  //回调函数
});



//阻塞网页
var callback =function(details){
	if (blockUrls.length<=0 || blockUrls[0] == "" || blockUrls[0] == null) {
		return {cancel: false};
	}
	return {cancel: true}; 
};
var filter = {urls:blockUrls};
var opt_extraInfoSpec = ["blocking"];
chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec);


// 插入js
function InsertJs(jsName){
	hasJsInserted = true;
	chrome.tabs.executeScript(tabId, { 
    	file: jsPath +jsName, 
    	allFrames: false, 
    	runAt: 'document_start' 
	},function(urlsArr){
		InsertScript(base_JsPath +"ButtonCss.js");
		switch (localStorage.downloadType)
		{
			//普通下载
			case '0':
				break;
			//重命名下载
			case '1':
				InsertScript(downloadTypePath+"Rename.js");
				break;
			//迅雷下载
			case '2':
				InsertScript(downloadTypePath+"Thunder.js");
				break;
			default:
				localStorage.downloadType = 0;
				break;
		}
	});
};

/*  私有方法 */

//插入带目录的JS ,如'js/DownloadType/Thunder.js'
function InsertScript(tjsName){
	chrome.tabs.executeScript(tabId, {
    	file:tjsName, 
    	allFrames: false, 
    	runAt: 'document_end'
	// },function(urlsArr){
	// });
	});
};

//下载 回调函数,返回出错信息
function downloadCallback() {
	if (chrome.runtime.lastError) {
		downloadStatus.msg=chrome.runtime.lastError.message;
		console.log(chrome.runtime.lastError.message);
	}else{
		downloadStatus.status="success";
	}
};

//---------编程格式---以下忽略

}();
