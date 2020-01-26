// <menu id="databaseMenu" data-triggerid="databaseMenuButton"></menu>

import("/include/include.js").then(module => {
  class MenuComponent extends module.Component {
    id = "menu";
    template = `
  <link rel="stylesheet" type="text/css" href="/contextMenu/contextMenu.css">
  <div class="menu">
  </div>
  `;
    actions = [];
    menuElementId;
    triggerElementId;
    menu;
    isShowing = false;
    onShowAction;
    constructor(menuElementId, onShowAction, triggerElementId) {
      let s = super();
      s.menuElementId = menuElementId;
      s.triggerElementId = triggerElementId;
      s.onShowAction = onShowAction;
      super.init();

      if (s.triggerElementId==="#undefined") {

        document.querySelector('body').addEventListener("contextmenu", e => {
          if (this.isShowing) this.hide();
          this.show(e);
          e.preventDefault();
          return false;
        });

      }

      var menuElement = document.querySelector(s.menuElementId );
      s.menu = menuElement.querySelector(".menu");
      window.addEventListener("click", e => {
        if (this.isShowing) this.hide();
        else if ('#'+e.target.id === this.triggerElementId) this.show(e);
        return false;
      });
    }
    hide() {
      let options = this.menu.querySelector(".menu-options");
      options.remove();
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
  var tags = document.querySelectorAll('menu');
  for (const e of tags) {
      let menuElementId = e.id;
      let triggerElementId = e.dataset.triggerelementid;
      let func = e.innerText;
      e.innerText='';
	    window[e.id] = new MenuComponent(
        '#'+menuElementId, 
        func,
			'#'+triggerElementId
		);
  }
});
