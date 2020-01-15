// document.querySelector("template")[0].innerHTML = `
// `;

class TemplateComponent {
  template
  transforms = [];
  data;
  constructor(element) {
    document.addEventListener('cmsLoaded', cms => {
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
    } );
  }

}
