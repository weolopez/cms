document.getElementsByTagName("statusBar")[0].innerHTML = `
<div>
<link rel="stylesheet" type="text/css" href="/statusBar/statusBar.css">
<div class="notification-bottom">
  <p id="status"></p>
  <!--span class="notification-close">X</span-->
</div>
</div>
`;

class StatusBarComponent {

  constructor() {

  }
  setStatus(s) {
    document.querySelector("#status").innerText = s;
  }
}
