window.onload = function(){
	var arg = new Object;
	var pair=location.search.substring(1).split('&');
	for(var i=0;pair[i];i++) {
    var kv = pair[i].split('=');
    arg[kv[0]]=kv[1];
}
	var param = arg.f;
	if(param == "new"){
		fileOpen();
	}
	view();
}
window.onbeforeunload = function(e) {
      return 'If you leave this page now,you lost the data. Are you sure to leave this page?';
    };
function view(){
	var code = document.getElementById("code");
	document.getElementById("view").contentWindow.document.body.innerHTML = code.value;
	var byn = encodeURI(code.value).replace(/%[0-9A-F]{2}/g, '*').length;
	var krb = byn / 1000;
	document.getElementById("states").textContent = "> length:" + so.getVal("code").length + " size:" + byn + "Byte (" + krb + "KB)";
}
function viewMode(num){
	if(num==0){
		so.getId("code").style.width = "49.5%";
		so.getId("view").style.width = "49.5%";
		so.display("view");
		view();
	}else if(num==1){
		so.getId("code").style.width = "99.5%";
		so.displayNone("view");
	}
}
function menu(num){
	var sub = document.getElementById("submenu");
	//メニュー設定
	if(num==0){
		sub.innerHTML='<a href="javascript:void(0);" onclick="newFile();" class="submenulink">New</a><input type="text" id="filename" style="width:295px;background:#4c4c4c;color:#fefefe;" placeholder="File Name..." autocomplete="off"><br><a href="javascript:void(0);" onclick="fileDown();" class="submenulink">Download</a><a href="javascript:void(0);" onclick="fileOpen();" class="submenulink">Open</a><a href="javascript:void(0);" onclick="saveLocal();" class="submenulink">Save to this Browser(LocalStorage)</a><a href="javascript:void(0);" onclick="loadLocal();" class="submenulink">Load from this Browser(LocalStorage)</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(Close this menu)</a>';
		var filename = sessionStorage.filename;
		if(filename===undefined){}
		else{
			so.setVal("filename",filename);
		}
	}
	else if(num==1){
		sub.innerHTML='<a href="javascript:void(0)" onclick="newtab(0)" class="submenulink">Open new tab</a><a href="javascript:void(0)" onclick="newtab(1)" class="submenulink">Open a file in new tab</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(Close this menu)</a>';
	}
	else if(num==2){
		sub.innerHTML='<a href="javascript:void(0);" onclick="viewMode(0);cMenu();" class="submenulink">Dual View</a><a href="javascript:void(0);" onclick="viewMode(1);cMenu();" class="submenulink">Source View</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(Close this menu)</a>';
	}
sub.style.display="block";
}
// ダウンロードしたいコンテンツ、MIMEType、ファイル名
function fileDown(){
var content  = document.getElementById("code").value;
var mimeType = 'text/html';
var name     = document.getElementById("filename").value;
if(name==""){
	so.modal.al("info","Please enter the File Name.");
	document.getElementById("filename").focus();
}else{
// BOMは文字化け対策
var bom  = new Uint8Array([0xEF, 0xBB, 0xBF]);
var blob = new Blob([bom, content], {type : mimeType});

var a = document.createElement('a');
a.download = name;
a.target   = '_blank';
a.id = "downloadlink";

if (window.navigator.msSaveBlob) {
  // for IE
  window.navigator.msSaveBlob(blob, name)
}
else if (window.URL && window.URL.createObjectURL) {
  // for Firefox
  a.href = window.URL.createObjectURL(blob);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
else if (window.webkitURL && window.webkitURL.createObject) {
  // for Chrome
  a.href = window.webkitURL.createObjectURL(blob);
  a.click();
}
else {
  // for Safari
  window.open('data:' + mimeType + ';base64,' + window.Base64.encode(content), '_blank');
}
cMenu();
}
}
function fileOpen(){
cMenu();
var diaso = '<b>Open</b><br><input type="file" id="selfile" accept=".html,.htm,.js,.css"><br><br><input type="button" onclick="so.modal.close();" value="Cancel">';
so.modal.custom(diaso);
var fo = document.getElementById("selfile");
fo.addEventListener("change",function(evt){
	so.modal.close();
	so.modal.custom("<br><br><br><center>Loading...</center>");
  var file = evt.target.files;
  //FileReaderの作成
  var reader = new FileReader();
  //テキスト形式で読み込む
  reader.readAsText(file[0]);
  //読込終了後の処理
  reader.onload = function(ev){
    //テキストエリアに表示する
    so.getId("code").value = reader.result;
	document.title = file[0].name + " - Soruto Web Develop";
	sessionStorage.filename =file[0].name;
	var accept = file[0].name.split(".");
	if(accept[1] == "html" || accept[1] == "htm"){
		so.getId("code").style.width = "49.5%";
		so.getId("view").style.width = "49.5%";
		so.display("view");
		view();
	}else{
		so.getId("code").style.width = "99.5%";
		so.displayNone("view");
	}
	so.modal.close();
  }
},false);
}
function saveLocal(){
	localStorage.savedata = so.getVal("code");
	cMenu();
	alert("Saved to LocalStorage.");
}
function loadLocal(){
	so.setVal("code",localStorage.savedata);
	cMenu();
	view();
}
function newFile(){
	cMenu();
	if(confirm("Are you sure you want to make new file?")){
		so.setVal("code","");
		document.title="New - Soruto Web Develop";
		view();
	}
}
function cMenu(){
	document.getElementById("submenu").style.display = "none";
}
function savefilename(){
	sessionStorage.filename = so.getVal("filename");
}
function newtab(num){
	if(num==0){
		var openurl = location.href.split("?");
		window.open(openurl[0],"_blank");
	}else if(num==1){
		var openurl = location.href.split("?");
		window.open(openurl[0] + "?f=new","_blank");
	}
cMenu();	
}