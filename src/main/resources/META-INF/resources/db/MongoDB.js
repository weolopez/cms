export class MongoDB {
  id = "MongoDB";
  constructor() {
    // document.addEventListener("save", cms => {
    //   window.doc.body = document.querySelector("#cms").innerHTML;
    //   this.setDocument();
    // });
  }

  async getDocuments() {
    let response = await fetch(`/cms/v1/cms`);
    return await response.json();
  }
  async getDocument() {
    let response = await fetch(`/cms/v1/cms/${document.title}`);
    return await response.json();
  }
  async setDocument() {
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


document.dispatchEvent(
  new CustomEvent("addDB", { detail: { db: MongoDB } })
);