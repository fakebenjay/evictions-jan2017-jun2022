//Create SVG element
var svg1 = d3.select("#chart-1 .chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var tooltip2 = d3.select("#chart-1")
  .append('div')
  .style('visibility', 'hidden')
  .attr('class', 'my-tooltip')
  .attr('id', 'tooltip-1')

// Add Y scale
var yScale = d3.scaleLinear()
  .domain([4500, 0])
  .range([0, height - (margin.top + margin.bottom)])

// Define Y axis and format tick marks
var yAxis = d3.axisLeft(yScale)

var yGrid = d3.axisLeft(yScale)
  .tickSize(-width + margin.right + margin.left, 0, 0)
  .tickFormat("")

// Render Y axis
svg1.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr('class', 'y-axis')
  .call(yAxis)
  .style('color', 'white')
  .selectAll("text")
  .attr("transform", "translate(-10,0)")
  .style("text-anchor", "middle")

// Render Y grid
svg1.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr("class", "grid")
  .style('color', '#777777')
  .style('opacity', '0.3')
  .call(yGrid)

// Render lines g
var linesG = svg1.append("g")
  .attr('class', 'lines')

// Add X scale
var xScale = d3.scalePoint()
  .range([margin.left, width - margin.right])
  .domain(['2018 Q2', '2018 Q3', '2018 Q4', '2019 Q1', '2019 Q2', '2019 Q3', '2019 Q4', '2020 Q1', '2020 Q2', '2020 Q3', '2020 Q4', '2021 Q1'])

// Define X axis
var xAxis = d3.axisBottom(xScale)
  .tickFormat(d => d.slice(d.length - 2))

//Render X axis
svg1.append("g")
  .attr("transform", `translate(0,${height-margin.bottom})`)
  .attr('class', 'x-axis')
  .style('color', 'white')
  .call(xAxis)
  .selectAll(".tick text")
  .style('fill', (d) => {
    return d.includes('2018') || d.includes('2020') ? '#999' : 'white'
  })
  .raise()

d3.csv("https://assets.law360news.com/1390000/1390755/total-data.csv")
  .then(function(csv) {
    svg1.append('path')
      .attr('class', `pandemic-line`)
      .attr('d', d3.line()([
        [xScale('2020 Q2') - (xScale('2018 Q2') / 3), yScale(4500) + margin.top],
        [xScale('2020 Q2') - (xScale('2018 Q2') / 3), yScale(0) + margin.top]
      ]))
      .attr('stroke-width', 2)
      .style('opacity', 1)
      .style('stroke', '#F9C80E')

    svg1.append('text')
      .attr('class', 'pandemic-label')
      .attr('x', xScale('2020 Q2') - (xScale('2018 Q2') / 3) + 5)
      .attr('y', yScale(4000))
      .text('Start of')
      .style('font-size', '10pt')
      .style('fill', '#F9C80E')

    svg1.append('text')
      .attr('class', 'pandemic-label')
      .attr('x', xScale('2020 Q2') - (xScale('2018 Q2') / 3) + 5)
      .attr('y', yScale(3750))
      .text('pandemic')
      .style('font-size', '10pt')
      .style('fill', '#F9C80E')

    var arrest = d3.line()
      .x(function(d) {
        return xScale(`${d.year} Q${d.quarter}`)
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale(4500 - d.arrest);
      });

    var summons = d3.line()
      .x(function(d) {
        return xScale(`${d.year} Q${d.quarter}`)
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale(4500 - d.summons);
      });

    svg1.selectAll('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line arrest")
      .attr("d", (d) => {
        return arrest(d)
      })
      .style('stroke', '#B01116')

    svg1.selectAll('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line summons")
      .attr("d", (d) => {
        return summons(d)
      })
      .style('stroke', '#D7D9D7');

    csv.unshift('dummy')

    svg1.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot arrest yr-${d.year}-q${d.quarter}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale(4500 - d.arrest);
      })
      .attr("cx", function(d) {
        return xScale(`${d.year} Q${d.quarter}`)
      })
      .attr("r", 3)
      .style('fill', '#B01116')

    svg1.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot summons yr-${d.year}-q${d.quarter}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale(4500 - d.summons);
      })
      .attr("cx", function(d) {
        return xScale(`${d.year} Q${d.quarter}`)
      })
      .attr("r", 3)
      .style('fill', '#F7F9F7')
      .style('stroke', 'black')

    svg1.append("rect")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("class", "hover-overlay")
      .attr("width", width - margin.right - margin.left)
      .attr("height", height - margin.bottom - margin.top)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .data([csv])
      .on("mouseover mousemove touchstart touchmove", function(d) {
        return mouseoverLine(d, 1)
      })
      .on("mouseout", function(d) {
        return mouseout(1)
      });

    d3.selectAll('.hover-overlay')
      .raise()

    linesG.raise()

    d3.selectAll('circle')
      .raise()
  })

d3.selectAll('.years')
  .style('margin', `0 ${margin.right}px 10px 0`)

d3.selectAll('.year-2018')
  .style('padding', `0 0 0 11%`)

d3.selectAll('.year-2019')
  .style('padding', `0 0 0 29%`)

d3.selectAll('.year-2020')
  .style('padding', `0 0 0 32%`)

d3.selectAll('.year-2021')
  .style('padding', `0 0 0 17%`)