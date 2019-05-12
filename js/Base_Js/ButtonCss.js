// 插入CSS 样式
var ButtonCss = function(){
	var responseCss = `<style type="text/css">`+
	`body {
	    margin:0px auto;
	}
	#fixedLayer {
	    position:fixed;
	    right:10px;
	    top: 40%;
	    width:auto;
	    line-height:25px;
	    background: #31A43F;
	    border:1px solid #FFFFFF;
	    z-index:9999;
	}
	#fixedLayer a{
	    text-decoration:none;
	    color:#0A00FF;
	}
	#fixedLayer a:hover{
		cursor:pointer;
        text-decoration:none;
        font-weight:bold;
      }
	</style>`;
	responseCss = responseCss.replace(/<\/?sc[^\>]+>/g,'')
	var eleCss = document.createElement("style");
	eleCss.innerHTML = responseCss;
	document.body.appendChild(eleCss);
}();