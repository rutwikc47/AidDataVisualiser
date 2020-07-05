function vis2(datav2, div) {

  const p_to_y = d3.rollup(datav2, years => years, d => d.coalesced_purpose_name);

  const fin_data = Array.from(p_to_y, ([purpose, years]) => ({purpose, years}));

  const counts = d3.rollup(datav2, tot => d3.sum(tot, c => c.commitment_amount_usd_constant), d => d.year, d => d.coalesced_purpose_name);

  const yearData = Array.from(counts, (([year, map]) => { map.set('year', year); map.set('total', d3.sum(map.values())); return Object.fromEntries(map)}));

  const maxAmount = d3.max(fin_data, d => d3.max(d.years, p => p.commitment_amount_usd_constant));

  const p_to_y_v2 = d3.rollup(datav2, years => d3.max(years,d=> d.commitment_amount_usd_constant), d => d.year);

  const fin_data_1 = Array.from(p_to_y_v2, ([years, purposes]) => ({years, purposes}));

  const modeYears = fin_data_1.map(d => d.purposes);

  const purposes_datav2 = Array.from(d3.rollup(datav2, tot => d3.sum(tot, c => c.commitment_amount_usd_constant), d => d.coalesced_purpose_name), ([coalesced_purpose_name, commitment_amount_usd_constant]) => ({coalesced_purpose_name, commitment_amount_usd_constant})).sort((a, b) => d3.descending(a.commitment_amount_usd_constant, b.commitment_amount_usd_constant)).map(d => d.coalesced_purpose_name);

  const colorv2 = d3.scaleOrdinal().domain(purposes_datav2).range(d3.schemeCategory10);

  const margin = {top: 150, right: 30, bottom: 20, left: 80};
  const visWidth = 1000 - margin.left - margin.right;
  const visHeight = 500 - margin.top - margin.bottom;

  const svg = div.append('svg')
     .attr("viewBox", [0, 0, 1000, visHeight+visHeight/1.5]);

  const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

  const x = d3.scaleLinear().domain(d3.extent(yearData, d => d.year)).range([0, visWidth]);

  const y = d3.scaleLinear().domain([0, maxAmount]).nice().range([visHeight, 0]);

  const xAxis = d3.axisBottom(x);

  const yAxis = d3.axisLeft(y);

  var ordinal = d3.scaleOrdinal()
  .domain(purposes_datav2)
  .range(d3.schemeCategory10);

  svg.append("g")
    .attr("class", "legendOrdinal")
    .style("opacity", 0.6)
    .attr("transform", "translate(680,10)");

  var legendOrdinal = d3.legendColor()
    .shape("path", d3.symbol().type(d3.symbolCircle).size(90)())
    .shapePadding(2)
    .cellFilter(function(d){ return d.label !== "e" })
    .scale(ordinal);

  svg.select(".legendOrdinal")
    .call(legendOrdinal);

  g.append('g').attr('transform', `translate(0,${visHeight})`).call(xAxis)
    .append('text')
        .attr('text-anchor', 'start')
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'black')
        .attr('x', visWidth/2)
        .attr('y', 50)
        .text('Years');

  g.append('g').call(yAxis).call(g => g.selectAll('.domain').remove())
    .append('text')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'black')
      .attr('x', 5)
      .text('Amount');

    const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.commitment_amount_usd_constant));

  const linesSelection = g.selectAll('.line')
      .data(fin_data);

  const lineGroups = linesSelection
      .join('g')
        .attr('stroke', d => colorv2(d.purpose))
        .attr('stroke-opacity', 0.1)
        .attr('stroke-width', 1.2);

  lineGroups
    .append('path')
      .datum(d => d.years)
      .attr('d', line)
      .attr('fill', 'black')
      .attr('fill', 'none');

  lineGroups.selectAll('.circle')
    .data(lg => lg.years)
    .enter().append('circle')
      .attr('r', d => modeYears.includes(d.commitment_amount_usd_constant)?4:0)
      .attr('cx', d => x(new Date(d.year)))
      .attr('cy', d => y(new Date(d.commitment_amount_usd_constant)))
      .attr('fill', d => modeYears.includes(d.commitment_amount_usd_constant)?colorv2(d.coalesced_purpose_name):'none')
      .attr('opacity', 0.7);
}
