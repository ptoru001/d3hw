d3.csv("assets/data/data.csv").then(function(censusData) {
    var svgWidth = 960;
    var svgHeight = 500;

    var margin = {
      top: 20,
      right: 40,
      bottom: 60,
      left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select("#scatter1")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);


    censusData.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
    });

    var xLinearScale = d3.scaleLinear()
      .domain(d3.extent(censusData, d => d.poverty))
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(censusData, d => d.healthcare)])
      .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("Circle")
      .data(censusData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "15")
      .attr("fill", "blue")
      .attr("opacity", "0.5");

    var circleLabels = chartGroup.selectAll(null).data(censusData).enter().append("text");

    circleLabels
      .attr("x", function(d) {
        return xLinearScale(d.poverty);
      })
      .attr("y", function(d) {
        return yLinearScale(d.healthcare);
      })
      .text(function(d) {
        return d.abbr;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")
      .attr("text-anchor", "middle")
      .attr("fill", "white");

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");


      var svg = d3.select("#scatter2")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

      var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


      censusData.forEach(function(data) {
        data.smokes = +data.smokes;
        data.age = +data.age;
      });

      var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(censusData, d => d.age))
        .range([0, width]);

      var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(censusData, d => d.smokes)])
        .range([height, 0]);

      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

      chartGroup.append("g")
        .call(leftAxis);

      var circlesGroup = chartGroup.selectAll("Circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "15")
        .attr("fill", "red")
        .attr("opacity", "0.5");

      var circleLabels = chartGroup.selectAll(null).data(censusData).enter().append("text");

      circleLabels
        .attr("x", function(d) {
          return xLinearScale(d.age);
        })
        .attr("y", function(d) {
          return yLinearScale(d.smokes);
        })
        .text(function(d) {
          return d.abbr;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("text-anchor", "middle")
        .attr("fill", "white");

      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smokes (%)");

      chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Age");
});
