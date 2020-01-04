
let editor = document.getElementsByTagName("editor")[0];
let content = `<link rel="stylesheet" type="text/css" href="editor/editor.css">
<div>
<h1 id="wikiName" onfocus="document.execCommand('selectAll',false,null)" contenteditable onblur="setWikiName();">${wikiName}</h1>
</div>`;
editor.innerHTML = content;


function toggleEditor() {
    editor.style.visibility = editor.style.visibility !== "visible" ? "visible" : "hidden";
    document.getElementById('wikiName').focus();
    return false;
}
function setWikiName() {
    wikiName = document.getElementById('wikiName').innerText;
    getDocument(wikiName);
    toggleEditor();
}
document.onkeyup = function(evt) {
  if (evt.ctrlKey && evt.which == 69) { toggleEditor(); }
  if (evt.ctrlKey && evt.which == 83) {  setDocument(); }
  var isEscape = evt.keyCode === 27;
 
};
