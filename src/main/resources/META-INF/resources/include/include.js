export class Component {
  id;
  template;
  init() {
    var tags = document.querySelectorAll(this.id);
    for (const e of tags) {
      var node = document.createElement("div");
      node.innerHTML = this.template;
      e.appendChild(node);
    }
  }
}
