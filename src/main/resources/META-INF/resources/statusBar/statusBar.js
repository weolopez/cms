// include('MenuComponent','/contextMenu/menu.js', e=>{
//   var databaseMenu = new MenuComponent('#databaseMenuButton', () =>
//   cms.databases.forEach(d => databaseMenu.add(d.id, `cms.setDB(false, '${d.id}')`))
// );
// });
import("/include/include.js").then(e => {
  class StatusBarComponent extends e.Component {
    id = "statusBar";
    template = `
  <div>
  <link rel="stylesheet" type="text/css" href="/statusBar/statusBar.css">
  <div class="notification-bottom">
    <div id="databaseMenuButton">LocalDB</div> 
    </div>
  </div>
    `;
	// <script>
	// 	document.addEventListener("cmsLoaded", e => {
  //     console.log('CMSLOADED');
  //     console.dir(e);
  //     document.querySelector('#databaseMenuButton').innerText = e.detail.cms.database.id;
  //   });
	// </script>
	// <menu id="databaseMenu" data-triggerElementId="databaseMenuButton">
	// 	cms.databases.forEach(d => componentInstances.databaseMenu.add(d.id, cms.setDB(false, d.id)))
  // </menu>
  
  //   <span id="login" onclick="document.dispatchEvent(new Event('signIn'))" style="visibility: hidden;" class="notification-close">Login</span>
  //   <span id="loggedin"  style="visibility: hidden;" class="notification-close">Loggedin</span>

    constructor() {
      super();
      super.init();

      // document.addEventListener("cmsLoaded", e => {
      //   this.setStatus(e.detail.cms.database.id);
      // });
    }
    setStatus(s) {
       document.querySelector("#databaseMenuButton").innerText = s;
    }
  }
  statusBar = new StatusBarComponent();
});
