// Nearly all of the actual D3 / JavaScript stuff will live here.


// this will likely not be needed, as JS code is linked in the "head" element above
// need to modify this static dataset with a real JSON one.
// const dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const width = 300;
// const height = 350;

// const svg = d3
// .select("body")
// .append("svg")
// .attr("width", width)
// .attr("height", height);

// svg
// .selectAll("rect")
// .data(dataset)
// .enter()
// .append("rect")
// .attr("x", (dataPoint, index) => {
//     return index * 30;
// })
// .attr("y", (dataPoint, index) => {
//     return height - dataPoint * 30;
// })
// .attr("width", 30)
// .attr("height", (dataPoint, index) => {
//     return dataPoint * 30;
// })
// .attr("fill", red);


// function drawBarChart(dataset) {

//     d3.select("body").selectAll("div")
//         .data(dataset)
//         .enter()
//         .append("div")
//         .attr("class", "bar")
//         .style("height", (d) => d)

// }

// let dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// drawBarChart(dataset);

// d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", (data) => {
//     let dataset = data.data;
//     console.log(drawBarChart(dataset));
// });

// sets the dimensions of the chart itself
// let width = 1000;
// let height = 1000;
// let padding = 60;

// var svg = d3.select('svg')
//             .attr("width", width)
//             .attr("height", height)
//             .attr("class", "bar-chart")

// // sets the x-axis scale
// const xScale = d3.scaleLinear()
//                     .domain([0, d3.max(dataset, (d) => d[0])])
//                     .range([padding, width - padding]);

// // sets the y-axis scale
// const yScale = d3.scaleLinear()
//                     .domain([0, d3.max(dataset, (d) => d[1])])
//                     .range([height - padding, padding]);
