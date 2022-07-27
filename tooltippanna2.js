// function tipTextMap(values, closestKey) {
//   var plural = 'arrests'
//
//   return `<span class='quit'>x</span>
//   <div class="tooltip-container">
//   <p>The NYPD issued <strong>${numeral(values[closestKey]).format('0,0')} ${plural}</strong> for cannabis in Q${values.month} ${values.year}.</p>
//   </div>`
// }

function tipTextLine2(data) {
  var months = document.getElementById('month').children
  var year = data.monthyear.split('/')[0]
  var month = data.monthyear.split('/')[1]
  var values = data

  return `<span class='quit'>x</span>
  <div class="tooltip-container">
  <div class="tooltip-top">
  <h2>Evictions Executed</h2>
  <strong style="font-size:12pt;">for ${months[month-1].innerText} ${year}</strong>
  <br/><br/>
  <p style="font-size:14pt;width:100%;float:none;"><span style="background-color:#142a43;color:white;">&nbsp;Citywide&nbsp;</span> <strong>${numeral(values.citywide).format('0,0')}</strong></p><br/>
  <p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#F9C80E;color:black;">&nbsp;Manhattan&nbsp;</span> <strong>${values.manhattan}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.manhattan/values.citywide).format('0%')} of total)</small>` : ''}</p>
  <p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#6ba292;color:white;">&nbsp;The Bronx&nbsp;</span> <strong>${values.bronx}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.bronx/values.citywide).format('0%')} of total)</small>` : ''}</p>
  <p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#ed6a5a;color:black;">&nbsp;Brooklyn&nbsp;</span> <strong>${values.brooklyn}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.brooklyn/values.citywide).format('0%')} of total)</small>` : ''}</p>
  <p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#654f6f;color:white;">&nbsp;Queens&nbsp;</span> <strong>${values.queens}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.queens/values.citywide).format('0%')} of total)</small>` : ''}</p>
  <p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#56A9DE;color:black;">&nbsp;Staten Island&nbsp;</span> <strong>${values.staten}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.staten/values.citywide).format('0%')} of total)</small>` : ''}</p>
  </div>
  </div>`
}

function tipTextMap(data, month, year) {
  var months = document.getElementById('month').children
  var values = data

  var arrestAvg = arrestSubset.reduce((a, b) => {
    return a + b
  }) / arrestSubset.length

  return `<span class='quit'>x</span>
  <div class="tooltip-container">
  <div class="tooltip-top">
  <h2>${values.modzcta}</h2>
  <small style="line-height:normal;">${values.hood}</small><br/>
  <strong style="font-size:12pt;">for ${months[month-1].innerText} ${year}</strong>
  <br/><br/>
  <p style="font-size:13pt;width:100%;float:none;">Evictions: <strong style="color:${values['arrest'][year+month] > 12 ? 'white':'black'};background-color:${arrestScale(values['arrest'][year+month])};">&nbsp;${values['arrest'][year+month]}&nbsp;</strong><br/><span style="font-size:10pt;">(${numeral(values['arrest'][year+month]/arrestAvg).format('0,0%')} of average)</span></p>
  </div>
  <div class="tooltip-bottom">
  <div class="tt-chart" style="width:100%;float:none;"></div>
  </div>
  </div>`
}

function ttChartData(data, side) {
  var metric = 'arrest'
  var dataArray = Object.keys(data[metric]).map((k) => {
    return {
      key: k,
      val: data[metric][k]
    }
  })
  return dataArray.slice(0, dataArray.length - 1)
}

function tooltipChart(dataArray) {
  var miniW = document.querySelector(`.tt-chart`).offsetWidth
  var miniH = 80
  var miniMargin = 10
  var metric = 'arrest'
  var colorMax = -0.749023438
  var max = 0

  for (let i = 0; i < dataArray.length; i++) {
    max = dataArray[i]['val'] > max ? dataArray[i]['val'] : max
  }

  var miniColorScale = d3.scaleLinear()
    .domain([0, 916.625])
    .range(['#f6f7f6', '#b01116'])
  // .clamp(true)

  var xScaleMini = d3.scalePoint()
    .range([miniMargin, miniW - miniMargin])
    .domain(["201701", "201702", "201703", "201704", "201705", "201706", "201707", "201708", "201709", "201710", "201711", "201712", "201801", "201802", "201803", "201804", "201805", "201806", "201807", "201808", "201809", "201810", "201811", "201812", "201901", "201902", "201903", "201904", "201905", "201906", "201907", "201908", "201909", "201910", "201911", "201912", "202001", "202002", "202003", "202004", "202005", "202006", "202007", "202008", "202009", "202010", "202011", "202012", "202101", "202102", "202103", "202104", "202105", "202106", "202107", "202108", "202109", "202110", "202111", "202112", "202201", "202202", "202203", "202204", "202205", "202206"])

  var xScaleMini2 = d3.scaleLinear()
    .range([miniMargin, miniW - miniMargin])
    .domain([2017, 2022 + (5 / 12)])

  var yScaleMini = d3.scaleLinear()
    .domain([max, 0])
    .range([miniMargin, miniH - miniMargin])

  var yAxisMini = d3.axisLeft(yScaleMini)
    .ticks(3)
    .tickFormat(d => d)

  var xAxisMini2 = d3.axisBottom(xScaleMini2)
    .ticks(7)
    .tickFormat(d => d)

  var xAxisMini = d3.axisBottom(xScaleMini)
    .ticks(1)
    .tickFormat(d => d)

  var miniLine = d3.line()
    .x(function(d) {
      return xScaleMini(d.key)
    })
    .y(function(d) {
      return yScaleMini(d.val);
    });

  var miniSVG = d3.select(`.tt-chart`)
    .append("svg")
    .attr("width", miniW)
    .attr("height", miniH);

  var miniG = miniSVG.append("g")
    .attr('class', 'minilines')

  var yRenderMini = miniG.append("g")
    .attr("transform", `translate(10,0)`)
    .attr('class', 'y-axis')
    .call(yAxisMini)
    .selectAll(".tick")
    .style('color', '#f3f3f3')
    .selectAll("text")
    .style('font-size', '5pt')
    .attr("transform", `translate(4,0)`)
    .style("text-anchor", "middle")
    .style('fill', 'black')

  var xRenderMini2 = miniG.append("g")
    .attr("transform", `translate(0,${miniH-10})`)
    .attr('class', 'x-axis')
    .call(xAxisMini2)
    .selectAll(".tick")
    .style('color', '#f3f3f3')
    .selectAll("text")
    .style('font-size', '5pt')
    .attr("transform", `translate(0,-5)`)
    .style("text-anchor", "middle")
    .style('fill', 'black')

  // var xRenderMini = miniG.append("g")
  //   .attr("transform", `translate(0,${miniH-50})`)
  //   .attr('class', 'x-axis')
  //   .call(xAxisMini)
  //   .selectAll(".tick")
  //   .style('color', '#f3f3f3')
  //   .selectAll("text")
  //   .style('font-size', '5pt')
  //   .attr("transform", `translate(0,-5)`)
  //   .style("text-anchor", "middle")
  //   .style('fill', 'black')

  miniSVG.selectAll('.minilines')
    .data([dataArray])
    .append("path")
    .attr("class", `line miniline-${metric}`)
    .attr("d", (d) => {
      return miniLine(d)
    })
    // .style('stroke', (d) => {
    //   if (d[0].val === 0 && d[d.length - 1].val === 0) {
    //     return miniColorScale(0)
    //   } else {
    //     return miniColorScale((d[d.length - 1].val - d[0].val) / d[0].val)
    //   }
    // })
    .style('stroke', (d) => {
      // var total = d.map(d => d.val).reduce((n, q) => {
      //   return n + q
      // })
      // return miniColorScale(total)
      return 'black'
    })

  var monthDatum = dataArray.filter((d) => {
    return d.key === year.value + month.value
  })[0]

  var selectScale = arrestScale

  miniSVG.selectAll(".minilines")
    .datum(monthDatum)
    .append("circle")
    .attr("class", `dot miniline-${metric}`)
    .attr("cy", function(d) {
      return miniH - yScaleMini(max - d.val);
    })
    .attr("cx", function(d) {
      return xScaleMini(d.key)
    })
    .attr("r", 4)
    // .style('stroke', '#F7F9F7')
    .style('stroke', 'black')
    .style('fill', d => selectScale(d.val))
}

var bisectDate = d3.bisector(function(d) {
  return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1]) - margin.left;
}).left

function mouseoverLine(data, index) {
  var x0 = d3.mouse(event.target)[0],
    i = bisectDate(data, x0, 1)

  var d0 = data[i - 1] !== 'dummy' ? data[i - 1] : data[i],
    d1 = i < data.length ? data[i] : data[i - 1]

  var d = (x0 + margin.left) - xScale2(d0.monthyear.split('/')[0]) + xScaleMonth2(d0.monthyear.split('/')[1]) > xScale2(d1.monthyear.split('/')[0]) + xScaleMonth2(d1.monthyear.split('/')[1]) - (x0 + margin.left) ? d1 : d0;
  var html = tipTextLine2(d)

  // d3.selectAll(`#chart-${index} .dot`)
  //   .attr('r', 1)
  //   .lower()

  d3.selectAll(`#chart-${index} .dot.yr-${d.monthyear.replaceAll('/','')}`)
    .attr('r', 8)
    .raise()

  d3.select(`#tooltip-${index}`)
    .html(html)
    .attr('display', 'block')
    .style("visibility", "visible")
    .style('top', topTT(index))
    .style('left', leftTT(index))

  d3.select(`#tooltip-${index} .quit`)
    .on('click', () => {
      d3.selectAll('.dot')
        .attr("r", 3)

      d3.select(`#tooltip-${index}`)
        .html("")
        .attr('display', 'none')
        .style("visibility", "hidden")
        .style("left", null)
        .style("top", null);
    })
}

function mouseover(i, tipText) {
  var html = tipText
  d3.select(`#tooltip-${i}`)
    .html(html)
    .attr('display', 'block')
    .style("visibility", "visible")
  // .style('top', topTT(i))
  // .style('left', leftTT(i))

  d3.select(`#tooltip-${i} .quit`)
    .on('click', () => {
      $("select.zipname").selectize()[0].selectize.setValue('')
      // svg1.selectAll(`path`)
      //   .style('stroke-width', 0.5)
      //
      // d3.select(`#tooltip-${i}`)
      //   .html("")
      //   .attr('display', 'none')
      //   .style("visibility", "hidden")
      //   .style("left", null)
      //   .style("top", null);
    })
}

function mousemove(i) {
  if (window.innerWidth > 767) {
    d3.select(`#tooltip-${i}`)
      .style("visibility", "visible")
    // .style('top', topTT(i))
    // .style('left', leftTT(i))
  }
}

function mouseout(i) {
  if (window.innerWidth > 767) {
    d3.select(event.target)
      .style('stroke-width', 0.5)

    d3.selectAll(`#chart-${i} .dot`)
      .attr("r", 1)
      .lower()

    d3.select(`#tooltip-${i}`)
      .html("")
      .attr('display', 'none')
      .style("visibility", "hidden")
      .style("left", null)
      .style("top", null);
  }
}

function topTT(d) {
  var offsetParent = document.querySelector(`#chart-${d} .chart`).offsetParent
  var offY = offsetParent.offsetTop
  var cursorY = 5

  var windowWidth = window.innerWidth
  var ch = document.querySelector(`#tooltip-${d}`).clientHeight
  var cy = d3.event.pageY - offY
  var windowHeight = window.innerHeight
  if (windowWidth > 767) {
    if (ch + cy >= windowHeight) {
      return cy - (ch / 2) + "px"
    } else {
      return cy - 28 + "px"
    }
  }
}

function leftTT(d) {
  var offsetParent = document.querySelector(`#chart-${d} .chart`).offsetParent
  var offX = offsetParent.offsetLeft
  var cursorX = 5

  var windowWidth = window.innerWidth
  var cw = document.querySelector(`#tooltip-${d}`).clientWidth
  var cx = d3.event.pageX - offX
  var bodyWidth = document.querySelector(`#chart-${d} .chart`).clientWidth

  if (windowWidth > 767) {
    if (cw + cx - ((windowWidth - bodyWidth) / 2) >= bodyWidth) {
      document.querySelector(`#tooltip-${d}`).className = 'my-tooltip box-shadow-left'
      return cx - cw - cursorX + "px"
    } else {
      document.querySelector(`#tooltip-${d}`).className = 'my-tooltip box-shadow-right'
      return cx + cursorX + "px"
    }
  }
}