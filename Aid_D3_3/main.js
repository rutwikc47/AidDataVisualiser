// Load the datasets and call the functions to make the visualizations

Promise.all([
  d3.json('data/countries.json'),
  d3.csv('data/v1mp3.csv', d3.autoType),
  d3.csv('data/v2mp3.csv', d3.autoType),
  d3.csv('data/v3mp30.csv', d3.autoType),
  d3.csv('data/v3mp31.csv', d3.autoType),
  d3.csv('data/v3mp32.csv', d3.autoType),
  d3.csv('data/v3mp33.csv', d3.autoType),

]).then(([geoJSON, datav1mp3, datav2mp3, datav3mp30, datav3mp31, datav3mp32, datav3mp33]) => {
  vis1(datav1mp3, d3.select('#vis1'));
  vis2(datav2mp3, d3.select('#vis2'));
  vis3(datav3mp30, datav3mp31, datav3mp32, datav3mp33, d3.select('#vis3'));
});
