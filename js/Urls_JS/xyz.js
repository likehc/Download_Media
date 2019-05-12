var xyz= function(){
var fileUrl=""; //视频下载链接
var fileName=""; //视频名称

//获取文件名
function getFileName() {
    if ($(".headline h1")!=null) {
        fileName=$(".headline h1")[0].innerText.trim();
        fileName=CheckFileName(fileName);
    };
}

//获取视频下载链接
function getUrl(){
    try
    {
        if ($(".fp-player video").length>0) { 
         fileUrl =$(".fp-player video")[0].src;        
        }else{
            fileUrl = $('[class="item"][style="display:none"] a' )[0].href;
        };
    }
    catch(err)
    {}    
}

function addDownloadDiv(){
    if (fileUrl =="") {
        return;
    }
    if (!$("#fixedLayer").length >0) {
        var div = document.createElement("div");
        div.id = "fixedLayer";
        div.innerHTML = '<p><a id="mediadownload" name ="mediadownload" href="#" download="" target="_blank">Download</a></p>';
        document.body.appendChild(div);
    }   
    $('#mediadownload').attr("href",fileUrl);
    $('#mediadownload').attr("download",fileName);
};

function show(){
    getFileName();
    getUrl();
    addDownloadDiv();
};

//加载页面后执行
$(document).ready(function(){
   show();
    
});
