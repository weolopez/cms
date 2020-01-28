class CMSObserver {
  static watchList = [];
  static componentInstances = {};
  static componentClasses = {};
  constructor() {
    const observer = new MutationObserver(CMSObserver.callback);
    const targetNode = document.querySelector("cms");
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(targetNode, config);
    CMSObserver.elementsUpdated(); 
  }
  static callback(mutationsList, observer) {
    CMSObserver.elementsUpdated();
    for (let mutation of mutationsList) {
      console.dir(mutation);
    }
  }
  static checkElement(watching) {
    document.querySelectorAll(watching.tag).forEach(element => {
      if (CMSObserver.componentInstances[element.id]) return;

      CMSObserver.componentInstances[element.id] = new watching.classRef(element);
    });
  }
  static watch(tag, classRef) {
    CMSObserver.watchList.push({ tag: tag, classRef: classRef });
    CMSObserver.checkElement({ tag: tag, classRef: classRef });
  }
  static elementsUpdated() {
    document.querySelectorAll("[data-component]").forEach(e => {
      let className = e.dataset.component;
      e.removeAttribute("[data-component]");
      if (CMSObserver.componentClasses[className]) return;
      import(`/${e.localName}/${e.localName}.js`).then(module => {
        if (!module[className]) alert("CLASS NOT FOUND");
        CMSObserver.watch(e.localName, module[className]);
      });
    });
    CMSObserver.watchList.forEach(watching => {
      CMSObserver.checkElement(watching);
    });
  }
}

window['cmsObserver'] = new CMSObserver();
