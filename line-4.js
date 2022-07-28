//Create svg4 element
var svg4 = d3.select("#chart-4 .chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var tooltip4 = d3.select("#chart-4")
  .append('div')
  .style('visibility', 'hidden')
  .attr('class', 'my-tooltip')
  .attr('id', 'tooltip-4')

var borosG4 = svg4.append('g')
  .attr('class', 'boros')
  .raise()
var citywideG4 = svg4.append('g')
  .attr('class', 'citywide')
  .raise()


// Add X scale
var xScale4 = d3.scaleLinear()
  .range([margin.left, width - margin.right])
  .domain([2017, 2022 + (5 / 12)])

var xScaleMonth4 = d3.scaleLinear()
  .range([0, xScale4(2018) - xScale4(2017)])
  .domain([1, 13])

// Define X axis
var xAxis4 = d3.axisBottom(xScale4)
  .ticks(5)
  .tickFormat(d => d)

// Add Y scale
var yScale4 = d3.scaleLinear()
  .domain([5000, 0])
  .range([0, height - (margin.top + margin.bottom)])

// Define Y axis and format tick marks
var yAxis4 = d3.axisLeft(yScale4)
  .ticks(6)
  .tickFormat(d => numeral(d).format('0,0'))

var yGrid4 = d3.axisLeft(yScale4)
  .tickSize(-width + margin.right + margin.left, 0, 0)
  .tickFormat("")
  .ticks(10)

// Add Y scale
var yScale4Citywide = d3.scaleLinear()
  .domain([11000, 0])
  .range([0, height - (margin.top + margin.bottom)])

// Define Y axis and format tick marks
var yAxis4Citywide = d3.axisLeft(yScale4Citywide)
  .ticks(6)
  .tickFormat(d => numeral(d).format('0,0'))

var yGrid4Citywide = d3.axisLeft(yScale4Citywide)
  .tickSize(-width + margin.right + margin.left, 0, 0)
  .tickFormat("")
  .ticks(10)

// Render Y grid
borosG4.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr("class", "grid")
  .style('color', '#777777')
  .style('opacity', '0.3')
  .call(yGrid4)

// Render Y axis
borosG4.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr('class', 'y-axis')
  .call(yAxis4)
  .selectAll("text")
  .style('font-size', () => {
    return window.innerWidth > 767 ? '9pt' : '8pt'
  })
  .attr("transform", "translate(-15,0)")
  .style("text-anchor", "middle")

// Render Y grid
citywideG4.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr("class", "grid")
  .style('color', '#777777')
  .style('opacity', '0.3')
  .call(yGrid4Citywide)

// Render Y axis
citywideG4.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr('class', 'y-axis')
  .call(yAxis4Citywide)
  .selectAll("text")
  .style('font-size', () => {
    return window.innerWidth > 767 ? '9pt' : '8pt'
  })
  .attr("transform", "translate(-15,0)")
  .style("text-anchor", "middle")

//Render X axis
svg4.append("g")
  .attr("transform", `translate(0,${height-margin.bottom})`)
  .attr('class', 'x-axis')
  .style('color', 'black')
  .call(xAxis4)
  .selectAll(".tick text")
  .style('font-size', '10pt')
  .lower()

// Render lines g
var boroLinesG4 = borosG4.append("g")
  .attr('class', 'lines')

var citywideLinesG4 = citywideG4.append("g")
  .attr('class', 'lines')

svg4.append('rect')
  .attr('x', xScale4(2017))
  .attr('y', margin.top)
  .attr('width', xScale4(2018) - xScale4(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();

svg4.append('rect')
  .attr('x', xScale4(2019))
  .attr('y', margin.top)
  .attr('width', xScale4(2018) - xScale4(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();

svg4.append('rect')
  .attr('x', xScale4(2021))
  .attr('y', margin.top)
  .attr('width', xScale4(2018) - xScale4(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();


d3.csv("line4-data.csv")
  .then(function(csv) {
    var citywide = d3.line()
      .x(function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale4Citywide(Math.max.apply(Math, yScale4Citywide.domain()) - d.citywide);
      });

    var bronx = d3.line()
      .x(function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale4(Math.max.apply(Math, yScale4.domain()) - d.bronx);
      });

    var brooklyn = d3.line()
      .x(function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale4(Math.max.apply(Math, yScale4.domain()) - d.brooklyn);
      });

    var manhattan = d3.line()
      .x(function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale4(Math.max.apply(Math, yScale4.domain()) - d.manhattan);
      });

    var queens = d3.line()
      .x(function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale4(Math.max.apply(Math, yScale4.domain()) - d.queens);
      });

    var staten = d3.line()
      .x(function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale4(Math.max.apply(Math, yScale4.domain()) - d.staten);
      });

    citywideG4.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line citywide")
      .attr("d", (d) => {
        return citywide(d)
      })
      .style('stroke', '#132a43')

    borosG4.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line bronx")
      .attr("d", (d) => {
        return bronx(d)
      })
      .style('stroke', '#6BA292')

    borosG4.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line brooklyn")
      .attr("d", (d) => {
        return brooklyn(d)
      })
      .style('stroke', '#ED6A5A')

    borosG4.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line manhattan")
      .attr("d", (d) => {
        return manhattan(d)
      })
      .style('stroke', '#F9C80E')

    borosG4.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line queens")
      .attr("d", (d) => {
        return queens(d)
      })
      .style('stroke', '#654f6f')

    borosG4.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line staten")
      .attr("d", (d) => {
        return staten(d)
      })
      .style('stroke', '#56A9DE')

    csv.unshift('dummy')

    citywideG4.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction citywide yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale4Citywide(Math.max.apply(Math, yScale4Citywide.domain()) - d.citywide);
      })
      .attr("cx", function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#132a43')
      .style('stroke-width', 0)

    borosG4.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction bronx yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale4(Math.max.apply(Math, yScale4.domain()) - d.bronx);
      })
      .attr("cx", function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#6BA292')
      .style('stroke-width', 0)

    borosG4.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction brooklyn yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale4(Math.max.apply(Math, yScale4.domain()) - d.brooklyn);
      })
      .attr("cx", function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#ED6A5A')
      .style('stroke-width', 0)

    borosG4.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction manhattan yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale4(Math.max.apply(Math, yScale4.domain()) - d.manhattan);
      })
      .attr("cx", function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#F9C80E')
      .style('stroke-width', 0)

    borosG4.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction queens yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale4(Math.max.apply(Math, yScale4.domain()) - d.queens);
      })
      .attr("cx", function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#654f6f')
      .style('stroke-width', 0)

    borosG4.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction staten yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale4(Math.max.apply(Math, yScale4.domain()) - d.staten);
      })
      .attr("cx", function(d) {
        return xScale4(d.monthyear.split('/')[0]) + xScaleMonth4(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#56A9DE')
      .style('stroke-width', 0)

    svg4.append("rect")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("class", "hover-overlay")
      .attr("width", width - margin.right - margin.left)
      .attr("height", height - margin.bottom - margin.top)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .data([csv])
      .on("mouseover mousemove touchstart touchmove", function(d) {
        return mouseoverLine(d, 4)
      })
      .on("mouseout", () => {
        return mouseout(4)
      });

    // svg4.selectAll('.line')
    //   .raise()

    svg4.selectAll('.dot')
      .lower()

    d3.selectAll('.hover-overlay')
      .raise()

    borosG4.raise()
    citywideG4.raise()

    d3.select('#chart-4 fieldset')
      .on('change', () => {
        return radio(4)
      })
  })
  .then(() => {
    radio(4)
  })