document.getElementsByTagName("editor")[0].innerHTML = `
    <link rel="stylesheet" type="text/css" href="/editor/editor.css">
    <pre id="editor" contenteditable onblur="document.dispatchEvent(new Event('saveEditor'))">
    </pre>
    `;

class EditorComponent {
  cms;
  constructor(cms, statusBar) {
    this.cms = cms;
    document.querySelector("#cms").onmouseover = function(e) {
      statusBar.setStatus(e.target.localName);
    }
    document.onkeyup = function(evt) {
      if (evt.ctrlKey && evt.which == 69) {
        EditorComponent.toggleEditor();
      }
      // if (evt.ctrlKey && evt.which == 83) {
      // }
      if (evt.keyCode === 27) EditorComponent.toggleEditor();
    };
    document.addEventListener('saveEditor', e => {
      EditorComponent.save(e);
    })
  }

  page(e) {
    document.querySelector("#editor").innerText = document.querySelector("#cms").innerHTML;
    EditorComponent.save = function(t) {
      document.querySelector("#cms").innerHTML = document.querySelector("#editor").innerText;
      EditorComponent.toggleEditor();
    };
    EditorComponent.toggleEditor();
  }
  innerHTML(e) {
    document.querySelector("#editor").innerText = e.innerHTML;
    EditorComponent.save = function(t) {
      e.innerHTML = document.querySelector("#editor").innerText;
      EditorComponent.toggleEditor();
    };
    EditorComponent.toggleEditor();
  }

  styles() {
    document.querySelector("#editor").innerText = (window.doc.styles) ? window.doc.styles : '';
    EditorComponent.save = function(t) {
      document.querySelector("#styles").innerHTML = document.querySelector( "#editor").innerText;
      window.doc.styles = document.querySelector( "#editor").innerText;
      EditorComponent.toggleEditor();
    };
    EditorComponent.toggleEditor();
  }

  data() {
    document.querySelector("#editor").innerText = (window.doc.data) ? JSON.stringify(window.doc.data) : '';
    EditorComponent.save = function(t) {
      window.doc.data = JSON.parse(document.querySelector( "#editor").innerText);
      EditorComponent.toggleEditor();
    };
    EditorComponent.toggleEditor();
  }

  static toggleEditor() {
    document.dispatchEvent(new Event('save'));
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
