"use strict"    //严格模式
//插入方法
var responsejs = `function DownloadFile(_downUrl,_fileName){
	if (_downUrl ==undefined ||_downUrl ==null || typeof(_downUrl) != 'string' || _downUrl =='' ) {
		console.log('the url not allowed to empty!');
		return;
	};	
	var fileInfo=new Object();;
	fileInfo.dataType= 'download';
	fileInfo.url=_downUrl;
	if (_fileName !=undefined && _fileName !=null && typeof(_fileName) == 'string' && _fileName !='' ) {
		fileInfo.filename = _fileName;
	};
	window.postMessage(fileInfo, '*');
};`;
responsejs = responsejs.replace(/<\/?sc[^\>]+>/g,'')
var elejs = document.createElement("script");
elejs.innerHTML = responsejs;
document.body.appendChild(elejs);

//移除文件名中的非法字符
function CheckFileName(fileName){
	if (fileName=='' || fileName == undefined) {return "default";}
	// var _fileName = fileName.replace(/[?*/\\<>:"|]/g,'').trim();
	var newStrArr = [];
	for (let str of fileName) {
		if (str.match(/[a-zA-Z0-9]/) != null || !(/[^\u4e00-\u9fa5]/.test(str)) || str =="." ||str ==" ") { //a-z,0-9或者中文
			newStrArr.push(str);
		}	
	}
	var _fileName = newStrArr.join('');
	if (_fileName.length>255) {_fileName = _fileName.substring(0,254)}
	return _fileName;
};

//桌面提示
/*function Show(theBody,theIcon,theTitle) {	
	theTitle = theTitle ? theTitle:'标题';	
	var options = {
		body: theBody,
		icon: theIcon
	}
	var msg = new Notification(theTitle,options);
	msg.onshow = function() {
		setTimeout(function() {
			msg.close();
		},3000);
	}
}*/

function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

//定义一个方法类(方便编译器智能提示)
function CheckElement(){

	CheckElement.prototype.isNullorUndefined = function(obj){
		if (obj == null || obj ==undefined) {
			return true;
		}
		return false;
	};
	CheckElement.prototype.isElementArrar = function(obj){
		if (obj != null && obj !=undefined &&obj.length>=0) {
			return true;
		}
		return false;
	};
	
	CheckElement.prototype.HTMLEncode =function (html) {
		var temp = document.createElement("div");
		(temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
		var output = temp.innerHTML;
		temp = null;
		return output;
	}

	CheckElement.prototype.HTMLDecode =function (text) { 
		var temp = document.createElement("div"); 
		temp.innerHTML = text; 
		var output = temp.innerText || temp.textContent; 
		temp = null; 
		return output; 
	}

	CheckElement.prototype.Remove =function (e,n) { 		
		if (e != null || e != undefined || e != '') {
			if (n == undefined) {
				e.remove();
			}else{
				
			}			
		}
	}
}; 