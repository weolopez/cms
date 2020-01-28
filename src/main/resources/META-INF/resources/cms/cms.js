
    
export class CMSComponent {
  id = "cms";
  template = `
  <link rel='stylesheet' type='text/css' href='/cms/cms.css'>
  <style id='styles'></style>
  <json id='data' hidden></json>
  <main id='cms'></main>
  `;
  documentModel = {
    _id: "name",
    body: `<section><hr>
      <div>New Wiki Page</div><hr>
      </section>
	<statusBar id="bottomStatusBar" data-component="StatusBarComponent"></statusBar>`,
    styles: `section { 
      background: green;
    }
    div {
      margin: 10px;
    }`
  };
  databases = [];
  database;
  constructor(e) {
    var node = document.createElement("div");
    node.innerHTML = this.template;
    e.appendChild(node);
    document.title = window.location.href.split("#")[1];
    this.documentModel._id = document.title;
    document.addEventListener("addDB", e => {
      let db = new e.detail.db();
      this.addDB(db);
      let currentDB = localStorage.getItem("db");
      if (currentDB === db.id) {
        this.setDB(false, db.id);
      }
    });
    // this.getWebsite();
  }

  addDB(database) {
    this.databases.push(database);
  }

  setDB(edit, db) {
    edit = edit ? true : false;
    this.database = this.databases.find(d => d.id === db);
    this.database.getDocument().then(data => {
      this.applyDocument(edit);
    });
  }
  applyDocument(edit) {
    if (!window.doc) window.doc = this.documentModel;

    document.querySelector("#styles").innerHTML = window.doc.styles;
    document.querySelector("#cms").innerHTML = window.doc.body;

    document.dispatchEvent(
      new CustomEvent("cmsLoaded", { detail: { cms: this } })
    );
    return window.doc;
  }
  async getWebsite() {
    let game = await fetch(
      "https://www.atlutd.com/schedule?month=all&year=2020&club_options=Home"
    );
    let html = await game.text();
    let elem = document.createElement("div");
    elem.innerHTML = html;
    let cms = document.querySelector("#cms");
    cms.insertBefore(elem, cms.children[0]);
    document.dispatchEvent(new Event("save"));
  }
}
// var cms = new CMSComponent();
import("/db/LocalDB.js").then(e => {
  // cms.addDB(new e.LocalDB());
  // cms.setDB(false, "LocalDB");
});
import("/db/MongoDB.js").then(e => {
  // cms.addDB(new e.MongoDB());
  // cms.setDB(false, "MongoDB");
});




