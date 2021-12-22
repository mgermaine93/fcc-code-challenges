// Nearly all of the actual D3 / JavaScript stuff will live here.

function drawBarChart(dataset) {
    return dataset;
}

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", (data) => {
    let dataset = data.data;
    console.log(drawBarChart(dataset));
})

// sets the dimensions of the chart itself
let width = 1000;
let height = 1000;
let padding = 60;

var svg = d3.select('svg')
            .attr("width", width)
            .attr("height", height)
            .attr("class", "bar-chart")

// // sets the x-axis scale
// const xScale = d3.scaleLinear()
//                     .domain([0, d3.max(dataset, (d) => d[0])])
//                     .range([padding, width - padding]);

// // sets the y-axis scale
// const yScale = d3.scaleLinear()
//                     .domain([0, d3.max(dataset, (d) => d[1])])
//                     .range([height - padding, padding]);
