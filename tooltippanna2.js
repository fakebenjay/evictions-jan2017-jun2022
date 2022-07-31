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

  var manhattanLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#F9C80E;color:black;">&nbsp;Manhattan&nbsp;</span> <strong>${values.manhattan}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.manhattan/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var bronxLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#6ba292;color:white;">&nbsp;The Bronx&nbsp;</span> <strong>${values.bronx}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.bronx/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var brooklynLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#ed6a5a;color:black;">&nbsp;Brooklyn&nbsp;</span> <strong>${values.brooklyn}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.brooklyn/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var queensLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#654f6f;color:white;">&nbsp;Queens&nbsp;</span> <strong>${values.queens}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.queens/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var statenLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#56A9DE;color:black;">&nbsp;Staten Island&nbsp;</span> <strong>${values.staten}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.staten/values.citywide).format('0%')} of total)</small>` : ''}</p>`

  var lines = [manhattanLine, bronxLine, brooklynLine, queensLine, statenLine]
  lines.sort((b, a) => {
    return parseInt(values[a.split('&nbsp;')[1].toLowerCase().replaceAll('the ', '').replaceAll(' island', '')]) - parseInt(values[b.split('&nbsp;')[1].toLowerCase().replaceAll('the ', '').replaceAll(' island', '')])
  })


  return `<span class='quit'>x</span>
  <div class="tooltip-container">
  <div class="tooltip-top">
  <h2>Evictions Executed</h2>
  <strong style="font-size:12pt;">for ${months[month-1].innerText} ${year}</strong>
  <br/><br/>
  <p style="font-size:14pt;width:100%;float:none;"><span style="background-color:#142a43;color:white;">&nbsp;Citywide&nbsp;</span> <strong>${numeral(values.citywide).format('0,0')}</strong></p><br/>
${lines.join('')}
  </div>
  </div>`
}

function tipTextLine3(data) {
  var months = document.getElementById('month').children
  var year = data.monthyear.split('/')[0]
  var month = data.monthyear.split('/')[1]
  var values = data

  var manhattanLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#F9C80E;color:black;">&nbsp;Manhattan&nbsp;</span> <strong>${numeral(values.manhattan).format('0,0')}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.manhattan/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var bronxLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#6ba292;color:white;">&nbsp;The Bronx&nbsp;</span> <strong>${numeral(values.bronx).format('0,0')}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.bronx/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var brooklynLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#ed6a5a;color:black;">&nbsp;Brooklyn&nbsp;</span> <strong>${numeral(values.brooklyn).format('0,0')}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.brooklyn/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var queensLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#654f6f;color:white;">&nbsp;Queens&nbsp;</span> <strong>${numeral(values.queens).format('0,0')}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.queens/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var statenLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#56A9DE;color:black;">&nbsp;Staten Island&nbsp;</span> <strong>${numeral(values.staten).format('0,0')}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.staten/values.citywide).format('0%')} of total)</small>` : ''}</p>`

  var lines = [manhattanLine, bronxLine, brooklynLine, queensLine, statenLine]
  lines.sort((b, a) => {
    return parseInt(values[a.split('&nbsp;')[1].toLowerCase().replaceAll('the ', '').replaceAll(' island', '')]) - parseInt(values[b.split('&nbsp;')[1].toLowerCase().replaceAll('the ', '').replaceAll(' island', '')])
  })


  return `<span class='quit'>x</span>
  <div class="tooltip-container">
  <div class="tooltip-top">
  <h2>Eviction Filings</h2>
  <strong style="font-size:12pt;">for ${months[month-1].innerText} ${year}</strong>
  <br/><br/>
  <p style="font-size:14pt;width:100%;float:none;"><span style="background-color:#142a43;color:white;">&nbsp;Citywide&nbsp;</span> <strong>${numeral(values.citywide).format('0,0')}</strong></p><br/>
${lines.join('')}
  </div>
  </div>`
}

function tipTextLine4(data) {
  var months = document.getElementById('month').children
  var year = data.monthyear.split('/')[0]
  var month = data.monthyear.split('/')[1]
  var values = data

  var manhattanLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#F9C80E;color:black;">&nbsp;Manhattan&nbsp;</span> <strong>${numeral(values.manhattan).format('0,0')}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.manhattan/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var bronxLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#6ba292;color:white;">&nbsp;The Bronx&nbsp;</span> <strong>${numeral(values.bronx).format('0,0')}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.bronx/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var brooklynLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#ed6a5a;color:black;">&nbsp;Brooklyn&nbsp;</span> <strong>${numeral(values.brooklyn).format('0,0')}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.brooklyn/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var queensLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#654f6f;color:white;">&nbsp;Queens&nbsp;</span> <strong>${numeral(values.queens).format('0,0')}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.queens/values.citywide).format('0%')} of total)</small>` : ''}</p>`
  var statenLine = `<p style="font-size:12pt;width:100%;float:none;"><span style="background-color:#56A9DE;color:black;">&nbsp;Staten Island&nbsp;</span> <strong>${numeral(values.staten).format('0,0')}</strong>${values.citywide > 0 ? ` <small>(${numeral(values.staten/values.citywide).format('0%')} of total)</small>` : ''}</p>`

  var lines = [manhattanLine, bronxLine, brooklynLine, queensLine, statenLine]
  lines.sort((b, a) => {
    return parseInt(values[a.split('&nbsp;')[1].toLowerCase().replaceAll('the ', '').replaceAll(' island', '')]) - parseInt(values[b.split('&nbsp;')[1].toLowerCase().replaceAll('the ', '').replaceAll(' island', '')])
  })


  return `<span class='quit'>x</span>
  <div class="tooltip-container">
  <div class="tooltip-top">
  <h2>Eviction Warrants</h2>
  <strong style="font-size:12pt;">for ${months[month-1].innerText} ${year}</strong>
  <br/><br/>
  <p style="font-size:14pt;width:100%;float:none;"><span style="background-color:#142a43;color:white;">&nbsp;Citywide&nbsp;</span> <strong>${numeral(values.citywide).format('0,0')}</strong></p><br/>
${lines.join('')}
  </div>
  </div>`
}

function tipTextMap(data, month, year) {
  var months = document.getElementById('month').children
  var values = data

  var radioVal = mapRadio()
  var month = radioVal === 'yearly' ? 'XX' : month
  var lastKey = radioVal === 'total' ? radioVal : year + month
  var selectScale = radioVal === 'total' ? totalScale : radioVal === 'yearly' ? yearScale : monthScale
  var blackwhite = selectScale.domain()[1] / 2.2
  var monthName = radioVal === 'monthly' ? months[month - 1].innerText + " " : ''
  var yearName = radioVal === 'total' ? 'January 2017 to June 2022' : year

  var totalLine = radioVal === 'total' ? '' : `<p style="font-size:9pt;"></p>`
  var yearLine = radioVal !== 'monthly' ? '' : `<p style="font-size:9pt;"></p>`

  d3.select('#tooltip-1 h2.zipcode')
    .html(values.ZIPCODE)

  d3.select('#tooltip-1 p.hood')
    .html(values.hood)

  d3.select('#tooltip-1 p.hood')
    .html(values.hood)

  d3.select('#tooltip-1 strong.timeframe')
    .html(`<br/>for ${monthName} ${yearName}${yearName == 2022 && radioVal === 'yearly' ? ' (to date)':''}`)

  d3.select('#tooltip-1 strong.count')
    .style('color', values['arrest'][lastKey] > blackwhite ? 'white' : 'black')
    .style('background-color', selectScale(values['arrest'][lastKey]))
    .html(`&nbsp;${numeral(values['arrest'][lastKey]).format('0,0')}&nbsp;`)

  d3.select('#tooltip-1 p.total-line')
    .html(radioVal === 'total' ? '' : `<strong>${numeral(values['arrest']['total']).format('0,0')}</strong> ${values['arrest']['total'] == 1 ? 'eviction':'evictions'} here, from January 2017 to June 2022`)

  d3.select('#tooltip-1 p.year-line')
    .html(radioVal !== 'monthly' ? '' : `<strong>${numeral(values['arrest'][yearName + 'XX']).format('0,0')}</strong> ${values['arrest'][yearName + 'XX'] == 1 ? 'eviction':'evictions'} here, in ${yearName.replaceAll('2022', '2022 (to date)')}`)
}

function ttChartData(data) {
  var metric = 'arrest'
  var dataArray = Object.keys(data[metric]).map((k) => {
    return {
      key: k,
      val: data[metric][k]
    }
  })
  if (mapRadio() === 'yearly') {
    return dataArray.slice(dataArray.length - 6)
  } else {
    return dataArray.slice(0, dataArray.length - 7)
  }
}

function tooltipBeeswarm(dataArray) {
  var miniW = document.querySelector(`.tt-beeswarm .tt-chart`).offsetWidth
  var miniH = 130
  var miniYMargin = 10
  var miniXMargin = 18
  var metric = 'arrest'
  var colorMax = -0.749023438
  var max = 0
  var domainMax2 = mapRadio() === 'yearly' ? 2022 : 2022 + (5 / 12)
  var monthsList = ["201701", "201702", "201703", "201704", "201705", "201706", "201707", "201708", "201709", "201710", "201711", "201712", "201801", "201802", "201803", "201804", "201805", "201806", "201807", "201808", "201809", "201810", "201811", "201812", "201901", "201902", "201903", "201904", "201905", "201906", "201907", "201908", "201909", "201910", "201911", "201912", "202001", "202002", "202003", "202004", "202005", "202006", "202007", "202008", "202009", "202010", "202011", "202012", "202101", "202102", "202103", "202104", "202105", "202106", "202107", "202108", "202109", "202110", "202111", "202112", "202201", "202202", "202203", "202204", "202205", "202206"]
  var domainMax1 = mapRadio() === 'yearly' ? monthsList.slice(0, monthsList.length - 5) : monthsList

  for (let i = 0; i < dataArray.length; i++) {
    max = dataArray[i]['arrest']['total'] > max ? dataArray[i]['arrest']['total'] : max
  }
  var xScaleMini = d3.scaleLinear()
    .range([miniXMargin, miniW - miniXMargin])
    .domain([0, max])

  var xAxisMini = d3.axisBottom(xScaleMini)
    .ticks(10)
    .tickFormat(d => numeral(d).format('0,0'))

  var simulation = d3.forceSimulation(dataArray)
    .force("x", d3.forceX(function(d) {
      return xScaleMini(d['arrest']['total']);
    }).strength(1))
    .force("y", d3.forceY((miniH - miniYMargin) / 2))
    .force("collide", d3.forceCollide(4))
    .stop();

  for (var i = 0; i < dataArray.length; i++) {
    simulation.tick(10)
  };

  var miniSVG = d3.select(`.tt-beeswarm .tt-chart`)
    .append("svg")
    .attr("width", miniW)
    .attr("height", miniH);

  var miniG = miniSVG.append("g")
    .attr('class', 'beeswarm')

  var xRenderMini = miniG.append("g")
    .attr("transform", `translate(0,${miniH-20})`)
    .attr('class', 'x-axis')
    .call(xAxisMini)
    .selectAll(".tick")
    .style('color', '#f3f3f3')
    .selectAll("text")
    .style('font-size', '5pt')
    .attr("transform", `translate(0,-5)`)
    .style("text-anchor", "middle")
    .style('fill', 'black')

  var vData = d3.voronoi()
    .extent([
      [miniXMargin, miniYMargin],
      [miniW - miniXMargin, miniH - miniYMargin]
    ])
    .x(function(d) {
      return d.x;
    })
    .y(function(d) {
      return d.y;
    })
    .polygons(dataArray)

  miniG.selectAll('circle')
    .data(dataArray)
    .enter()
    .append("circle")
    .attr("class", d => `dot beeswarm-${metric} dot-${d.ZIPCODE} ${d.arrest.total == 0 ? 'zero' : d.arrest.total == 1 ? 'one' : 'more'}`)
    .attr("r", 3)
    .style('stroke', 'black')
    .style('fill', 'black')
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });
}

function tooltipChart(dataArray) {
  var miniW = document.querySelector(`.tt-line .tt-chart`).offsetWidth
  var miniH = 80
  var miniYMargin = 10
  var miniXMargin = 15
  var metric = 'arrest'
  var colorMax = -0.749023438
  var max = 0
  var domainMax2 = mapRadio() === 'yearly' ? 2022 : 2022 + (5 / 12)
  var monthsList = ["201701", "201702", "201703", "201704", "201705", "201706", "201707", "201708", "201709", "201710", "201711", "201712", "201801", "201802", "201803", "201804", "201805", "201806", "201807", "201808", "201809", "201810", "201811", "201812", "201901", "201902", "201903", "201904", "201905", "201906", "201907", "201908", "201909", "201910", "201911", "201912", "202001", "202002", "202003", "202004", "202005", "202006", "202007", "202008", "202009", "202010", "202011", "202012", "202101", "202102", "202103", "202104", "202105", "202106", "202107", "202108", "202109", "202110", "202111", "202112", "202201", "202202", "202203", "202204", "202205", "202206"]
  var domainMax1 = mapRadio() === 'yearly' ? monthsList.slice(0, monthsList.length - 5) : monthsList

  for (let i = 0; i < dataArray.length; i++) {
    max = dataArray[i]['val'] > max ? dataArray[i]['val'] : max
  }

  dataArray.forEach(d => d.key = d.key.replace('XX', '01'))
  // var miniColorScale = d3.scaleLinear()
  //   .domain([0, 916.625])
  //   .range(['#f6f7f6', '#b01116'])
  // .clamp(true)

  var xScaleMini = d3.scalePoint()
    .range([miniXMargin, miniW - miniXMargin])
    .domain(domainMax1)

  var xScaleMini2 = d3.scaleLinear()
    .range([miniXMargin, miniW - miniXMargin])
    .domain([2017, domainMax2])

  var yScaleMini = d3.scaleLinear()
    .domain([max, 0])
    .range([miniYMargin, miniH - miniYMargin])

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

  var miniSVG = d3.select(`.tt-line .tt-chart`)
    .html('')
    .append("svg")
    .attr("width", miniW)
    .attr("height", miniH);

  var miniG = miniSVG.append("g")
    .attr('class', 'minilines')

  var yRenderMini = miniG.append("g")
    .attr("transform", `translate(${miniXMargin},0)`)
    .attr('class', 'y-axis')
    .call(yAxisMini)
    .selectAll(".tick")
    .style('color', '#f3f3f3')
    .selectAll("text")
    .style('font-size', '5pt')
    .attr("transform", `translate(2,0)`)
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


  if (mapRadio() === 'yearly') {
    var solid = dataArray.slice(0, 5)
    var dotted = dataArray.slice(4, 6)

    miniSVG.selectAll('.minilines')
      .data([solid])
      .append("path")
      .attr("class", `line miniline-${metric}`)
      .attr("d", miniLine)
      .style('stroke', 'black')

    miniSVG.selectAll('.minilines')
      .data([dotted])
      .append("path")
      .attr("class", `line miniline-${metric}`)
      .attr("d", (d) => {
        return miniLine(d)
      })
      .style('stroke', 'black')
      .style('stroke-width', 2)
      .style('stroke-dasharray', '10,6')

  } else {
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
  }


  if (mapRadio() !== 'total') {
    var monthDatum = dataArray.filter((d) => {
      var monthVal = mapRadio() === 'yearly' ? '01' : month.value
      return d.key === year.value + monthVal
    })[0]

    var selectScale = mapRadio() === 'yearly' ? yearScale : monthScale

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
      .attr("r", 6)
      // .style('stroke', '#F7F9F7')
      .style('stroke', 'black')
      .style('fill', d => selectScale(d.val))
  }
}

var bisectDate = d3.bisector(function(d) {
  return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1]) - margin.left;
}).left

function mouseoverLine(data, index) {
  var x0 = d3.mouse(event.target)[0],
    i = bisectDate(data, x0, 1),
    xScaleYear = index == 2 ? xScale2 : index == 3 ? xScale3 : xScale4,
    xScaleMonth = index == 2 ? xScaleMonth2 : index == 3 ? xScaleMonth3 : xScaleMonth4,
    tipText = index == 2 ? tipTextLine2 : index == 3 ? tipTextLine3 : tipTextLine4

  var d0 = data[i - 1] !== 'dummy' ? data[i - 1] : data[i],
    d1 = i < data.length ? data[i] : data[i - 1]

  var d = (x0 + margin.left) - xScaleYear(d0.monthyear.split('/')[0]) + xScaleMonth(d0.monthyear.split('/')[1]) > xScaleYear(d1.monthyear.split('/')[0]) + xScaleMonth(d1.monthyear.split('/')[1]) - (x0 + margin.left) ? d1 : d0;
  var html = tipText(d)

  d3.selectAll(`#chart-${index} .dot`)
    .attr('r', 1)
    .lower()

  d3.selectAll(`#chart-${index} .dot.yr-${d.monthyear.replaceAll('/','')}`)
    .attr('r', 8)
    .raise()

  var boros = Object.keys(d).slice(1, 6)
  boros.sort((a, b) => {
    return parseInt(d[a]) - parseInt(d[b])
  })

  boros.forEach((i) => {
    d3.select(`#chart-${index} .dot.yr-${d.monthyear.replaceAll('/','')}.${i}`)
      .raise()
  })

  d3.select(`#tooltip-${index}`)
    .html(html)
    .attr('display', 'block')
    .style("visibility", "visible")
    .style('top', topTT(index))
    .style('left', leftTT(index))

  d3.select(`#tooltip-${index} .quit`)
    .on('click', () => {
      d3.selectAll(`#chart-${index} .dot`)
        .attr("r", 1)

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
    .attr('display', 'block')
    .style("visibility", "visible")

  if (i > 1) {
    d3.select(`#tooltip-${i}`)
      .html(html)
  }
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

    if (i > 1) {
      d3.select(`#tooltip-${i}`)
        .html('')
    }
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
  var cursorX = 25

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