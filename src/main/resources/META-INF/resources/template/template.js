// document.querySelector("template")[0].innerHTML = `
// `;

class TemplateComponent {
  template;
  transforms = [];
  data;
  constructor(args) {
    args.forEach(transform => this.loadjscssfile(transform));
    document.addEventListener("cmsLoaded", cms => {
      this.data = window.doc.data;
      this.template = document.getElementsByTagName("cms");
      this.evaluate(this.template[0]);
    });

  }

  register(transformer) {
    this.transforms.push(transformer);
  }

  evaluate(ele) {
    this.transforms.forEach(transformer => {
      transformer.evaluate(ele);
    });
  }

  loadjscssfile(transformer) {
    var fileref = document.createElement("script");
    fileref.setAttribute("id", transformer);
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", `/template/${transformer}.js`);
    document.head.appendChild(fileref); 
  }
}
