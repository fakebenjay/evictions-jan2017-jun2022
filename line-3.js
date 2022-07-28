//Create svg3 element
var svg3 = d3.select("#chart-3 .chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var tooltip3 = d3.select("#chart-3")
  .append('div')
  .style('visibility', 'hidden')
  .attr('class', 'my-tooltip')
  .attr('id', 'tooltip-3')

var borosG3 = svg3.append('g')
  .attr('class', 'boros')
  .raise()
var citywideG3 = svg3.append('g')
  .attr('class', 'citywide')
  .raise()


// Add X scale
var xScale3 = d3.scaleLinear()
  .range([margin.left, width - margin.right])
  .domain([2017, 2022 + (5 / 12)])

var xScaleMonth3 = d3.scaleLinear()
  .range([0, xScale3(2018) - xScale3(2017)])
  .domain([1, 13])

// Define X axis
var xAxis3 = d3.axisBottom(xScale3)
  .ticks(5)
  .tickFormat(d => d)

// Add Y scale
var yScale3 = d3.scaleLinear()
  .domain([8000, 0])
  .range([0, height - (margin.top + margin.bottom)])

// Define Y axis and format tick marks
var yAxis3 = d3.axisLeft(yScale3)
  .ticks(6)
  .tickFormat(d => numeral(d).format('0,0'))

var yGrid3 = d3.axisLeft(yScale3)
  .tickSize(-width + margin.right + margin.left, 0, 0)
  .tickFormat("")
  .ticks(6)

// Add Y scale
var yScale3Citywide = d3.scaleLinear()
  .domain([21000, 0])
  .range([0, height - (margin.top + margin.bottom)])

// Define Y axis and format tick marks
var yAxis3Citywide = d3.axisLeft(yScale3Citywide)
  .ticks(6)
  .tickFormat(d => numeral(d).format('0,0'))

var yGrid3Citywide = d3.axisLeft(yScale3Citywide)
  .tickSize(-width + margin.right + margin.left, 0, 0)
  .tickFormat("")
  .ticks(10)

// Render Y grid
borosG3.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr("class", "grid")
  .style('color', '#777777')
  .style('opacity', '0.3')
  .call(yGrid3)

// Render Y axis
borosG3.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr('class', 'y-axis')
  .call(yAxis3)
  .selectAll("text")
  .style('font-size', () => {
    return window.innerWidth > 767 ? '9pt' : '8pt'
  })
  .attr("transform", "translate(-15,0)")
  .style("text-anchor", "middle")

// Render Y grid
citywideG3.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr("class", "grid")
  .style('color', '#777777')
  .style('opacity', '0.3')
  .call(yGrid3Citywide)

// Render Y axis
citywideG3.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)
  .attr('class', 'y-axis')
  .call(yAxis3Citywide)
  .selectAll("text")
  .style('font-size', () => {
    return window.innerWidth > 767 ? '9pt' : '8pt'
  })
  .attr("transform", "translate(-15,0)")
  .style("text-anchor", "middle")

//Render X axis
svg3.append("g")
  .attr("transform", `translate(0,${height-margin.bottom})`)
  .attr('class', 'x-axis')
  .style('color', 'black')
  .call(xAxis3)
  .selectAll(".tick text")
  .style('font-size', '10pt')
  .lower()

// Render lines g
var boroLinesG3 = borosG3.append("g")
  .attr('class', 'lines')

var citywideLinesG3 = citywideG3.append("g")
  .attr('class', 'lines')

svg3.append('rect')
  .attr('x', xScale3(2017))
  .attr('y', margin.top)
  .attr('width', xScale3(2018) - xScale3(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();

svg3.append('rect')
  .attr('x', xScale3(2019))
  .attr('y', margin.top)
  .attr('width', xScale3(2018) - xScale3(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();

svg3.append('rect')
  .attr('x', xScale3(2021))
  .attr('y', margin.top)
  .attr('width', xScale3(2018) - xScale3(2017))
  .attr('height', height - margin.top - margin.bottom)
  .attr('fill', 'white')
  .lower();


d3.csv("line3-data.csv")
  .then(function(csv) {
    var citywide = d3.line()
      .x(function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale3Citywide(Math.max.apply(Math, yScale3Citywide.domain()) - d.citywide);
      });

    var bronx = d3.line()
      .x(function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale3(Math.max.apply(Math, yScale3.domain()) - d.bronx);
      });

    var brooklyn = d3.line()
      .x(function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale3(Math.max.apply(Math, yScale3.domain()) - d.brooklyn);
      });

    var manhattan = d3.line()
      .x(function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale3(Math.max.apply(Math, yScale3.domain()) - d.manhattan);
      });

    var queens = d3.line()
      .x(function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale3(Math.max.apply(Math, yScale3.domain()) - d.queens);
      });

    var staten = d3.line()
      .x(function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .y(function(d) {
        return (height - margin.bottom) - yScale3(Math.max.apply(Math, yScale3.domain()) - d.staten);
      });

    citywideG3.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line citywide")
      .attr("d", (d) => {
        return citywide(d)
      })
      .style('stroke', '#132a43')

    borosG3.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line bronx")
      .attr("d", (d) => {
        return bronx(d)
      })
      .style('stroke', '#6BA292')

    borosG3.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line brooklyn")
      .attr("d", (d) => {
        return brooklyn(d)
      })
      .style('stroke', '#ED6A5A')

    borosG3.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line manhattan")
      .attr("d", (d) => {
        return manhattan(d)
      })
      .style('stroke', '#F9C80E')

    borosG3.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line queens")
      .attr("d", (d) => {
        return queens(d)
      })
      .style('stroke', '#654f6f')

    borosG3.select('.lines')
      .data([csv])
      .append("path")
      .attr("class", "line staten")
      .attr("d", (d) => {
        return staten(d)
      })
      .style('stroke', '#56A9DE')

    csv.unshift('dummy')

    citywideG3.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction citywide yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale3Citywide(Math.max.apply(Math, yScale3Citywide.domain()) - d.citywide);
      })
      .attr("cx", function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#132a43')
      .style('stroke-width', 0)

    borosG3.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction bronx yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale3(Math.max.apply(Math, yScale3.domain()) - d.bronx);
      })
      .attr("cx", function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#6BA292')
      .style('stroke-width', 0)

    borosG3.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction brooklyn yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale3(Math.max.apply(Math, yScale3.domain()) - d.brooklyn);
      })
      .attr("cx", function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#ED6A5A')
      .style('stroke-width', 0)

    borosG3.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction manhattan yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale3(Math.max.apply(Math, yScale3.domain()) - d.manhattan);
      })
      .attr("cx", function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#F9C80E')
      .style('stroke-width', 0)

    borosG3.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction queens yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale3(Math.max.apply(Math, yScale3.domain()) - d.queens);
      })
      .attr("cx", function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#654f6f')
      .style('stroke-width', 0)

    borosG3.selectAll(".lines")
      .data(csv)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("class", d => `dot eviction staten yr-${d.monthyear.replaceAll('/', '')}`) // Assign a class for styling
      .attr("cy", function(d) {
        return (height - margin.bottom) - yScale3(Math.max.apply(Math, yScale3.domain()) - d.staten);
      })
      .attr("cx", function(d) {
        return xScale3(d.monthyear.split('/')[0]) + xScaleMonth3(d.monthyear.split('/')[1])
      })
      .attr("r", 1)
      .style('fill', '#56A9DE')
      .style('stroke-width', 0)

    svg3.append("rect")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("class", "hover-overlay")
      .attr("width", width - margin.right - margin.left)
      .attr("height", height - margin.bottom - margin.top)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .data([csv])
      .on("mouseover mousemove touchstart touchmove", function(d) {
        return mouseoverLine(d, 3)
      })
      .on("mouseout", () => {
        return mouseout(3)
      });

    // svg3.selectAll('.line')
    //   .raise()

    svg3.selectAll('.dot')
      .lower()

    d3.selectAll('.hover-overlay')
      .raise()

    borosG3.raise()
    citywideG3.raise()

    d3.select('#chart-3 fieldset')
      .on('change', () => {
        return radio(3)
      })
  })
  .then(() => {
    radio(3)
  })