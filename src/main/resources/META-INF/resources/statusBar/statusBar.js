// include('MenuComponent','/contextMenu/menu.js', e=>{
//   var databaseMenu = new MenuComponent('#databaseMenuButton', () =>
//   cms.databases.forEach(d => databaseMenu.add(d.id, `cms.setDB(false, '${d.id}')`))
// );
// });
// import("/include/include.js").then(e => {
 export class StatusBarComponent {
    id = "statusBar";
    template = `
  <div>
  <link rel="stylesheet" type="text/css" href="/statusBar/statusBar.css">
  <div class="notification-bottom">
    <div id="databaseMenuButton">LocalDB</div> 
    </div>
    <menu id="databaseMenu" data-triggerElementId="databaseMenuButton"
                            data-component="MenuComponent">
         cmsObserver.componentInstances.databaseMenu.add('alert', alert('SUCCESS'))
  </menu>

  </div>
    `;
	// <script>
	// 	document.addEventListener("cmsLoaded", e => {
  //     console.log('CMSLOADED');
  //     console.dir(e);
  //     document.querySelector('#databaseMenuButton').innerText = e.detail.cms.database.id;
  //   });
	// </script>
	
  // cms.databases.forEach(d => componentInstances.databaseMenu.add(d.id, cms.setDB(false, d.id)))
  //   <span id="login" onclick="document.dispatchEvent(new Event('signIn'))" style="visibility: hidden;" class="notification-close">Login</span>
  //   <span id="loggedin"  style="visibility: hidden;" class="notification-close">Loggedin</span>

    constructor(e) {
        var node = document.createElement("div");
        node.innerHTML = this.template;
        e.appendChild(node);
    }
    setStatus(s) {
       document.querySelector("#databaseMenuButton").innerText = s;
    }
  }
