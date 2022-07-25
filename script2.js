var rawWidth = document.getElementById('article-body').offsetWidth
var w = rawWidth;
var h = rawWidth * (3 / 5);
//Define map projection
var projection = d3.geoMercator()
  .center([-74.0060, 40.7128])
  .translate([(w / 2), (h / 2.06)])
  .scale([w * 62]);
//Define path generator
var path = d3.geoPath()
  .projection(projection);
//Create SVG element
var svg2 = d3.select("#chart-2 .chart")
  .append("svg")
  .attr("width", w)
  .attr("height", h);
var tooltip2 = d3.select("#chart-2")
  .append('div')
  .style('visibility', 'hidden')
  .attr('class', 'my-tooltip')
  .attr('id', 'tooltip-2')

var arrestSubset
var arrestScale
var selectedPrecinct = '1'

function dynamicSelect(year, month) {
  document.querySelectorAll('option').forEach(d => d.style.display = 'block')
  document.querySelectorAll('option').forEach(d => d.disabled = false)
  if (year == 2022) {
    // if (month !== '06') {
    //   document.querySelector("option[value='06']").selected = true
    // }
    document.querySelector("option[value='07']").disabled = true
    document.querySelector("option[value='08']").disabled = true
    document.querySelector("option[value='09']").disabled = true
    document.querySelector("option[value='10']").disabled = true
    document.querySelector("option[value='11']").disabled = true
    document.querySelector("option[value='12']").disabled = true
    document.querySelector("option[value='07']").style.display = 'none'
    document.querySelector("option[value='08']").style.display = 'none'
    document.querySelector("option[value='09']").style.display = 'none'
    document.querySelector("option[value='10']").style.display = 'none'
    document.querySelector("option[value='11']").style.display = 'none'
    document.querySelector("option[value='12']").style.display = 'none'
  }

  if (month > 6) {
    document.querySelector("option[value='2022']").disabled = true
    document.querySelector("option[value='2022']").style.display = 'none'
  }
}

//Load in GeoJSON data
d3.json("zcta-refined.json")
  .then(function(json) {
    var radio = 'arrest'

    var year = document.getElementById('year').value
    dynamicSelect(year, document.getElementById('month').value)
    var month = document.getElementById('month').value


    arrestSubset = json.features.map((d) => {
      return d['properties']['arrest'][year + month]
    })

    var selectSubset = arrestSubset

    // arrestScale = d3.scaleLinear()
    //   .range(['#D7D9D7', '#B01116'])
    //   .domain([0, d3.max(arrestSubset)])

    arrestScale = d3.scaleLinear()
      .range(['#D7D9D7', '#B01116'])
      .domain([0, 27])

    var selectScale = arrestScale

    var legendHome = window.innerWidth > 767 ? '.form-select' : '.mobile-legend'
    var key = d3.select(legendHome)
      .append("svg")
      .attr("width", 200)
      .attr("height", 30)

    var legend = key.append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    legend.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#D7D9D7")
      .attr("stop-opacity", 1);

    legend.append("stop")
      .attr("offset", "100%")
      .attr('stop-color', arrestScale(d3.max(selectSubset)))
      // .attr("stop-color", "#B01116")
      .attr("stop-opacity", 1);

    key.append("rect")
      .attr("width", 150)
      .attr("height", 20)
      .style("fill", "url(#gradient)")
      .attr("transform", "translate(15,0)");

    key.append('text')
      .attr('class', 'gradient-min')
      .style('fill', 'white')
      .text(0)
      .attr("transform", "translate(0,15)")
      .attr('text-anchor', 'start')

    key.append('text')
      .attr('class', 'gradient-max')
      .style('fill', 'white')
      .text(d3.max(selectSubset))
      .attr("transform", "translate(170,15)")
      .attr('text-anchor', 'start')

    //Bind data and create one path per GeoJSON feature
    svg2.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr('class', 'precinct')
      .style("stroke", '#000')
      .style("stroke-width", '.5')
      .style('pointer-events', d => d.properties.modzcta == 99999 ? 'none' : 'auto')
      .style("fill", (d) => {
        return selectScale(d['properties'][radio][year + month])
      })
      .style('opacity', d => d.properties.modzcta == 99999 ? '0' : '1')
      .on("mouseover", (d) => {
        d3.selectAll('#chart-2 path')
          .style('stroke-width', 0.5)

        d3.select(event.target)
          .style('stroke-width', 2)
          .raise()

        selectedPrecinct = d.properties.precinct
        var year = document.getElementById('year').value
        dynamicSelect(year, document.getElementById('month').value)
        var month = document.getElementById('month').value

        mouseover(2, tipText2(d, month, year), d)

        tooltipChart(ttChartData(d))
      })
      .on("mousemove", function(d) {
        return mousemove(2)
      })
      .on("mouseout", function(d) {
        return mouseout(2)
      })

    d3.selectAll('.form-select')
      .datum(json.features)
      .on('change', function(data) {
        let d = data.find((p) => {
          return p.properties.precinct === selectedPrecinct
        })


        var radio = 'arrest'

        var year = document.getElementById('year').value
        dynamicSelect(year, document.getElementById('month').value)
        var month = document.getElementById('month').value

        arrestSubset = json.features.map((d) => {
          return d['properties']['arrest'][year + month]
        })

        var selectSubset = arrestSubset

        arrestScale = d3.scaleLinear()
          .range(['#D7D9D7', '#B01116'])
          .domain([0, 27])

        var selectScale = arrestScale

        d3.select('.gradient-min')
          .text(0)

        d3.select('.gradient-max')
          .text(d3.max(selectSubset))

        d3.select(document.querySelector('#gradient').lastChild)
          .attr('stop-color', arrestScale(d3.max(selectSubset)))

        d3.selectAll(`#chart-2 path.precinct`)
          .transition()
          .duration(350)
          .style("fill", (d) => {
            return selectScale(d['properties'][radio][year + month])
          })

        d3.selectAll(`#chart-2 path.precinct`)
          .transition()
          .duration(350)
          .style("fill", (d) => {
            return selectScale(d['properties'][radio][year + month])
          })

        if (document.querySelector('#chart-2 .my-tooltip').style.visibility !== 'hidden') {
          mouseover(2, tipText2(d, month, year))
          tooltipChart(ttChartData(d, 'left'), 'left')
          tooltipChart(ttChartData(d, 'right'), 'right')
        }

        if (window.innerWidth > 767) {
          d3.selectAll('#tooltip-2')
            .attr('display', 'none')
            .style("visibility", "hidden")
        }
      })
  });