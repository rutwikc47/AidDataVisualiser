// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.json('data/countries.json'),
  d3.csv('data/v1.csv', d3.autoType),
  d3.csv('data/v30.csv', d3.autoType),
  d3.csv('data/v31.csv', d3.autoType),
  d3.csv('data/v32.csv', d3.autoType),
  d3.csv('data/v33.csv', d3.autoType),
  d3.csv('data/v2.csv', d3.autoType),

]).then(([geoJSON, datav1, datav31, datav32, datav33, datav34, datav2]) => {
  vis1(datav1, d3.select('#vis1'));
  vis2(datav2, d3.select('#vis2'));
  vis3(geoJSON,datav31, datav32, datav33, datav34, d3.select('#vis3'));
  // vis3(datath, datav1,d3.select('#vis3'));
});
