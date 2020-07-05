// Load the datasets and call the functions to make the visualizations
Promise.all([
  d3.csv('data/scores.csv', d3.autoType),
  d3.json('data/countries.json'),
  d3.csv('data/vthree.csv', d3.autoType),
]).then(([data, geoJSON, datath]) => {
  vis1(data, d3.select('#vis1'));
  vis2(geoJSON,data, d3.select('#vis2'));
  vis3(datath, data,d3.select('#vis3'));
});
