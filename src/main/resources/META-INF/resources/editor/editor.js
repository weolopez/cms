document.getElementsByTagName("editor")[0].innerHTML = `
    <link rel="stylesheet" type="text/css" href="/editor/editor.css">
    <pre id="editor" contenteditable onblur="EditorComponent.save();">
    </pre>
    `;

class EditorComponent {
  static cms;
  constructor(statusBar) {
    document.querySelector("#cms").onmouseover = function(e) {
      statusBar.setStatus(e.target.localName);
    }
    document.onkeyup = function(evt) {
      if (evt.ctrlKey && evt.which == 69) {
        EditorComponent.toggleEditor();
      }
      if (evt.ctrlKey && evt.which == 83) {
        //setDocument();
      }
      if (evt.keyCode === 27) EditorComponent.toggleEditor();
    };
  }

  innerHTML(e) {
    document.querySelector("#editor").innerText = e.innerHTML;
    EditorComponent.save = function(t) {
      e.innerHTML = document.querySelector("#editor").innerText;
      CMSComponent.setDocument( "body", document.querySelector("#cms").innerHTML);
      EditorComponent.toggleEditor();
    };
    EditorComponent.toggleEditor();
  }

  styles(e) {
    document.querySelector("#editor").innerText = document.querySelector("#styles") ? document.querySelector("#styles").innerText : "";
    EditorComponent.save = function(t) {
      document.querySelector("#styles").innerHTML = document.querySelector( "#editor").innerText;
      CMSComponent.setDocument( "styles", document.querySelector("#editor").innerText);
      EditorComponent.toggleEditor();
    };
    EditorComponent.toggleEditor();
  }

  data(e) {
    document.querySelector("#editor").innerText = (CMSComponent.doc.data) ? JSON.stringify(CMSComponent.doc.data) : '';
    EditorComponent.save = function(t) {
      CMSComponent.doc.data = JSON.parse(document.querySelector( "#editor").innerText);
      CMSComponent.save();
      EditorComponent.toggleEditor();
    };
    EditorComponent.toggleEditor();
  }

  static toggleEditor() {
    document.querySelector("editor").style.visibility =
      document.querySelector("editor").style.visibility !== "visible"
        ? "visible"
        : "hidden";
    return false;
  }

  format(node, level) {
    var indentBefore = new Array(level++ + 1).join("  "),
      indentAfter = new Array(level - 1).join("  "),
      textNode;

    for (var i = 0; i < node.children.length; i++) {
      textNode = document.createTextNode("\n" + indentBefore);
      node.insertBefore(textNode, node.children[i]);

      format(node.children[i], level);

      if (node.lastElementChild == node.children[i]) {
        textNode = document.createTextNode("\n" + indentAfter);
        node.appendChild(textNode);
      }
    }

    return node;
  }
}
