function vis1(data, div) {

  const nestedSupply = d3.nest().key(d=>d.country).key(d=>d.year).entries(data);

  const years = nestedSupply[0].values.map(d=>+d.key);

  const names = nestedSupply.map(d=>d.key);

  const values = nestedSupply.map(d=>d.values.map(d=>d.values[0].net_committed));

  const findata = {values, names, years};

  const percentChangeExtent = d3.extent(data, d => d.net_committed);

  const colorV1 = d3.scaleDivergingPow()
    .domain([percentChangeExtent[0], 0, percentChangeExtent[1]])
    .interpolator(d3.interpolatePuOr);

  const margin = ({top: 90, right: 15, bottom: 1, left: 97.5});

  const height = 16;

  const x = d3.scaleLinear()
    .domain([d3.min(findata.years), d3.max(findata.years) + 1])
    .rangeRound([margin.left, 1100 - margin.right]);

  const y = d3.scaleBand()
    .domain(findata.names)
    .rangeRound([margin.top, margin.top + findata.names.length * height]);

  const svg = div.append('svg')
     .attr("viewBox", [0, 0, 1100, height* findata.names.length + margin.top + margin.bottom + 30]);

  const rectWidth = x(findata.years[1] + 1) - x(findata.years[0]) - 1;

  svg.append("g")
      .attr("class", "legendLinear")
      .style("font-size","5px")
      .attr("transform", "translate(255,5)");

  var legendLinear = d3.legendColor()
    .shapeWidth(40)
    .orient('horizontal')
    .shapePadding(0)
    .cells(15)
    .title("Net Committed")
    .titleWidth(100)
    .scale(colorV1);

  svg.select(".legendLinear")
    .call(legendLinear);

  svg.append("g")
     .attr("transform", `translate(${rectWidth/4},${margin.top})`)
     .call(d3.axisTop(x).tickValues(years).tickFormat(d3.format("")).tickSizeInner(0))
     .call(g => g.select(".domain").remove())
     .append('text')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'black')
      .attr('x', 525)
      .attr('y', -20)
      .text('Years');

  svg.append("g")
     .attr("transform", `translate(${margin.left},0)`)
     .call(d3.axisLeft(y).tickSize(0))
     .append('text')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'black')
      .attr('x', -75)
      .attr('y', 84)
      .text('Countries');

  const row = svg.append("g")
     .selectAll("g")
     .data(findata.values)
     .enter().append("g")
       .attr("transform", (d, i) => `translate(0,${y(findata.names[i])})`);

  row.selectAll("rect")
     .data(d => d)
     .enter().append("rect")
       .attr("x", (d, i) => x(findata.years[i]) + 1)
       .attr("width", (d, i) => x(findata.years[i] + 1) - x(findata.years[i]) - 1)
       .attr("height", y.bandwidth() - 1)
       .attr("fill", d => colorV1(d));
}
