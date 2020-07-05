function vis2(geoJSON, data, div) {


  const percentChangeExtent = d3.extent(data, d => parseFloat(d.net_committed));

  const colorVis2 = d3.scaleDiverging()
    .domain([percentChangeExtent[0], 0, percentChangeExtent[1]])
    .interpolator(d3.interpolateRdYlBu);


  const map = new Map(data.map(d => [
      d.Country,
      { committed: d.net_committed }
    ]));

  const countryToCommitted = Object.fromEntries(map);


  const map2 = new Map(data.map(d => [
    d.Country,
    { donated: d.donated, received: d.received }
  ]));

  const countryToCommitted2 = Object.fromEntries(map2);

  const countries = data.map(d => d.Country);

  const margin = ({top: 30, right: 65, bottom: 10, left: 25});

  const visWidth = 600 - margin.left - margin.right;
  const visHeight = 400 - margin.top - margin.bottom;

  const svg = div.append('svg').attr("viewBox", [0, 0, visWidth, visHeight]);


  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // draw map

  svg.append("g")
    .attr("class", "legendLinear")
    .style("font-size","4px")
    .attr("transform", "translate(20,20)");

  var legendLinear = d3.legendColor()
    .shapeWidth(35)
    .orient('horizontal')
    .shapePadding(0)
    .title("Net amount committed")
    .titleWidth(100)
    .scale(colorVis2);

  svg.select(".legendLinear")
    .call(legendLinear);

  var ordinal = d3.scaleOrdinal()
      .domain(["Donated ", "Received "])
      .range([ "#252525", "#dd1c77"]);

  svg.append("g")
  .attr("class", "legendOrdinal")
  .style("opacity", 0.6)
  .attr("transform", "translate(400,15)");

  var legendOrdinal = d3.legendColor()
    .shape("path", d3.symbol().type(d3.symbolCircle).size(90)())
    .shapePadding(15)
    .cellFilter(function(d){ return d.label !== "e" })
    .scale(ordinal);

  svg.select(".legendOrdinal")
    .call(legendOrdinal);

  const projection =  d3.geoNaturalEarth1()
      .fitSize([visWidth, visHeight], geoJSON);

  const path = d3.geoPath().projection(projection);

  g.selectAll('.border')
    .data(geoJSON.features)
    .join('path')
      .attr('class', 'border')
      .attr('d', path)
      .attr('fill', d=>countries.includes(d.properties.sovereignt) ? colorVis2(countryToCommitted[d.properties.sovereignt].committed) : '#fdfdfd')
      .attr('stroke', '#f6f6f6');

  const radius1 = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.donated)])
    .range([0, 7]);

  const radius2 = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.received)])
    .range([0, 7]);

  g.selectAll("dot")
      .data(geoJSON.features)
      .join("circle")
        .attr("class", ".dot")
        .attr("fill", "#252525")
        .style("opacity", 0.6)
        .attr("cx", d => {
          // get the center of the state
          const [x, y] = path.centroid(d);
          return x;
        })
        .attr("cy", d => {
          const [x, y] = path.centroid(d);
          return y;
        })
        .attr("r", d=>countries.includes(d.properties.sovereignt) ? radius1(countryToCommitted2[d.properties.sovereignt].donated) : 0)

   g.selectAll("dot")
      .data(geoJSON.features)
      .join("circle")
        .attr("class", ".dot")
        .attr("fill", "#dd1c77")
        .style("opacity", 0.6)
        .attr("cx", d => {
          // get the center of the state
          const [x, y] = path.centroid(d);
          return x;
        })
        .attr("cy", d => {
          const [x, y] = path.centroid(d);
          return y;
        })
        .attr("r", d=>countries.includes(d.properties.sovereignt) ? radius2(countryToCommitted2[d.properties.sovereignt].received) : 0)




}
