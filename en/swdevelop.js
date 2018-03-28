﻿window.onload = function(){
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
	document.getElementById("submenu").style.display = "none";
}
window.onresize = function () {
    Screen();
}
window.onbeforeunload = function(e) {
      return 'If you leave this page now,you lost the data. Are you sure you wamt to leave this page?';
    };
function view(){
	var code = document.getElementById("code");
	document.getElementById("view").contentWindow.document.body.innerHTML = code.value;
	var byn = encodeURI(code.value).replace(/%[0-9A-F]{2}/g, '*').length;
	var krb = byn / 1000;
	document.getElementById("states").textContent = "> Length:" + so.getVal("code").length + " Size:" + byn + "B (" + krb + "KB)";
}
function viewMode(num){
	if(num==0){
		so.getId("code").style.width = "49.5%";
		so.getId("view").style.width = "49.5%";
		so.display("view");
		so.display("code");
		view();
	}else if(num==1){
		so.getId("code").style.width = "99.5%";
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
	//Menu Set
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
		sub.innerHTML='<a href="javascript:void(0);" onclick="viewMode(0);cMenu();" class="submenulink">Dual View Mode</a><a href="javascript:void(0);" onclick="viewMode(1);cMenu();" class="submenulink">Source View Mode</a><a href="javascript:void(0);" onclick="viewMode(2);cMenu();" class="submenulink" style="border-bottom:#fefefe 2px solid;">Page View Mode</a><a href="javascript:void(0)" onclick="pageview(\'reload\');" class="submenulink">Update the page view</a><a href="javascript:void(0)" onclick="pageview(\'reset\');" class="submenulink">Reset the page view(When showing error)</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(Close this menu)</a>';
	}
	else if(num==3){
		sub.innerHTML='<a href="javascript:void(0);" onclick="template(\'html\')" class="submenulink">Normal HTML</a><a href="javascript:void(0);" class="submenulink" onclick="cMenu();">(Close this menu)</a>';
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
var content  = document.getElementById("code").value;
var mimeType = 'text/plain';
var name     = document.getElementById("filename").value;
if(name==""){
	so.modal.al("info","Please enter the File Name.");
	document.getElementById("filename").focus();
}else{
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
var diaso = '<b>Select your file</b><br><input type="file" id="selfile" accept=".html,.htm,.js,.css"><br><br><input type="button" onclick="so.modal.close();" value="Cancel">';
so.modal.custom(diaso);
var fo = document.getElementById("selfile");
fo.addEventListener("change",function(evt){
	so.modal.close();
	so.modal.custom("<br><br><br><center>Loading...</center>");
	so.getId("so-modal").style.cursor="wait";
  var file = evt.target.files;
  //Make FileReader
  var reader = new FileReader();
  //read As text
  reader.readAsText(file[0]);
  //onload
  reader.onload = function(ev){
    //show on the editor
    so.getId("code").value = reader.result;
	document.title = file[0].name + " - Soruto Web Develop";
	sessionStorage.filename =file[0].name;
	var accept = file[0].name.split(".");
	if(accept[1] == "html" || accept[1] == "htm"){
		so.getId("code").style.width = "49.5%";
		so.getId("view").style.width = "49.5%";
		so.display("view");
		so.display("code");
		view();
	}else{
		so.getId("code").style.width = "99.5%";
		so.displayNone("view");
	}
	so.modal.close();
	so.getId("so-modal").style.cursor="default";
  }
},false);
}
function saveLocal(){
	localStorage.savedata = so.getVal("code");
	cMenu();
	so.modal.al("Complete","Saved to LocalStorage.");
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
function pageview(func){
	if(func == "reset"){
	document.getElementById("view").contentWindow.location.replace("about:blank");
	}else if(func == "reload"){
	view();	
	cMenu();
	}
}
function edit(){
	var code = document.getElementById("code");
    code.value = document.getElementById("view").contentWindow.document.body.innerHTML;
	var byn = encodeURI(code.value).replace(/%[0-9A-F]{2}/g, '*').length;
	var krb = byn / 1000;
	document.getElementById("states").textContent = "> Length:" + so.getVal("code").length + " Size:" + byn + "Byte (" + krb + "KB)";
}
function template(st){
	if(st=="html"){
	var code = document.getElementById("code");
	code.value='<!DOCTYPE HTML><html><head><title>Template</title><meta charset="utf-8"></head><body><p>sample</p></body></html>';
	}
view();
cMenu();
}
function Screen(){
	var size = document.documentElement.clientHeight - 60;
	so.getId("view").style.height= size + "px";
	so.getId("code").style.height= size + "px";
	}
