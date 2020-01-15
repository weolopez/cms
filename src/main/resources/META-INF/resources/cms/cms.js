class localDB {
  constructor() {
    document.addEventListener('save', cms => {
      window.doc.body = document.querySelector("#cms").innerHTML;
      this.saveDocument();
    });
  }

  async getDocument() {
    let response = await fetch(`/cms/v1/cms/${document.title}`);
    return await response.json();
  }
  async saveDocument() {
    const options = {
      method: "PUT",
      body: JSON.stringify(window.doc),
      headers: {
        "Content-Type": "application/text"
      }
    };

    let response = await fetch(`/cms/v1/cms/${document.title}`, options)
      .then(res => res.json())
      .then(res => console.log(res));

    return await response;
  }

}

document.querySelector("cms").innerHTML = `
    <link rel="stylesheet" type="text/css" href="/cms/cms.css">
    <style id="styles"></style>
    <json id="data" hidden></json>
    <main id="cms"></main>
    `;

class CMSComponent {
  documentModel = {
    _id: "name",
    body: "<section><hr><div>New HTML</div><hr></section>",
    styles: `section { 
      background: green;
    }
    div {
      margin: 10px;
    }`
  };
  
  constructor(edit, database) {
    document.title = window.location.href.split("#")[1];
    this.documentModel._id = document.title; 
    edit = edit ? true : false; 
    this.database = (database) ? database : new localDB();

    this.database.getDocument().then(data => {
      window.doc = data;
      this.applyDocument(edit);
    });
    // this.getWebsite();
  }

  applyDocument(edit) {
    if (!window.doc) window.doc = this.documentModel;
    document.querySelector("#styles").innerHTML = window.doc.styles;
    document.querySelector("#cms").innerHTML = window.doc.body;

    var cmsLoaded = new CustomEvent('cmsLoaded', { cms: this });
    document.dispatchEvent(cmsLoaded);
    return window.doc;
  }
 

  async getWebsite() {
    let game = await fetch('https://www.atlutd.com/schedule?month=all&year=2020&club_options=Home');
    let html = await game.text();
    let elem = document.createElement("div");
    elem.innerHTML = html;
    let cms = document.querySelector("#cms");
    cms.insertBefore(elem, cms.children[0]);
    document.dispatchEvent(new Event('save')) 
  }
}
