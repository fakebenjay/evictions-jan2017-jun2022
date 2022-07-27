var rawWidth = document.getElementById('article-body').offsetWidth
var w = rawWidth;
var h = rawWidth * (3 / 5);
//Define map projection
var projection = d3.geoMercator()
  .center([-74.0060, 40.716])
  .translate([(w / 2), (h / 2.105)])
  .scale([w * 61.5]);
//Define path generator
var path = d3.geoPath()
  .projection(projection);
//Create SVG element
var svg1 = d3.select("#chart-1 .chart")
  .append("svg")
  .attr("width", w)
  .attr("height", h);
var tooltip1 = d3.select("#chart-1")
  .append('div')
  .style('visibility', 'hidden')
  .attr('class', 'my-tooltip')
  .attr('id', 'tooltip-1')

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

function changeZip(d) {
  d3.selectAll(`#chart-1 path.zcta`)
    .style('stroke-width', .5)
  if (!!d) {
    d3.selectAll(`#chart-1 path.${d}`)
      .style('stroke-width', 3)
      .raise()

    mouseover(1, tipTextMap(JSON.parse(document.querySelector(`path.${d}`).dataset.data), document.querySelector('select#month').value, document.querySelector('select#year').value))
    tooltipChart(ttChartData(JSON.parse(document.querySelector(`path.${d}`).dataset.data)))
  } else {
    d3.select(`#tooltip-1`)
      .html("")
      .attr('display', 'none')
      .style("visibility", "hidden")
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
      .attr("width", 220)
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
      .attr("width", 170)
      .attr("height", 20)
      .style("fill", "url(#gradient)")
      .attr('stroke', 'black')
      .attr('stroke-width', '1px')
      .attr("transform", "translate(15,0)");

    key.append('text')
      .attr('class', 'gradient-min')
      .style('fill', 'black')
      .text(0)
      .attr("transform", "translate(0,15)")
      .attr('text-anchor', 'start')

    key.append('text')
      .attr('class', 'gradient-max')
      .style('fill', 'black')
      .text(d3.max(selectSubset))
      .attr("transform", "translate(190,15)")
      .attr('text-anchor', 'start')

    //Bind data and create one path per GeoJSON feature

    json.features.forEach((d) => {
      if (d.properties.modzcta == '99999') {
        return null
      }

      var option = document.createElement("option")
      option.text = `${d.properties.modzcta} (${d.properties.hood.split(': ')[1]})`
      option.value = 'zip-' + d.properties.modzcta

      option.setAttribute('boro', d.properties.hood.split(': ')[0])
      option.setAttribute('data-data', `{
        "zipCode": "${d.properties.modzcta}",
        "boro": "${d.properties.hood.split(': ')[0].replaceAll('The Bronx, Manhattan', 'The Bronx')}",
        "hood": "${d.properties.hood.split(': ')[1]}"
      }`)
      var vals = Array.prototype.slice.call(document.querySelector('select.zipname').children).map(d => d.value)

      if (!vals.includes(option.value)) {
        document.querySelector('select.zipname').add(option)
      }
    })

    svg1.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr('class', d => `zcta zip-${d.properties.modzcta}`)
      .style("stroke", '#000')
      .style("stroke-width", '.5')
      .style('pointer-events', d => d.properties.modzcta == 99999 ? 'none' : 'auto')
      .attr('data-data', (d) => {
        return JSON.stringify(d.properties)
      })
      .style("fill", (d) => {
        return selectScale(d['properties'][radio][year + month])
      })
      .style('opacity', d => d.properties.modzcta == 99999 ? '0' : '1')
      .on("mouseover mousemove", (d) => {
        $("select.zipname").selectize()[0].selectize.setValue(event.target.classList[1])
      })
      .on("mouseout", (d) => {
        if (window.innerWidth > 767) {
          $("select.zipname").selectize()[0].selectize.setValue('')
        }
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
        //
        // d3.selectAll(`#chart-1 path.precinct`)
        //   .transition()
        //   .duration(350)
        //   .style("fill", (d) => {
        //     return selectScale(d['properties'][radio][year + month])
        //   })

        d3.selectAll(`#chart-1 path.zcta`)
          .transition()
          .duration(350)
          .style("fill", (d) => {
            return selectScale(d['properties'][radio][year + month])
          })

        if (document.querySelector('#chart-1 .my-tooltip').style.visibility !== 'hidden') {
          var zipcode = document.querySelector('.selectize-input .item').dataset.value.split('-')[1]
          var selectedD = data.find(d => d.properties.modzcta == zipcode)
          mouseover(1, tipTextMap(selectedD.properties, month, year))
          tooltipChart(ttChartData(selectedD.properties, 'left'), 'left')
        }

        if (window.innerWidth > 767) {
          d3.selectAll('#tooltip-2')
            .attr('display', 'none')
            .style("visibility", "hidden")
        }
      })
    return json.features
  })
  .then(function(json) {
    document.querySelector('select.zipname').selectedIndex = -1
    var $select = $("select.zipname").selectize({
      placeholder: 'Select a zip...',
      allowEmptyOption: true,
      labelField: 'ZCTA5CE10',
      valueField: 'value',
      searchField: ['ZCTA5CE10', 'name', 'boro'],
      dataAttr: 'data-data',
      render: {
        option: function(data) {
          return `<div class='option ${data.value} ${data.boro.toLowerCase().replaceAll(' ', '-')}'
        data-value='${data.value}'
        data-zip-name='${data.zipCode}'
        data-boro='${data.boro}'
        data-hood="${data.hood}"
        >${data.ZCTA5CE10}</div>`;
        },
        optgroup: function(data) {
          var optgroup = `<div class='optgroup ${data.id.toLowerCase().replaceAll(' ', '-')}' data-group='${data.id}'>${data.html}</div>`;
          return optgroup
        }
      },
      optgroups: [{
          $order: 1,
          id: 'Manhattan',
          name: 'Manhattan',
        },
        {
          $order: 2,
          id: 'The Bronx',
          name: 'The Bronx'
        },
        {
          $order: 3,
          id: 'Brooklyn',
          name: 'Brooklyn'
        },
        {
          $order: 4,
          id: 'Queens',
          name: 'Queens'
        },
        {
          $order: 5,
          id: 'Staten Island',
          name: 'Staten Island'
        }
      ],
      optgroupField: 'boro',
      optgroupLabelField: 'name',
      optgroupValueField: 'id',
      lockOptgroupOrder: true,
      sortField: [{
        'field': 'ZCTA5CE10',
        'direction': 'asc'
      }],
      onChange: changeZip,
      create: false
    })
    $select[0].selectize.refreshOptions(false)
  });