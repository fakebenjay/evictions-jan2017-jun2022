// set the dimensions and margins of the graph
var margin = {
  top: 10,
  right: 10,
  bottom: 25,
  left: 55
}

function mapRadio() {
  var radioVal = document.querySelector(`#chart-1 input[name="timeframe"]:checked`).value

  if (radioVal === 'total') {
    d3.selectAll('#chart-1 .select-monthyear')
      .style('display', 'none')
  } else {
    d3.selectAll('#chart-1 .select-monthyear')
      .style('display', 'inline')
    if (radioVal === 'monthly') {
      d3.select('#chart-1 .select-monthyear #month')
        .style('display', 'inline')
    } else {
      d3.select('#chart-1 .select-monthyear #month')
        .style('display', 'none')
    }
  }
  return radioVal
}

function radio(i) {
  var borosG = i == 2 ? borosG2 : i == 3 ? borosG3 : borosG4
  var citywideG = i == 2 ? citywideG2 : i == 3 ? citywideG3 : citywideG4
  var key = i == 2 ? 'eviction' : i == 3 ? 'filing' : 'warrant'
  var value = document.querySelector(`#chart-${i} input[name="${key}"]:checked`).value

  if (value === 'citywide') {
    borosG.style('display', 'none')
    citywideG.style('display', 'block')
    d3.select(`#chart-${i} .legend`).style('display', 'none')
  } else {
    citywideG.style('display', 'none')
    borosG.style('display', 'block')
    d3.select(`#chart-${i} .legend`).style('display', 'block')
  }
}

var winWidth = document.getElementById('article-body').offsetWidth
var rawWidth = document.getElementById('chart-1').offsetWidth
var width = rawWidth;
var height = 300;

var tickNums = window.innerWidth > 767 ? 20 : 10
// margin.right = window.innerWidth > 767 ? 40 : 20

function wrapText(text, width) {
  text.each(function() {
    var text = d3.select(this),
      textContent = text.text(),
      tempWord = addBreakSpace(textContent).split(/\s+/),
      x = text.attr('x'),
      y = text.attr('y'),
      dy = parseFloat(text.attr('dy') || 0),
      tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');
    for (var i = 0; i < tempWord.length; i++) {
      tempWord[i] = calHyphen(tempWord[i]);
    }
    textContent = tempWord.join(" ");
    var words = textContent.split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = .75, // ems
      spanContent,
      breakChars = ['/', '&', '-'];
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(' '));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        spanContent = line.join(' ');
        breakChars.forEach(function(char) {
          // Remove spaces trailing breakChars that were added above
          spanContent = spanContent.replace(char + ' ', char);
        });
        tspan.text(spanContent);
        line = [word];
        if (lineNumber === 0) {
          tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
        } else {
          tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', lineHeight + dy + 'em').text(word);
        }

      }
    }
    var emToPxRatio = parseInt(window.getComputedStyle(text._groups[0][0]).fontSize.slice(0, -2));
    text.attr("transform", "translate(-" + 0 + ", -" + lineNumber / 2 * emToPxRatio + ")");

    function calHyphen(word) {
      tspan.text(word);
      if (tspan.node().getComputedTextLength() > width) {
        var chars = word.split('');
        var asword = "";
        for (var i = 0; i < chars.length; i++) {
          asword += chars[i];
          tspan.text(asword);
          if (tspan.node().getComputedTextLength() > width) {
            if (chars[i - 1] !== "-") {
              word = word.slice(0, i - 1) + "- " + calHyphen(word.slice(i - 1));
            }
            i = chars.length;
          }
        }
      }
      return word;
    }
  });

  function addBreakSpace(inputString) {
    var breakChars = ['/', '&', '-']
    breakChars.forEach(function(char) {
      // Add a space after each break char for the function to use to determine line breaks
      inputString = inputString.replace(char, char + ' ');
    });
    return inputString;
  }
}