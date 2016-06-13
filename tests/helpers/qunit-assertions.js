import QUnit from 'qunit';

QUnit.assert.contains = function(selector, text, message) {
  var elements = find(selector);
  var regex = new RegExp(escapeForRegex(text) + '($|\\W)', 'gm');
  var result = false;
  message = `${(message || '')} - At least one element ${selector} containing "${text}" should exist.`;

  if (elements.length === 1) {
    var resultText = textOrVal(elements);
    result = regex.test(resultText);
    this.push(result, resultText, text, message);
  } else {
    elements.each(function() {
      if (regex.test(textOrVal($(this)))) {
        result = true;
      }
    });
    this.push(result, result, true, message);
  }
};

function textOrVal(element) {
  if (element.is('input') || element.is('textarea')) {
    return element.val();
  } else {
    return element.text();
  }
}

function escapeForRegex(str) {
  return str.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
}
