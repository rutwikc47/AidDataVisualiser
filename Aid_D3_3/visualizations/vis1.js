function vis1(data, div) {

  var margin = {top: 80, right: 25, bottom: 50, left: 110},
  width = 450 - margin.left - margin.right + 1000,
  height = 450 - margin.top - margin.bottom + 200;

  var extent = d3.extent(data, d => d.commitment_amount_usd_constant);

  function continuousLegend(color, width, height) {
    const svg = d3.create('svg')
        .attr('width', width)
        .attr('height', height);
    
    // margin set up
   
    const margin = {top: 0, bottom: 20, left: 450, right: 20};
    
    const w = width - margin.left - margin.right;  
    const h = height - margin.top - margin.bottom;
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
    
    // create a canvas element to draw the legend
    
    const canvas = document.createElement('canvas');
    
    canvas.width = w;
    canvas.height = h;
    
    const context = canvas.getContext("2d");

    for (let i = 0; i < w; ++i) {
      context.fillStyle = color.interpolator()(i / w);
      context.fillRect(i, 0, 100, h);
    }

    // add canvas to SVG as an image
    g.append('svg:image')
        .attr('href', canvas.toDataURL())
    
    // set up the axis
    
    // create scale for tick marks
    const domain = color.domain();
    // sequential scales have domain length 2
    // diverging scales have domain length 3
    const range = domain.length === 2 ?
          [0, w] :
          [0, w/2, w];
    const scale = d3.scaleLinear()
        .domain(domain)
        .range(range);
    
    // create and add axis
    const axis = d3.axisBottom(scale)
        .ticks(5);
    g.append('g')
        .attr('transform', `translate(0, ${h})`)
        .call(axis)
        .call(g => g.select('.domain').remove());

    return svg.node();
  }


  var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateOranges)
    .domain([0,extent[1]])


  d3.select('#vis1')
              .append(() => continuousLegend(myColor, 1000, 35));

  var svg = d3.select("#vis1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  
  var g = svg.append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  var myVars = d3.map(data, function(d){return d.donor;}).keys()
  var myGroups = d3.map(data, function(d){return d.recipient;}).keys()

  var topRec = ['India', 'Thailand', 'Brazil', 'Colombia', 'Korea', 'Poland', 'South Africa', 'Kuwait', 'Chile', 'Saudi Arabia'];
  var topDon = ['United States', 'Japan', 'Germany', 'United Kingdom', 'France', 'Netherlands', 'Canada', 'Sweden', 'Norway', 'Italy', 'Denmark', 'Switzerland', 'Australia', 'Belgium', 'Spain', 'Saudi Arabia', 'Kuwait', 'Korea', 'Austria', 'Finland']

  myVars.sort(function(a, b) {
    return topDon.indexOf(a) - topDon.indexOf(b);
  });

  myVars.reverse();

  myGroups.sort(function(a, b) {
    return topRec.indexOf(a) - topRec.indexOf(b);
  });
  console.log(myVars);
  console.log(myGroups);

  var x = d3.scaleBand()
      .range([ 0, width])
      .domain(myGroups)
      .padding(0.05);

  g.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()


  var y = d3.scaleBand()
      .range([ height, 0 ])
      .domain(myVars)
      .padding(0.05);

      
  g.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()


  g.selectAll()
      .data(data, function(d) {return d.recipient+':'+d.donor;})
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.recipient) })
        .attr("y", function(d) { return y(d.donor) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) {return myColor(d.commitment_amount_usd_constant)} )
        .style("stroke-width", 4)
        .style("stroke", "none")

  g.append("text")
          .attr("x", -110)
          .attr("y", -20)
          .attr("text-anchor", "left")
          .style("font-size", "14px")
          .style("fill", "grey")
          .style("max-width", 50)
          .text("Donors(↓ Descending)");

  g.append("text")
          .attr("x", width/2)
          .attr("y", height+40)
          .attr("text-anchor", "left")
          .style("font-size", "14px")
          .style("fill", "grey")
          .style("max-width", 50)
          .text("Recipient(→ Descending)");

}