/*Soruto Web Develop Ver.2.0
Made with ACE Editor.
*/

window.onload = function(){
	var editor = ace.edit("code");
	editor.setTheme("ace/theme/monokai");
    editor.setFontSize(14);
    editor.getSession().setMode("ace/mode/html");
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setTabSize(2);
	editor.setShowPrintMargin(false);
	
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
      return 'If you leave this page now,you lost the edit data.\nAre you sure to leave this page?';
    };
function view(){
	var code = ace.edit("code");
	document.getElementById("view").contentWindow.document.body.innerHTML = code.session.getValue();
	var byn = encodeURI(code.session.getValue()).replace(/%[0-9A-F]{2}/g, '*').length + 3;
	var krb = byn / 1000;
	document.getElementById("states").textContent = "> length:" + code.session.getValue().length + " Size:" + byn + "Byte (" + krb + "KB)";
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
}
function menu(num){
	var sub = document.getElementById("submenu");
	//メニュー設定
	if(num==0){
		sub.innerHTML='<a href="javascript:void(0);" onclick="newFile();" class="submenulink">New File</a><input type="text" id="filename" style="width:295px;background:#4c4c4c;color:#fefefe;" placeholder="File name..." autocomplete="off" onkeyup="savefilename();"><br><a href="javascript:void(0);" onclick="fileDown();" class="submenulink">Download</a><a href="javascript:void(0);" onclick="fileOpen();" class="submenulink">Open</a><a href="javascript:void(0);" onclick="saveLocal();" class="submenulink">Save to LocalStorage</a><a href="javascript:void(0);" onclick="loadLocal();" class="submenulink">Load from the LocalStorage</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(Close this menu)</a>';
		var filename = sessionStorage.filename;
		if(filename===undefined){}
		else{
			so.setVal("filename",filename);
		}
	}
	else if(num==1){
		sub.innerHTML='<a href="javascript:void(0)" onclick="newtab(0)" class="submenulink">Open new tab</a><a href="javascript:void(0)" onclick="newtab(1)" class="submenulink">Open file in new tab</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(Close this menu)</a>';
	}
	else if(num==2){
		sub.innerHTML='<a href="javascript:void(0);" onclick="viewMode(0);cMenu();" class="submenulink">Dual view mode</a><a href="javascript:void(0);" onclick="viewMode(1);cMenu();" class="submenulink">Source view mode</a><a href="javascript:void(0);" onclick="viewMode(2);cMenu();" class="submenulink" style="border-bottom:#fefefe 2px solid;">Page view mode</a><a href="javascript:void(0)" onclick="pageview(\'reload\');" class="submenulink">Reload the page view</a><a href="javascript:void(0)" onclick="pageview(\'reset\');" class="submenulink">Reset the page view(When showing error)</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(Close this menu)</a>';
	}
	else if(num==3){
		sub.innerHTML='<a href="javascript:void(0);" onclick="template(\'html\')" class="submenulink">Plain HTML</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(Close this menu)</a>';
	}
	else if(num==4){
		sub.innerHTML='<a href="javascript:void(0);" onclick="so.modal.al(\'About\',\'<b>Soruto Web Develop</b><br><span style=font-size:10pt>Web develop on any browsers.<br>Made with ACE Editor.<br>(c)2018 Soruto Project</span>\');cMenu();" class="submenulink">About this site</a><a href="https://github.com/SorutoProject/Soruto-Web-Develop/" target="_blank" class="submenulink">GitHub</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(Close this menu)</a>';
	}
	else if(num==5){
		sub.innerHTML='<a href="javascript:void(0);" onclick="changeLang(\'css\')" class="submenulink">CSS</a><a href="javascript:void(0);" onclick="changeLang(\'html\')" class="submenulink">HTML</a><a href="javascript:void(0);" onclick="changeLang(\'js\')" class="submenulink">JavaScript</a><a href="javascript:void(0);" onclick="changeLang(\'php\')" class="submenulink">PHP</a>';
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
function fileDown(){
var code = ace.edit("code");
var content  = code.session.getValue();
var mimeType = 'text/plain';
var name     = document.getElementById("filename").value;
if(name==""){
	so.modal.al("Info","Please enter the file name");
}else{
var bom  = new Uint8Array([0xEF, 0xBB, 0xBF]);
var blob = new Blob([bom, content], {type : mimeType});

var a = document.createElement('a');
a.download = name;
a.target   = '_blank';
a.id = "downloadlink";

if (window.navigator.msSaveBlob) {
  window.navigator.msSaveBlob(blob, name)
}
else if (window.URL && window.URL.createObjectURL) {
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
var diaso = '<b>Select your file</b><br><input type="file" id="selfile" accept=".html,.htm,.js,.css"><br><br><input type="button" onclick="so.modal.close();" value="Cancel">';
so.modal.custom(diaso);
var fo = document.getElementById("selfile");
fo.addEventListener("change",function(evt){
	so.modal.close();
	so.modal.custom("<br><br><br><center>Loading...</center>");
	so.getId("so-modal").style.cursor="wait";
  var file = evt.target.files;
  var reader = new FileReader();
  reader.readAsText(file[0]);
  reader.onload = function(ev){
	var code = ace.edit("code");
    code.setValue(reader.result, 1);
	document.title = file[0].name + " - Soruto Web Develop";
	sessionStorage.filename =file[0].name;
	var accept = file[0].name.split(".")[1];
	if(accept=="html" || accept=="htm"){changeLang("html");viewMode(0);}
	else if(accept=="js"){changeLang("js");viewMode(1);}
    else if(accept="css"){changeLang("css");viewMode(1);}
	else if(accept=="php"){changeLang("php");viewMode(1);}
	so.modal.close();
	so.getId("so-modal").style.cursor="default";
	view();
  }
},false);
}
function saveLocal(){
	var code = ace.edit("code");
	localStorage.savedata = code.session.getValue();
	cMenu();
	so.modal.al("Complete","Saved to LocalStorage.");
}
function loadLocal(){
	var code = ace.edit("code");
	code.setValue(localStorage.savedata,1);
	cMenu();
	view();
}
function newFile(){
	cMenu();
	if(confirm("If you make new file,you lost the edit data.\nAre you sure to make new file?")){
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
