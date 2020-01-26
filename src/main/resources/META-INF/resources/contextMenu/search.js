// document.getElementsByTagName("contextMenu")[0].innerHTML = `
// <div class="menu">
// <link rel="stylesheet" type="text/css" href="/contextMenu/contextMenu.css">
// </div>
// `;

class SearchComponent {
  constructor(element) {
    document.addEventListener('search', e => {
        this.search();
    })
  }
  search() {
      alert('searching');
  }
}
