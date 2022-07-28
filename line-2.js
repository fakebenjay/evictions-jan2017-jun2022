//Create svg2 element
var svg2 = d3.select("#chart-2 .chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var tooltip2 = d3.select("#chart-2")
  .append('div')
  .style('visibility', 'hidden')
  .attr('class', 'my-tooltip')
  .attr('id', 'tooltip-2')

var borosG2 = svg2.append('g')
  .attr('class', 'boros')
  .raise()
var citywideG2 = svg2.append('g')
  .attr('class', 'citywide')
  .raise()

// Add X scale
var xScale2 = d3.scaleLinear()
  .range([margin.left, width - margin.right])
  .domain([2017, 2022 + (5 / 12)])

var xScaleMonth2 = d3.scaleLinear()
  .range([0, xScale2(2018) - xScale2(2017)])
  .domain([1, 13])

// Define X axis
var xAxis2 = d3.axisBottom(xScale2)
  .ticks(5)
  .tickFormat(d => d)

// Add Y scale
var yScale2 = d3.scaleLinear()
  .domain([800, 0])
  .range([0, height - (margin.top + margin.bottom)])

// Define Y axis and format tick marks
var yAxis2 = d3.axisLeft(yScale2)
  .ticks(6)
  .tickFormat(d => d)

var yGrid2 = d3.axisLeft(yScale2)
  .tickSize(-width + margin.right + margin.left, 0, 0)
  .tickFormat("")
  .ticks(6)

// Add Y scale
var yScale2Citywide = d3.scaleLinear()
  .domain([2000, 0])
  .range([0, height - (margin.top + margin.bottom)])

// Define Y axis and format tick marks
var yAxis2Citywide = d3.axisLeft(yScale2Citywide)
  .ticks(6)
  .tickFormat(d => numeral(d).format('0,0'))

var yGrid2Citywide = d3.axisLeft(yScale2Citywide)
  .tickSize(-width + margin.right + margin.left, 0, 0)
  .tickFormat("")
  .ticks(10)

// Render Y grid
borosG2.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr("class", "grid")
  .style('color', '#777777')
  .style('opacity', '0.3')
  .call(yGrid2)

// Render Y axis
borosG2.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr('class', 'y-axis')
  .call(yAxis2)
  .selectAll("text")
  .style('font-size', () => {
    return window.innerWidth > 767 ? '9pt' : '8pt'
  })
  .attr("transform", "translate(-15,0)")
  .style("text-anchor", "middle")

// Render Y grid
citywideG2.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr("class", "grid")
  .style('color', '#777777')
  .style('opacity', '0.3')
  .call(yGrid2Citywide)

// Render Y axis
citywideG2.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr('class', 'y-axis')
  .call(yAxis2Citywide)
  .selectAll("text")
  .style('font-size', () => {
    return window.innerWidth > 767 ? '9pt' : '8pt'
  })
  .attr("transform", "translate(-15,0)")
  .style("text-anchor", "middle")

//Render X axis
svg2.append("g")
  .attr("transform", `translate(0,${height-margin.bottom})`)
  .attr('class', 'x-axis')
  .style('color', 'black')
  .call(xAxis2)
  .selectAll(".tick text")
  .style('font-size', '10pt')
  .lower()

// Render lines g
var boroLinesG2 = borosG2.append("g")
  .attr('class', 'lines')

var citywideLinesG2 = citywideG2.append("g")
  .attr('class', 'lines')

svg2.append('rect')
  .attr('x', xScale2(2017))
  .attr('y', margin.top)
  .attr('width', xScale2(2018) - xScale2(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();

svg2.append('rect')
  .attr('x', xScale2(2019))
  .attr('y', margin.top)
  .attr('width', xScale2(2018) - xScale2(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();

svg2.append('rect')
  .attr('x', xScale2(2021))
  .attr('y', margin.top)
  .attr('width', xScale2(2018) - xScale2(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();


d3.csv("line2-data-nodupes.csv")
  .then(function(csv) {
    var citywide = d3.line()
      .x(function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale2Citywide(Math.max.apply(Math, yScale2Citywide.domain()) - d.citywide);
      });

    var bronx = d3.line()
      .x(function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale2(Math.max.apply(Math, yScale2.domain()) - d.bronx);
      });

    var brooklyn = d3.line()
      .x(function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale2(Math.max.apply(Math, yScale2.domain()) - d.brooklyn);
      });

    var manhattan = d3.line()
      .x(function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale2(Math.max.apply(Math, yScale2.domain()) - d.manhattan);
      });

    var queens = d3.line()
      .x(function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale2(Math.max.apply(Math, yScale2.domain()) - d.queens);
      });

    var staten = d3.line()
      .x(function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale2(Math.max.apply(Math, yScale2.domain()) - d.staten);
      });

    citywideG2.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line citywide")
      .attr("d", (d) => {
        return citywide(d)
      })
      .style('stroke', '#132a43')

    borosG2.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line bronx")
      .attr("d", (d) => {
        return bronx(d)
      })
      .style('stroke', '#6BA292')

    borosG2.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line brooklyn")
      .attr("d", (d) => {
        return brooklyn(d)
      })
      .style('stroke', '#ED6A5A')

    borosG2.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line manhattan")
      .attr("d", (d) => {
        return manhattan(d)
      })
      .style('stroke', '#F9C80E')

    borosG2.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line queens")
      .attr("d", (d) => {
        return queens(d)
      })
      .style('stroke', '#654f6f')

    borosG2.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line staten")
      .attr("d", (d) => {
        return staten(d)
      })
      .style('stroke', '#56A9DE')

    csv.unshift('dummy')

    citywideG2.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction citywide yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale2Citywide(Math.max.apply(Math, yScale2Citywide.domain()) - d.citywide);
      })
      .attr("cx", function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#132a43')
      .style('stroke-width', 0)

    borosG2.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction bronx yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale2(Math.max.apply(Math, yScale2.domain()) - d.bronx);
      })
      .attr("cx", function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#6BA292')
      .style('stroke-width', 0)

    borosG2.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction brooklyn yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale2(Math.max.apply(Math, yScale2.domain()) - d.brooklyn);
      })
      .attr("cx", function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#ED6A5A')
      .style('stroke-width', 0)

    borosG2.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction manhattan yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale2(Math.max.apply(Math, yScale2.domain()) - d.manhattan);
      })
      .attr("cx", function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#F9C80E')
      .style('stroke-width', 0)

    borosG2.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction queens yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale2(Math.max.apply(Math, yScale2.domain()) - d.queens);
      })
      .attr("cx", function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#654f6f')
      .style('stroke-width', 0)

    borosG2.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction staten yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale2(Math.max.apply(Math, yScale2.domain()) - d.staten);
      })
      .attr("cx", function(d) {
        return xScale2(d.monthyear.split('/')[0]) + xScaleMonth2(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#56A9DE')
      .style('stroke-width', 0)

    svg2.append("rect")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("class", "hover-overlay")
      .attr("width", width - margin.right - margin.left)
      .attr("height", height - margin.bottom - margin.top)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .data([csv])
      .on("mouseover mousemove touchstart touchmove", function(d) {
        return mouseoverLine(d, 2)
      })
      .on("mouseout", () => {
        return mouseout(2)
      });

    // svg2.selectAll('.line')
    //   .raise()

    svg2.selectAll('.dot')
      .lower()

    d3.selectAll('.hover-overlay')
      .raise()

    borosG2.raise()
    citywideG2.raise()

    d3.select('#chart-2 fieldset')
      .on('change', () => {
        return radio(2)
      })
  })
  .then(() => {
    radio(2)
  })