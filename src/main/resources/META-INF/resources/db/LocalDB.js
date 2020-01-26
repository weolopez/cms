// include('mongoDB','/db/MongoDB.js', e=>{
//     cms.addDB(new MongoDB());
//   });

export class LocalDB {
    id = 'LocalDB';
    constructor() {
      document.addEventListener('save', cms => {
        window.doc.body = document.querySelector("#cms").innerHTML;
        this.setDocument();
      });
    }
    async getDocuments() {
        return await localStorage.getItem('LOCAL_STORAGE_LIST');
    }
    async getDocument() {
      return await localStorage.getItem(document.title);
    }
    async setDocument() {
      return await localStorage.setItem(document.title, JSON.stringify(window.doc));
    }
}

document.dispatchEvent(
  new CustomEvent("addDB", { detail: { db: LocalDB } })
);