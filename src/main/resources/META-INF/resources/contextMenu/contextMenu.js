document.getElementsByTagName("contextMenu")[0].innerHTML = `
<div class="menu">
<link rel="stylesheet" type="text/css" href="/contextMenu/contextMenu.css">
</div>
`;

class ContextMenuComponent {
  static menu = document.querySelector(".menu");
  static target;
  actions = [];
  constructor(element) {
    window.addEventListener("click", e => {
      this.hide();
      return true;
    });

    element = (element) ? element : window;
    element.addEventListener("contextmenu", e => {
      if (this.hide()) return false;
      ContextMenuComponent.target = e.target;
      this.show(e);
      e.preventDefault();
      return false;
    });
  }
  hide() {
    if (!ContextMenuComponent.target) return false;
    ContextMenuComponent.menu.removeChild(
      document.querySelector(".menu-options")
    );
    ContextMenuComponent.menu.style.display = "none";
    ContextMenuComponent.target = undefined;
    return true;
  }
  show(e) {
    const list = document.createElement("ul");
    list.className = "menu-options";

    this.actions.forEach(a => this.append(list, a));
    ContextMenuComponent.menu.appendChild(list);

    ContextMenuComponent.menu.style.left = `${e.clientX}px`;
    ContextMenuComponent.menu.style.top = `${e.clientY}px`;
    ContextMenuComponent.menu.style.display = "block";
  }
  append(list, action) {
    var li = document.createElement("li");
    li.textContent = action.label;
    li.className = "menu-option";
    li.addEventListener("click", e => action.func(ContextMenuComponent.target));
    list.appendChild(li);
  }
  add(label, func) {
    this.actions.push({ label: label, func: func });
  }
}
var menu = new ContextMenuComponent();