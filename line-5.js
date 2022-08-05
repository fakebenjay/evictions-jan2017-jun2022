//Create svg5 element
var svg5 = d3.select("#chart-5 .chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var tooltip5 = d3.select("#chart-5")
  .append('div')
  .style('visibility', 'hidden')
  .attr('class', 'my-tooltip')
  .attr('id', 'tooltip-5')

var citywideG5 = svg5.append('g')
  .attr('class', 'citywide')
  .raise()

// Add X scale
var xScale5 = d3.scaleLinear()
  .range([margin.left, width - margin.right])
  .domain([2017, 2022 + (6 / 12)])

var xScaleMonth5 = d3.scaleLinear()
  .range([0, xScale5(2018) - xScale5(2017)])
  .domain([1, 13])

// Define X axis
var xAxis5 = d3.axisBottom(xScale5)
  .ticks(5)
  .tickFormat(d => d)

// Add Y scale
var yScale5Citywide = d3.scaleLinear()
  .domain([21000, 0])
  .range([0, height - (margin.top + margin.bottom)])

// Define Y axis and format tick marks
var yAxis5Citywide = d3.axisLeft(yScale5Citywide)
  .ticks(6)
  .tickFormat(d => numeral(d).format('0,0'))

var yGrid5Citywide = d3.axisLeft(yScale5Citywide)
  .tickSize(-width + margin.right + margin.left, 0, 0)
  .tickFormat("")
  .ticks(10)

// Render Y grid
citywideG5.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr("class", "grid")
  .style('color', '#777777')
  .style('opacity', '0.3')
  .style('pointer-events', 'none')
  .call(yGrid5Citywide)

// Render Y axis
citywideG5.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr('class', 'y-axis')
  .call(yAxis5Citywide)
  .selectAll("text")
  .style('font-size', () => {
    return window.innerWidth > 767 ? '9pt' : '8pt'
  })
  .attr("transform", "translate(-15,0)")
  .style("text-anchor", "middle")

//Render X axis
svg5.append("g")
  .attr("transform", `translate(0,${height-margin.bottom})`)
  .attr('class', 'x-axis')
  .style('color', 'black')
  .call(xAxis5)
  .selectAll(".tick text")
  .style('font-size', '10pt')
  .lower()

// Render lines g
var citywideLinesG5 = citywideG5.append("g")
  .attr('class', 'lines')

svg5.append('rect')
  .attr('x', xScale5(2017))
  .attr('y', margin.top)
  .attr('width', xScale5(2018) - xScale5(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();

svg5.append('rect')
  .attr('x', xScale5(2019))
  .attr('y', margin.top)
  .attr('width', xScale5(2018) - xScale5(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();

svg5.append('rect')
  .attr('x', xScale5(2021))
  .attr('y', margin.top)
  .attr('width', xScale5(2018) - xScale5(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();


d3.csv("line5-data.csv")
  .then(function(csv) {
    var executed = d3.line()
      .x(function(d) {
        return xScale5(d.monthyear.split('/')[0]) + xScaleMonth5(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale5Citywide(Math.max.apply(Math, yScale5Citywide.domain()) - d.executed);
      });

    var warrants = d3.line()
      .x(function(d) {
        return xScale5(d.monthyear.split('/')[0]) + xScaleMonth5(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale5Citywide(Math.max.apply(Math, yScale5Citywide.domain()) - d.warrants);
      });

    var filings = d3.line()
      .x(function(d) {
        return xScale5(d.monthyear.split('/')[0]) + xScaleMonth5(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale5Citywide(Math.max.apply(Math, yScale5Citywide.domain()) - d.filings);
      });

    citywideG5.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line executed")
      .attr("d", (d) => {
        return executed(d)
      })
      .style('stroke', '#ed6a5a')

    citywideG5.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line filings")
      .attr("d", (d) => {
        return filings(d)
      })
      .style('stroke', '#6ba292')

    citywideG5.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line warrants")
      .attr("d", (d) => {
        return warrants(d)
      })
      .style('stroke', '#654f6f')

    csv.unshift('dummy')

    citywideG5.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction executed yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale5Citywide(Math.max.apply(Math, yScale5Citywide.domain()) - d.executed);
      })
      .attr("cx", function(d) {
        return xScale5(d.monthyear.split('/')[0]) + xScaleMonth5(d.monthyear.split('/')[1])
      })
      .attr("r", 1.5)
      .style('fill', '#ed6a5a')
      .style('stroke-width', 0)

    citywideG5.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction warrants yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale5Citywide(Math.max.apply(Math, yScale5Citywide.domain()) - d.warrants);
      })
      .attr("cx", function(d) {
        return xScale5(d.monthyear.split('/')[0]) + xScaleMonth5(d.monthyear.split('/')[1])
      })
      .attr("r", 1.5)
      .style('fill', '#654f6f')
      .style('stroke-width', 0)

    citywideG5.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction filings yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale5Citywide(Math.max.apply(Math, yScale5Citywide.domain()) - d.filings);
      })
      .attr("cx", function(d) {
        return xScale5(d.monthyear.split('/')[0]) + xScaleMonth5(d.monthyear.split('/')[1])
      })
      .attr("r", 1.5)
      .style('fill', '#6ba292')
      .style('stroke-width', 0)

    svg5.append("rect")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("class", "hover-overlay")
      .attr("width", width - margin.right - margin.left)
      .attr("height", height - margin.bottom - margin.top)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .data([csv])
      .on("mouseover mousemove touchstart touchmove", function(d) {
        return mouseoverLine(d, 5)
      })
      .on("mouseout", () => {
        return mouseout(5)
      });

    // svg5.selectAll('.line')
    //   .raise()

    svg5.selectAll('.dot')
      .lower()

    d3.selectAll('.hover-overlay')
      .raise()

    citywideG5.raise()
  })