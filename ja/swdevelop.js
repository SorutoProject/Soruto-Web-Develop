﻿/*Soruto Web Develop Ver.2.0
Made with ACE Editor.
*/

window.onload = function(){
	var editor = ace.edit("code");
	editor.setTheme("ace/theme/monokai");
    editor.setFontSize(12);
    editor.getSession().setMode("ace/mode/html");
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setTabSize(2);
	editor.setShowPrintMargin(false);
	editor.setAutoScrollEditorIntoView(true); 
	
	editor.$blockScrolling = Infinity;
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    });
	
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
	Screen();
	
/*var iframe = document.querySelector('iframe');

iframe.contentDocument.body.contentEditable = true;
iframe.contentDocument.designMode = 'on';
*/
document.getElementById("submenu").style.display = "none";
}
window.onresize = function () {
    Screen();
}
window.onbeforeunload = function(e) {
      return 'このページから出ると、編集内容が失われますが、続行しますか?';
    };
function view(){
	var code = ace.edit("code");
	document.getElementById("view").contentWindow.document.body.innerHTML = code.session.getValue();
	var byn = encodeURI(code.session.getValue()).replace(/%[0-9A-F]{2}/g, '*').length + 3;
	var krb = byn / 1000;
	document.getElementById("states").textContent = "> 文字数:" + code.session.getValue().length + "字 サイズ:" + byn + "Byte (" + krb + "KB)";
}
function viewMode(num){
	if(num==0){
		so.getId("code").style.width = "50%";
		so.getId("view").style.width = "50%";
		so.display("view");
		so.display("code");
		view();
	}else if(num==1){
		so.getId("code").style.width = "100%";
		so.displayNone("view");
		so.display("code");
	}
	else if(num==2){
		so.getId("view").style.width = "100%";
		so.display("view");
		so.displayNone("code");
	}
var editor = ace.edit("code");
editor.setTheme("ace/theme/monokai");
}
function menu(num){
	var sub = document.getElementById("submenu");
	//メニュー設定
	if(num==0){
		sub.innerHTML='<a href="javascript:void(0);" onclick="newFile();" class="submenulink">新規作成</a><input type="text" id="filename" style="width:295px;background:#4c4c4c;color:#fefefe;" placeholder="ファイル名..." autocomplete="off" onkeyup="savefilename();"><br><a href="javascript:void(0);" onclick="fileDown();" class="submenulink">ダウンロード</a><a href="javascript:void(0);" onclick="fileOpen();" class="submenulink">ファイルを開く</a><a href="javascript:void(0);" onclick="saveLocal();" class="submenulink">ブラウザ(LocalStorage)に保存</a><a href="javascript:void(0);" onclick="loadLocal();" class="submenulink">ブラウザ(LocalStorage)から読み込み</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(メニューを閉じる)</a>';
		var filename = sessionStorage.filename;
		if(filename===undefined){}
		else{
			so.setVal("filename",filename);
		}
	}
	else if(num==1){
		sub.innerHTML='<a href="javascript:void(0)" onclick="newtab(0)" class="submenulink">新しいタブを開く</a><a href="javascript:void(0)" onclick="newtab(1)" class="submenulink">新しいタブでファイルを開く</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(メニューを閉じる)</a>';
	}
	else if(num==2){
		sub.innerHTML='<a href="javascript:void(0);" onclick="viewMode(0);cMenu();" class="submenulink">デュアルビューモード</a><a href="javascript:void(0);" onclick="viewMode(1);cMenu();" class="submenulink">ソース表示モード</a><a href="javascript:void(0);" onclick="viewMode(2);cMenu();" class="submenulink" style="border-bottom:#fefefe 2px solid;">ページ表示モード</a><a href="javascript:void(0)" onclick="pageview(\'reload\');" class="submenulink">ページ表示を更新</a><a href="javascript:void(0)" onclick="pageview(\'reset\');" class="submenulink">ページ表示をリセット(エラーが出たとき)</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(メニューを閉じる)</a>';
	}
	else if(num==3){
		sub.innerHTML='<a href="javascript:void(0);" onclick="template(\'html\')" class="submenulink">標準HTML</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(メニューを閉じる)</a>';
	}
	else if(num==4){
		sub.innerHTML='<a href="javascript:void(0);" onclick="so.modal.al(\'About\',\'<b>Soruto Web Develop</b><br><span style=font-size:10pt>Webブラウザで使えるオンラインIDE<br>Made with ACE Editor.<br>(c)2018 Soruto Project</span>\');cMenu();" class="submenulink">このサイトについて</a><a href="https://github.com/SorutoProject/Soruto-Web-Develop/" target="_blank" class="submenulink">GitHub</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(メニューを閉じる)</a>';
	}
	else if(num==5){
		sub.innerHTML='<a href="javascript:void(0);" onclick="changeLang(\'css\')" class="submenulink">CSS</a><a href="javascript:void(0);" onclick="changeLang(\'html\')" class="submenulink">HTML</a><a href="javascript:void(0);" onclick="changeLang(\'js\')" class="submenulink">JavaScript</a><a href="javascript:void(0);" onclick="changeLang(\'php\')" class="submenulink">PHP</a>'
	}
}
function sMenu(){
	var sub = document.getElementById("submenu");
	if(sub.style.display == "block"){
	sub.style.display = "none";
	}else{
		sub.style.display = "block";
	}
}
// ダウンロードしたいコンテンツ、MIMEType、ファイル名
function fileDown(){
var code = ace.edit("code");
var content  = code.session.getValue();
var mimeType = 'text/plain';
var name     = document.getElementById("filename").value;
if(name==""){
	so.modal.al("情報","ファイル名を入力してください");
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
var diaso = '<b>ファイルを選択してください</b><br><span style="font-size:8pt;">※UTF-8でエンコードされていることを推奨します。</span><br><input type="file" id="selfile" accept=".html,.htm,.js,.css,.php"><br><br><input type="button" onclick="so.modal.close();" value="キャンセル">';
so.modal.custom(diaso);
var fo = document.getElementById("selfile");
fo.addEventListener("change",function(evt){
	so.modal.close();
	so.modal.custom("<br><br><br><center>読み込み中...</center>");
	so.getId("so-modal").style.cursor="wait";
  var file = evt.target.files;
  //FileReaderの作成
  var reader = new FileReader();
  //テキスト形式で読み込む
  reader.readAsText(file[0]);
  //読込終了後の処理
  reader.onload = function(ev){
    //テキストエリアに表示する
	var code = ace.edit("code");
    code.setValue(reader.result, 1);
	document.title = file[0].name + " - Soruto Web Develop";
	sessionStorage.filename =file[0].name;
	var accept = file[0].name.split(".")[1].toLowerCase();
	if(accept=="html" || accept=="htm"){changeLang("html");viewMode(0);}
	else if(accept=="js"){changeLang("js");viewMode(1);}
    else if(accept="css"){changeLang("css");viewMode(1);}
	else if(accept="php"){changeLang("php");viewMode(1);}
	so.modal.close();so.getId("so-modal").style.cursor="default";
	view();
  }
},false);
}
function saveLocal(){
	var code = ace.edit("code");
	localStorage.savedata = code.session.getValue();
	cMenu();
	so.modal.al("完了","LocalStorageに上書き保存しました");
}
function loadLocal(){
	var code = ace.edit("code");
	code.setValue(localStorage.savedata,1);
	cMenu();
	view();
}
function newFile(){
	cMenu();
	if(confirm("新しいファイルを作成すると、現在の編集データが消えますがよろしいですか？")){
		var code = ace.edit("code");
		code.setValue("",1);
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
function pageview(func){
	if(func == "reset"){
	document.getElementById("view").contentWindow.location.replace("about:blank");
	}else if(func == "reload"){
	view();	
	cMenu();
	}
}
function template(st){
	if(st=="html"){
	var code = ace.edit("code");
	code.setValue('<!DOCTYPE HTML><html><head><title>Template</title><meta charset="utf-8"></head><body><p>sample</p></body></html>',1);
	}
view();
cMenu();
}
function Screen(){
	var size = document.documentElement.clientHeight - 60;
	so.getId("view").style.height= size + "px";
	so.getId("code").style.height= size + "px";
	}
function changeLang(lang){
	var editor = ace.edit("code");
	if(lang=="css"){editor.getSession().setMode("ace/mode/css");viewMode(1);}
	else if(lang=="html"){editor.getSession().setMode("ace/mode/html");viewMode(0);}
	else if(lang=="js"){editor.getSession().setMode("ace/mode/javascript");viewMode(1);}
	else if(lang=="php"){editor.getSession().setMode("ace/mode/php");viewMode(1);}
cMenu();
}
function _delete_element( id_name ){
    var dom_obj = document.getElementById(id_name);
    var dom_obj_parent = dom_obj.parentNode;
    dom_obj_parent.removeChild(dom_obj);
}
