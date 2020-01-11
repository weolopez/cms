document.querySelector("cms").innerHTML = `
    <link rel="stylesheet" type="text/css" href="/cms/cms.css">
    <style id="styles"></style>
    <template id="data"></template>
    <main id="cms"></main>
    `;

class CMSComponent {
  documentModel = `{
    "_id": "name",
    "body": "<main><hr><div>New HTML</div><hr></main>",
    "styles": "main { background: silver }"
  }`;
  static doc;
  static wikiName = window.location.href.split("#")[1];
  constructor(edit) {
    edit = edit ? true : false;
    this.getDocument(CMSComponent.wikiName, edit);
    document.querySelector("#cms").addEventListener("blur", this.setBody);
  }

  async getDocument(name, edit) {
    let response = await fetch(`/cms/v1/cms/${name}`);
    CMSComponent.doc = await response.json();

    if (!CMSComponent.doc) CMSComponent.doc = JSON.parse(this.documentModel);

    document.querySelector("#data").innerHTML = CMSComponent.doc.data;
    document.querySelector("#styles").innerHTML = CMSComponent.doc.styles;
    document.querySelector("#cms").innerHTML = CMSComponent.doc.body;
    // edit
    //   ? 
    //   : CMSComponent.setData(CMSComponent.doc.data, CMSComponent.doc.body);
    return CMSComponent.doc;
  }

  static setDocument(key, value) {
    value = value ? value : "";
    let b = value;
    CMSComponent.doc[key] = b;
    CMSComponent.save();
  }
  static async save() {
    const options = {
      method: "PUT",
      body: JSON.stringify(CMSComponent.doc),
      headers: {
        "Content-Type": "application/text"
      }
    };

    let response = await fetch(`/cms/v1/cms/${CMSComponent.wikiName}`, options)
      .then(res => res.json())
      .then(res => console.log(res));

    let data = await response;

    return data;
  }

  static setData(data, str) {
    CMSComponent.evaluate(data, str);
  }

  static evaluate(data, str) { 
    var r =  str.split('${')
    r.shift();
    r.forEach(element => {
      var ele = element.split('}')[0];
      try {
        eval(ele);
      } catch(e) {
        console.log('data missing: '+ele);
        str = str.replace('${'+ele+'}', "");
      }
    });

    try {
      str = eval("`" + str + "`");
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.dir(e);
      }
    }
    return str;
  }
  setBody() {
    CMSComponent.setDocument("body", document.querySelector("#cms").innerHTML);
  }
}
