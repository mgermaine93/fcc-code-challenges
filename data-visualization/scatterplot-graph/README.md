# Visualize Data with a Scatterplot Graph

## Objective

Build an app that is functionally similar to this: [https://scatterplot-graph.freecodecamp.rocks](https://scatterplot-graph.freecodecamp.rocks).

## User Stories

Fulfill the below user stories and get all of the tests to pass. Use whichever libraries or APIs you need. Give it your own personal style.

You can use HTML, JavaScript, CSS, and the D3 svg-based visualization library. The tests require axes to be generated using the D3 axis property, which automatically generates ticks along the axis. These ticks are required for passing the D3 tests because their positions are used to determine alignment of graphed elements. You will find information about generating axes at [https://d3js.org/d3-axis](https://d3js.org/d3-axis). Required DOM elements are queried on the moment of each test. If you use a frontend framework (like Vue for example), the test results may be inaccurate for dynamic content. We hope to accommodate them eventually, but these frameworks are not currently supported for D3 projects.

- [ ] User Story #1: I can see a title element that has a corresponding `id="title"`.
- [ ] User Story #2: I can see an x-axis that has a corresponding `id="x-axis"`.
- [ ] User Story #3: I can see a y-axis that has a corresponding `id="y-axis"`.
- [ ] User Story #4: I can see dots, that each have a class of `dot`, which represent the data being plotted.
- [ ] User Story #5: Each dot should have the properties `data-xvalue` and `data-yvalue` containing their corresponding `x` and `y` values.
- [ ] User Story #6: The `data-xvalue` and `data-yvalue` of each dot should be within the range of the actual data and in the correct data format. For `data-xvalue`, integers (full years) or `Date` objects are acceptable for test evaluation. For `data-yvalue` (minutes), use `Date` objects.
- [ ] User Story #7: The `data-xvalue` and its corresponding dot should align with the corresponding point/value on the x-axis.
- [ ] User Story #8: The `data-yvalue` and its corresponding dot should align with the corresponding point/value on the y-axis.
- [ ] User Story #9: I can see multiple tick labels on the y-axis with `%M:%S` time format.
- [ ] User Story #10: I can see multiple tick labels on the x-axis that show the year.
- [ ] User Story #11: I can see that the range of the x-axis labels are within the range of the actual x-axis data.
- [ ] User Story #12: I can see that the range of the y-axis labels are within the range of the actual y-axis data.
- [ ] User Story #13: I can see a legend containing descriptive text that has `id="legend"`.
- [ ] User Story #14: I can mouse over an area and see a tooltip with a corresponding `id="tooltip"` which displays more information about the area.
- [ ] User Story #15: My tooltip should have a `data-year` property that corresponds to the `data-xvalue` of the active area.

Here is the dataset you will need to complete this project: [https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json)

You can build your project by using this CodePen template and clicking Save to create your own pen. Or you can use this CDN link to run the tests in any environment you like: [https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js](https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js)

Once you're done, submit the URL to your working project with all its tests passing.
