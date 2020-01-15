class StringLiteral {
  constructor() {}

  evaluate(element, data) {    
    element.innerHTML = this.evaluateString(window.doc.data, element.innerHTML);
  }

  evaluateString(data, str) {
    var r = str.split("${");
    r.shift();
    r.forEach(element => {
      var ele = element.split("}")[0];
      try {
        var result = eval('data.'+ele);
      } catch (e) {
        console.log("data missing: " + ele);
        //str = str.replace("${" + ele + "}", "");
      }
      str = (result) ? str.replace("${" + ele + "}", result) : str;
    });

    return str;
  }
}
