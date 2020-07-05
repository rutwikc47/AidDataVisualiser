function vis2(datav2, div) {
   
  purpose = d3.rollup(datav2, d=> d,aid=> aid.coalesced_purpose_name)

  const fpurpose =Array.from(purpose, ([purpose, pdata]) => {
      return {
       'purpose' : purpose,
        'count' : pdata.length
      }  
    })

  // Filter by top donors

  don_c = d3.rollup(datav2, d=> d3.sum(d.map(d=> d.commitment_amount_usd_constant) ), d=> d.donor)

  don_amt = Array.from(don_c , ([country, amount]) => ({country, amount}))

  don_d3_arr = don_amt.slice()
    .sort((a, b) => d3.descending(a.amount, b.amount))
    .slice(0, 20)

  fin_donors = don_d3_arr.map(d => d.country)

  aid_filter1 =datav2.filter(d=> fin_donors.includes(d.donor) )

  // Filter by top receivers

  recip_c=d3.rollup(datav2, d=> d3.sum(d.map(d=> d.commitment_amount_usd_constant) ), d=> d.recipient)

  recip_amt = Array.from(recip_c, ([country, amount]) => ({country, amount}))

  recip_d3_arr = recip_amt.slice()
    .sort((a, b) => d3.descending(a.amount, b.amount))
    .slice(0, 10)

  fin_recipient= recip_d3_arr.map(d => d.country)

  aid_filter2 = aid_filter1.filter(d=> fin_recipient.includes(d.recipient) )

  fin_purpose =fpurpose.sort((a,b) => d3.descending(a.count, b.count)).slice(0,5)

  filtered =d3.rollup(aid_filter2, d=> d.map(c=>({

    recipient:  c.recipient,
    
    amount: c.commitment_amount_usd_constant,
        'year': c.year
    
    })), d=>d.donor);      
    
  const n_farr = Array.from(filtered, ([donor, recipients]) => {
    
    const tp_arr = d3.rollup(recipients, rec=>d3.sum(rec.map(d=>d.amount)), d=>d.recipient);
    const temp_arr = Array.from(tp_arr, ([recipient, amount])=>({recipient, amount}));
                                
    return {
      'donor': donor, 
      'recipients': temp_arr,
    }
  });
       
  const no =n_farr.map(d=>  d.recipients.map(e=> e.amount) )

  var don_range = [];
  var i;
  var j;     
          
  for( i = 0; i < no.length;i++){
   var value = no[i];

   for( j = 0; j < no[i].length; j++){
      var innerValue = no[i][j];
      don_range.push(innerValue)
   }
  }
        
  colorv2 = d3.scaleOrdinal(d3.schemeTableau10)

  path = d3.arc().outerRadius(20 - 2).innerRadius(0)
        
  fin_purpose_arr = [...new Set(fin_purpose.map(bill => bill.purpose))]

  // Filter by top purposes

  aid_filter3 = aid_filter2.filter(d=> fin_purpose_arr.includes(d.coalesced_purpose_name) )
        
  aid_filter3_map=Array.from(d3.rollup(aid_filter3, 
    rec=>Array.from(d3.rollup(rec, r=>r, d=>d.recipient),
                   ([recipient,  purposes])=>{
     
     return {
       recipient: recipient,
       recpt_data: Array.from(d3.rollup(purposes,
                             v=>d3.sum(v.map(w=>w.commitment_amount_usd_constant)), 
                             u=>u.coalesced_purpose_name), 
                              ([purpose, amount])=> ({purpose, amount}))
     }

   }                            
                                     
  ), d=> d.donor), ([donor, recipients]) => ({donor, recipients}))
       
  pie2 = d3.pie()
    .value(d => d.amount)

  const margin = {top: 5, right: 30, bottom: 50, left: 70};
  width = 500;
  height = 400;
  const visWidth = 500 - margin.left - margin.right;
  const visHeight = 600 - margin.top - margin.bottom;

  var topRec = ['India', 'Thailand', 'Brazil', 'Colombia', 'Korea', 'Poland', 'South Africa', 'Kuwait', 'Chile', 'Saudi Arabia'];
  var topDon = ['United States', 'Japan', 'Germany', 'United Kingdom', 'France', 'Netherlands', 'Canada', 'Sweden', 'Norway', 'Italy', 'Denmark', 'Switzerland', 'Australia', 'Belgium', 'Spain', 'Saudi Arabia', 'Kuwait', 'Korea', 'Austria', 'Finland'];

  fin_donors .sort(function(a, b) {
    return topDon.indexOf(a) - topDon.indexOf(b);
  });


  fin_recipient.sort(function(a, b) {
    return topRec.indexOf(a) - topRec.indexOf(b);
  });

  colorv2 = d3.scaleOrdinal(d3.schemeTableau10).domain(fin_purpose_arr)

  function legend2(div, colorv2) {
    const size = 10;
    const lineHeight = size * 1.5;

    const svg = div.append("svg");
    
    const rows = svg
      .selectAll("g")
      .data(colorv2.domain())
      .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * lineHeight})`);

    rows
      .append("rect")
      .attr("height", size)
      .attr("width", size)
      .attr("fill", d => colorv2(d));

    rows
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("dominant-baseline", "hanging")
      .attr("x", lineHeight)
      .text(d => d);
  }

  legend2(div, colorv2);

  const svg = div.append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)

  const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const x = d3.scalePoint()
        .domain(fin_recipient)
        .range([0, visWidth])
        .padding(0.5);

  const xAxis = d3.axisBottom(x);

  g.append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${visHeight/1.5})`)
    .selectAll("text")  
    .attr("font-size","4px")
    .attr("dy", ".15em")
    .attr("stroke-width", "1px");

      
  const y = d3.scalePoint()
      .domain(fin_donors )
      .range([0, visHeight/1.5])
      .padding(0.7);

  const yAxis = d3.axisLeft(y);
    
  g.append("g")
    .call(yAxis)
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("font-size","4px")
         
  const maxRadius = 10;
  const radius = d3.scaleSqrt()
      .domain(d3.extent(don_range))
      .range([1,2]);

  path = d3.arc().outerRadius(9 - 2).innerRadius(0)

  pie2 = d3.pie()
    .value(d => d.amount)
    
  const rows = g.selectAll(".row")
      .data(aid_filter3_map)
      .join("g")
        .attr("transform", d => `translate(0, ${y(d.donor)})`);
    
  let arcgps = rows.selectAll('g').data(d=> d.recipients)
  .join('g')
    .attr("transform", d => `translate(${x(d.recipient)}, 0)`);
   
  let arc = arcgps.selectAll('.arc').data(d=>pie2(d.recpt_data))
    .join('g')
    .classed('arc', true);
   
   
  arc.append('path')
    .attr('d', path)
    .attr('fill', d => colorv2(d.data.purpose))

}