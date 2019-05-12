var downloadTypes;
function SaveClick() {	
  if (downloadTypes !=null &&downloadTypes !=undefined && downloadTypes.constructor == NodeList) {
    for (var i = 0; i < downloadTypes.length; i++) {
      if (downloadTypes[i].checked == true) {
        localStorage.downloadType =downloadTypes[i].value;
        alert('保存成功!');
      }
    }
  };
};

window.onload = function() {
  downloadTypes = document.getElementsByName('downloadType');
  document.getElementById('SaveClick').onclick = SaveClick;

  //初始化 Radio 的选中值
  var getTrueRadio =localStorage.downloadType;
  if (getTrueRadio != null && getTrueRadio != undefined) {
    downloadTypes[getTrueRadio].checked = true;

  };
};