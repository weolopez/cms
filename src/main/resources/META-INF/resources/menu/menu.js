
  class MenuComponent {
    id = "menu";
    template = `
  <link rel="stylesheet" type="text/css" href="/menu/menu.css">
  <div class="menu">
  </div>
  `;
    actions = [];
    menuElementId;
    triggerElementId;
    menu;
    isShowing = false;
    onShowAction;
    constructor(element) {
      this.menuElementId = "#" + element.id;
      this.triggerElementId = "#" + element.dataset.triggerelementid;
      this.onShowAction = element.innerText;
      element.innerText = "";
      this.init();

      if (this.triggerElementId==="#undefined") {

        document.querySelector('body').addEventListener("contextmenu", e => {
          if (this.isShowing) this.hide();
          this.show(e);
          e.preventDefault();
          return false;
        });

      }

      var menuElement = document.querySelector(this.menuElementId);
      this.menu = menuElement.querySelector(".menu");
      window.addEventListener("click", e => {
        if (this.isShowing) this.hide();
        else if ('#'+e.target.id === this.triggerElementId) this.show(e);
        return false;
      });
    }
    init() {
      var tags = document.querySelectorAll(this.id);
      for (const e of tags) {
        var node = document.createElement("div");
        node.innerHTML = this.template;
        e.appendChild(node);
      }
    }
    hide() {
      let options = this.menu.querySelector(".menu-options");
      options.remove();
      this.menu.style.display = "none";
      this.isShowing = false;
      return true;
    }
    show(e) {
      if (this.onShowAction) {
        this.actions = [];
        eval(this.onShowAction);
      }
      let listItems = "";
      this.actions.forEach(action => {
        let listItem = `<li onclick="${action.func}" class="menu-option">${action.label}</li>`;
        listItems += listItem;
      });
      let list = `<ul class="menu-options">${listItems}</ul>`;

      this.menu.innerHTML = list;
      this.menu.style.left = `${e.clientX}px`;
      this.menu.style.top = `${e.clientY}px`;
      setTimeout(e => {
        if (this.menu.offsetTop + this.menu.offsetHeight > window.innerHeight) {
          this.menu.style.top = `-${this.menu.offsetHeight}px`;
        }
      }, 1);
      this.menu.style.display = "block";
      this.isShowing = true;
    }
    add(label, func) {
      this.actions.push({ label: label, func: func });
    }
  }
watch('menu', MenuComponent);