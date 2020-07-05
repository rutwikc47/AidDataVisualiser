function vis3(geoJSON, data, datav31, datav32, datav33, div) {

  const dataArr = [data, datav31, datav32, datav33];

  const svg = div.append('svg').attr("viewBox", [0, 0, 1000, 730]);

  for (i = 0; i < 4; i++) {

    data = dataArr[i]

    const percentChangeExtent = d3.extent(data, d => parseFloat(d.commitment_amount_usd_constant));

    const colorV3 = d3.scaleSequential()
          .domain(percentChangeExtent)
          .interpolator(d3.interpolateReds)

    const map = new Map(data.map(d => [
        d.recipient,
        { committed: d.commitment_amount_usd_constant }
      ]));

    const countryToCommitted = Object.fromEntries(map);

    const map_2 = new Map(data.map(d => [
      d.recipient,
      { donated: d.donated, received: d.received }
    ]));

    const countryToCommitted2 = Object.fromEntries(map_2);

    const countries = data.map(d => d.recipient);

    const margin = ({top: 60, right: 65, bottom: 10, left: 25});

    const visWidth = 600 - margin.left - margin.right;
    const visHeight = 400 - margin.top - margin.bottom;

    switch (i) {
    case 0:
      var g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
        g.append("text")
      .attr("x", visWidth / 2)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "hanging")
      .attr("font-family", "sans-serif")
      .attr("font-size", "16px")
      .text("1973-1983");
      break;
    case 1:
      var g = svg.append('g')
        .attr('transform', `translate(${margin.left+450}, ${margin.top})`);
        g.append("text")
      .attr("x", (visWidth / 2) + 75)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "hanging")
      .attr("font-family", "sans-serif")
      .attr("font-size", "16px")
      .text("1983-1993");
      break;
    case 2:
      var g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top+350})`);
        g.append("text")
      .attr("x", visWidth / 2)
      .attr("y",0)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "hanging")
      .attr("font-family", "sans-serif")
      .attr("font-size", "16px")
      .text("1993-2003");
      break;
    case 3:
      var g = svg.append('g')
        .attr('transform', `translate(${margin.left+450}, ${margin.top+350})`);
        g.append("text")
      .attr("x", (visWidth / 2) + 75)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "hanging")
      .attr("font-family", "sans-serif")
      .attr("font-size", "16px")
      .text("2003-2013");
      break;
    default:
      print("NULL");
    }

    svg.append("g")
      .attr("class", "legendLinear")
      .style("font-size","4px")
      .attr("transform", "translate(325,5)");

    var legendLinear = d3.legendColor()
      .shapeWidth(35)
      .orient('horizontal')
      .shapePadding(0)
      .cells(10)
      .title("Donation Received")
      .titleWidth(100)
      .scale(colorV3);

    svg.select(".legendLinear")
      .call(legendLinear);

    const projection =  d3.geoNaturalEarth1()
        .fitSize([visWidth, visHeight], geoJSON);

    const path = d3.geoPath().projection(projection);

    g.selectAll('.border')
      .data(geoJSON.features)
      .join('path')
        .attr('class', 'border')
        .attr('d', path)
        .attr('fill', d=>countries.includes(d.properties.sovereignt) ? colorV3(countryToCommitted[d.properties.sovereignt].committed) : '#fdfdfd')
        .attr('stroke', '#f6f6f6');

  }

}
