function continuousLegend(color, width, height) {
    const svg = d3.create('svg')
        .attr('width', width)
        .attr('height', height);
    
    // margin set up
   
    const margin = {top: 0, bottom: 20, left: 440, right: 15};
    
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

function vis3(datav30, datav31, datav32, datav33, div) {

  const dataArr = [datav30, datav31, datav32, datav33];

  var maxRate = 0;

  for (j = 0; j < 4; j++) {


    var tempMax = d3.max(dataArr[j], d => d.commitment_amount_usd_constant);

    if (tempMax > maxRate){
      maxRate = tempMax;
    }

  }

  var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateOranges)
    .domain([0,maxRate])


  d3.select('#vis3')
              .append(() => continuousLegend(myColor, 1000, 35));

  const svg = div.append('svg').attr("viewBox", [0, 0, 950, 720]);

  for (i = 0; i < 4; i++) {

  data = dataArr[i]

  var donorL = d3.map(data, function(d){return d.donor;}).keys()
  var recipL = d3.map(data, function(d){return d.recipient;}).keys()

  var topRec = ['India', 'Thailand', 'Brazil', 'Colombia', 'Korea', 'Poland', 'South Africa', 'Kuwait', 'Chile', 'Saudi Arabia'];
  var topDon = ['United States', 'Japan', 'Germany', 'United Kingdom', 'France', 'Netherlands', 'Canada', 'Sweden', 'Norway', 'Italy', 'Denmark', 'Switzerland', 'Australia', 'Belgium', 'Spain', 'Saudi Arabia', 'Kuwait', 'Korea', 'Austria', 'Finland']

  donorL.sort(function(a, b) {
    return topDon.indexOf(a) - topDon.indexOf(b);
  });

  donorL.reverse();

  recipL.sort(function(a, b) {
    return topRec.indexOf(a) - topRec.indexOf(b);
  });

  const margin = ({top: 100, right: 100, bottom: 10, left: 75});

  const visWidth = 550 - margin.left - margin.right;
  const visHeight = 350 - margin.top - margin.bottom;

  var x = d3.scaleBand()
      .range([ 0, visWidth])
      .domain(recipL)
      .padding(0.05);

  var y = d3.scaleBand()
      .range([ visHeight, 0 ])
      .domain(donorL)
      .padding(0.05);

  switch (i) {
    case 0:
      var g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
        g.append("text")
      .attr("x", visWidth / 2)
      .attr("y", -margin.top/2)
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
      .attr("x", visWidth / 2)
      .attr("y", -margin.top/2)
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
      .attr("y",-margin.top/2)
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
      .attr("x", visWidth / 2)
      .attr("y", -margin.top/2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "hanging")
      .attr("font-family", "sans-serif")
      .attr("font-size", "16px")
      .text("2003-2013");

      break;

    default:
      print("NULL");
    }

  g.append("g")
      .style("font-size", 8)
      .attr("transform", `translate(0,${visHeight})`)
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain").remove()


  g.append("g")
  .style("font-size", 8)
  .attr("transform", `translate(0,0)`)
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
      .style("fill", function(d) { return myColor(d.commitment_amount_usd_constant)} )
      .style("stroke-width", 4)
      .style("stroke", "none")

  g.append("text")
      .attr("x", -30)
      .attr("y", -10)
      .attr("text-anchor", "left")
      .style("font-size", "7px")
      .style("fill", "grey")
      .style("max-width", 50)
      .text("Donors(↓ Descending)");

  g.append("text")
          .attr("x", (visWidth/2)-20)
          .attr("y", visHeight+25)
          .attr("text-anchor", "left")
          .style("font-size", "7px")
          .style("fill", "grey")
          .style("max-width", 50)
          .text("Recipient(→ Descending)");

    }
}