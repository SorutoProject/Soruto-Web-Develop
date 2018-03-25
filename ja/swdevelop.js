﻿window.onload = function(){
	view();
}
window.onbeforeunload = function(e) {
      return 'このページから出ると、編集内容が失われますが、続行しますか?';
    };
function view(){
	var code = document.getElementById("code");
	document.getElementById("view").contentWindow.document.body.innerHTML = code.value;
	var byn = encodeURI(code.value).replace(/%[0-9A-F]{2}/g, '*').length;
	var krb = byn / 1000;
	document.getElementById("states").textContent = "> 文字数:" + so.getVal("code").length + "字 サイズ:" + byn + "Byte (" + krb + "KB)";
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
	if(sub.style.display == "block"){
		cMenu();
	}else{
	//メニュー設定
	if(num==0){
		sub.innerHTML='<a href="javascript:void(0);" onclick="newFile();" class="submenulink">新規作成</a><input type="text" id="filename" style="width:95%;background:#4c4c4c;color:#fefefe;" placeholder="ファイル名..." autocomplete="off"><br><a href="javascript:void(0);" onclick="fileDown();" class="submenulink">ダウンロード</a><a href="javascript:void(0);" onclick="fileOpen();" class="submenulink">ファイルを開く</a><a href="javascript:void(0);" onclick="saveLocal();" class="submenulink">ブラウザ(LocalStorage)に保存</a><a href="javascript:void(0);" onclick="loadLocal();" class="submenulink">ブラウザ(LocalStorage)から読み込み</a>';
	}
	else if(num==1){
		sub.innerHTML='<a href="javascript:void(0);" onclick="viewMode(0);cMenu();" class="submenulink">デュアルビュー</a><a href="javascript:void(0);" onclick="viewMode(1);cMenu();" class="submenulink">ソース表示</a>';
	}
sub.style.display="block";
}
}
// ダウンロードしたいコンテンツ、MIMEType、ファイル名
function fileDown(){
var content  = document.getElementById("code").value;
var mimeType = 'text/html';
var name     = document.getElementById("filename").value;
if(name==""){
	so.modal.al("情報","ファイル名を入力してください");
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
var diaso = '<b>ファイルを開く</b><br><input type="file" id="selfile" accept=".html,.htm,.js,.css"><br><br><input type="button" onclick="so.modal.close();" value="キャンセル">';
so.modal.custom(diaso);
var fo = document.getElementById("selfile");
fo.addEventListener("change",function(evt){
	so.modal.close();
	so.modal.custom("<br><br><br><center>読み込み中...</center>");
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
	alert("LocalStorageに上書き保存しました");
}
function loadLocal(){
	so.setVal("code",localStorage.savedata);
	cMenu();
	view();
}
function newFile(){
	cMenu();
	if(confirm("新しいファイルを作成すると、現在の編集データが消えますがよろしいですか？")){
		so.setVal("code","");
		document.title="New - Soruto Web Develop";
		view();
	}
}
function cMenu(){
	document.getElementById("submenu").style.display = "none";
}