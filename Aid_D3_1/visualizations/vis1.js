function vis1(data, div) {

  const final_data = data.sort((a,b) => d3.ascending(a.net_committed, b.net_committed));

  const margin = ({top: 30, right: 65, bottom: 10, left: 25});
  const barHeight = 15;
  const width = 750;
  const height = Math.ceil((final_data.length + 0.1) * barHeight) + margin.top + margin.bottom;

   const svg = div.append('svg')
      .attr("viewBox", [0, 0, width, height]);

   const tickFormat = d3.formatPrefix("+.1", 1e6);

   const x = d3.scaleLinear()
    .domain(d3.extent(final_data, d => d.net_committed))
    .rangeRound([margin.left, width - margin.right]);

   const y = d3.scaleBand()
      .domain(d3.range(final_data.length))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1);

   const xAxis = g => g
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 80).tickFormat(tickFormat))
      .call(g => g.select(".domain").remove());

   const yAxis = g => g
      .attr("transform", `translate(${x(0)},0)`)
      .call(d3.axisLeft(y).tickFormat(i => final_data[i].name).tickSize(0).tickPadding(6))
      .call(g => g.selectAll(".tick text").filter(i => final_data[i].value < 0)
          .attr("text-anchor", "start")
          .attr("x", 6));

    var ordinal = d3.scaleOrdinal()
        .domain(["> 0", "< 0"])
        .range([ "#a50026", "#313695"]);

    svg.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(700,10)");

    var legendOrdinal = d3.legendColor()
      .shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
      .shapePadding(10)
      .cellFilter(function(d){ return d.label !== "e" })
      .scale(ordinal);

    svg.select(".legendOrdinal")
      .call(legendOrdinal);

    svg.append("g")
      .selectAll("rect")
      .data(final_data)
      .join("rect")
        .attr("fill", d => d.net_committed > 0 ? "#a50026" : "#313695")
        .attr("x", d => x(Math.min(d.net_committed, 0)))
        .attr("y", (d, i) => y(i))
        .attr("width", d => Math.abs(x(d.net_committed) - x(0)))
        .attr("height", y.bandwidth());

    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
      .selectAll("text")
      .data(final_data)
      .join("text")
        .attr("text-anchor", d => d.net_committed < 0 ? "end" : "start")
        .attr("x", d => x(d.net_committed) + Math.sign(d.net_committed - 0) * 4)
        .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => d.Country);

    svg.append("g")
        .call(xAxis)
        .append("text")
          .attr("x", width/2)
          .attr("y", -23)
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .text("Net Committed");

    svg.append("g")
        .call(yAxis)
        .append("text")
          .attr("x", -height/2)
          .attr("y", -width/2.2)
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .attr("transform", "rotate(-90)" )
          .text("Countries");
}
