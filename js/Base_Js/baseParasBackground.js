var blockUrls =(typeof(localStorage.blockUrls) != "undefined"&& localStorage.blockUrls != "") ? localStorage.blockUrls.split(","):[];

function ShowMsg(status,msg){
	this.status=(status==undefined)? "error":status;	//success,error
	this.msg=(msg==undefined)? "":msg;
	ShowMsg.prototype.getInfo =function(){
		console.log(this.status+","+this.msg);
	};
}; 