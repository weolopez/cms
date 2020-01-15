class Loop {
  stringLiteral;
  constructor(stringLiteral) {
    this.stringLiteral = stringLiteral;
  }

  evaluate(element) {
    var loops = element.querySelectorAll("[loop]");
    loops.forEach(e => this.loop(window.doc.data, e));
  }
  loop(data, loop) {
    var command = loop.getAttribute("loop");
    var tokens = command.split(" ");
    var arr = eval(tokens[3]);
    var variable = tokens[1];

    var nodelist = [];
    arr.forEach((currentValue, index, array, thisArg) => {
      let newClone = loop.cloneNode(true);
      let data = {
        ...window.doc.data,
        index: index+1
      };
      data[variable] = currentValue;
      newClone.innerHTML = stringLiteral.evaluateString(data, newClone.innerHTML)
      nodelist.unshift(newClone);
    });
    nodelist.forEach(newClone => loop.parentNode.insertBefore(newClone, loop.nextSibling));
    loop.remove();
  }
}
