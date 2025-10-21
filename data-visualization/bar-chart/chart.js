import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

function getQuarter(date) {
    const month = date.getMonth() + 1;
    const quarter = Math.ceil(month / 3);
    console.log(quarter);
    return quarter;
}

// get the data
const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json");
const json = await response.json();

// parse the data
const data = json.data.map(d => ({
    dateString: d[0],
    date: new Date(d[0]),
    // .toISOString().split("T")[0],
    gdp: d[1]
}))

console.log(data)

// declare the chart dimensions and margins.
const width = 978;
const height = 550;
const marginTop = 30;
const marginRight = 20;
const marginBottom = 40;
const marginLeft = 60;

const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0)

const barPadding = 0.5;
const barWidth = ((width - marginLeft - marginRight) / data.length) - barPadding;

// declare the x (horizontal position) scale.
const x = d3.scaleTime()
    .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
    .range([marginLeft, width - marginRight]);


// declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.gdp)])
    .range([height - marginBottom, marginTop]);

// create the SVG container.
const svg = d3.create("svg")
    .attr("margin", "0 auto")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart")
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// add a title
svg.append("text")
    .attr("class", "title")
    .attr("id", "title")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .text("United States GDP")

// add a rect for each bar.
svg.append("g")
    .attr("fill", "#ff7c43")
    .selectAll()
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("data-date", d => d.dateString)
    .attr("data-gdp", d => d.gdp)
    .attr("x", d => x(d.date))
    .attr("y", d => y(d.gdp))
    .attr("height", d => y(0) - y(d.gdp))
    .attr("width", barWidth)
    .on("mouseover", (event, d) => {
        console.log(`${JSON.stringify(d)}`)
        d3.select(event.currentTarget)
            .attr("fill", "white")
        tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
        tooltip.html(`
            ${d.date.getFullYear()} Q${getQuarter(d.date)}
            <br>
            ${Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(d.gdp)} Billion`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        tooltip.attr("data-date", d.dateString)
    })
    .on("mouseout", (event, d) => {
        console.log("Blah")
        d3.select(event.currentTarget)
            .attr("fill", "#ff7c43")
        tooltip.transition()
            .duration(400)
            .style("opacity", 0);
    });

// Add the x-axis with year labels.
svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x)
        .ticks(d3.timeYear.every(5))
        .tickFormat(d3.timeFormat("%Y"))
    ).call(g => g.append("text")
        .attr("x", ((width - marginRight) / 2))
        .attr("y", 35)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Year"));;

// Add the y-axis and label.
svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y))
    // .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("GDP (Billions)"));

// Return the SVG element.
container.append(svg.node());








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
