//Create SVG element
var chartWidth = document.getElementById('chart-3').offsetWidth
var svg3 = d3.select("#chart-3 .chart")
  .append("svg")
  .attr("width", chartWidth)
  .attr("height", height);

var marginLeft = 45

// Add Y scale
var yScale3 = d3.scaleLinear()
  .domain([4000, 0])
  .range([0, height - (margin.top + margin.bottom)])

// Define Y axis and format tick marks
var yAxis3 = d3.axisLeft(yScale3)
  .ticks(5)

var yGrid3 = d3.axisLeft(yScale3)
  .tickSize(-chartWidth + margin.right + marginLeft, 0, 0)
  .tickFormat("")
  .ticks(tickNums)

// Render Y grid
svg3.append("g")
  .attr("transform", `translate(${marginLeft},${margin.top})`)
  .attr("class", "grid")
  .style('color', 'white')
  .style('opacity', '0.3')
  .call(yGrid3)

// Add X scale
var xScale3 = d3.scaleBand()
  .range([marginLeft, chartWidth - margin.right])
  .domain(['2018 Q2', '2021 Q1'])
  .padding(.1)

// Define X axis
var xAxis3 = d3.axisBottom(xScale3)

var colorScale3 = d3.scaleOrdinal()
  .range(['#27a027', '#d5563a', '#F9C80E', '#6ba292', '#0072dc', '#707C9C'])
  .domain(['black', 'hispanic', 'white', 'amerindian', 'aapi', 'unknownOther'])

d3.csv('https://assets.law360news.com/1390000/1390755/pieces-bar.csv')
  .then(function(data3) {
    svg3.selectAll("bars")
      .data(data3)
      .enter()
      .append("rect")
      .attr('class', (d) => `bar ${d.race} quarter-${d.quarter.replaceAll(' ', '-').toLowerCase()}`)
      .attr('width', xScale3.bandwidth())
      .attr("y", function(d) {
        return (height - margin.bottom) - yScale3(d.offset);
      })
      .attr("x", function(d) {
        return xScale3(d.quarter)
      })
      .attr("height", function(d) {
        return yScale3(4000 - d.val);
      })
      .attr("fill", d => colorScale3(d.race))

    svg3.append("text")
      .attr('width', xScale3.bandwidth())
      .attr('class', `bar-label total quarter-2018-q2`)
      .attr("y", height - margin.bottom - yScale3(4000 - 3506) - 5)
      .attr("x", xScale3('2018 Q2') + xScale3.bandwidth() / 2)
      .text('3,506')
      .style("text-anchor", "middle")
      .style('fill', 'white')
      .style('font-weight', '900')
      .style('font-size', '14pt')

    svg3.append("text")
      .attr('width', xScale3.bandwidth())
      .attr('class', `bar-label total quarter-2021-q1`)
      .attr("y", height - margin.bottom - yScale3(4000 - 3687) - 5)
      .attr("x", xScale3('2021 Q1') + xScale3.bandwidth() / 2)
      .text('3,687')
      .style("text-anchor", "middle")
      .style('fill', 'white')
      .style('font-weight', '900')
      .style('font-size', '14pt')

    svg3.selectAll("bars")
      .data(data3)
      .enter()
      .append("text")
      .style('font-weight', '900')
      .attr('class', (d) => `bar-label ${d.race} quarter-${d.quarter.replaceAll(' ', '-').toLowerCase()}`)
      .attr('width', xScale3.bandwidth())
      .attr("y", function(d) {
        return (height - margin.bottom) - yScale3(parseInt(d.offset) + parseInt(d.val / 2)) - 3;
      })
      .attr("x", function(d) {
        return xScale3(d.quarter) + xScale3.bandwidth() / 2
      })
      .text((d) => {
        if ((d.race === 'black' || d.race === 'hispanic') || (d.race === 'white' && d.quarter === '2018 Q2')) {
          return `${numeral(d.val).format('0,0')} summonses`
        }
      })
      .style('display', (d) => {
        if (d.race === 'black' && d.race === 'hispanic' && !(d.race === 'white' && d.quarter === '2018 Q2')) {
          return 'none'
        }
      })
      .style('fill', d => d.race === 'white' ? 'black' : 'white')
      .style("text-anchor", "middle")

    svg3.selectAll("bars")
      .data(data3)
      .enter()
      .append("text")
      .attr('class', (d) => `bar-label ${d.race} quarter-${d.quarter.replaceAll(' ', '-').toLowerCase()}`)
      .attr('width', xScale3.bandwidth())
      .attr("y", function(d) {
        return ((height - margin.bottom) - yScale3(parseInt(d.offset) + parseInt(d.val / 2))) + 10;
      })
      .attr("x", function(d) {
        return (xScale3(d.quarter) + xScale3.bandwidth() / 2)
      })
      .text((d) => {
        var total = d.quarter === '2018 Q2' ? 3506 : 3687
        if ((d.race === 'black' || d.race === 'hispanic') || (d.race === 'white' && d.quarter === '2018 Q2')) {
          return `(${numeral(d.val/total).format('0,0%')} of total)`
        }
      })
      .style('display', (d) => {
        if (d.race === 'black' && d.race === 'hispanic' && !(d.race === 'white' && d.quarter === '2018 Q2')) {
          return 'none'
        }
      })
      .style('fill', d => d.race === 'white' ? 'black' : 'white')
      .style("text-anchor", "middle")


    // Render Y axis
    svg3.append("g")
      .attr("transform", `translate(${marginLeft}, ${margin.top})`)
      .attr('class', 'y-axis')
      .call(yAxis3)
      .style('color', 'white')
      .selectAll("text")
      .attr("transform", "translate(0,0)")
      .style("text-anchor", "end")

    //Render X axis
    svg3.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .attr('class', 'x-axis')
      .style('color', 'white')
      .call(xAxis3)
      .selectAll("text")
      .style('font-size', '11pt')
      .data(data3)
  })