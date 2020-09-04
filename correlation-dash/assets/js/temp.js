d3.csv("assets/data/data.csv").then(function(data) {

    var scatter_data1 = [];
    var scatter_data2 = [];
    for(var i = 0; i < data.length; i++){
        scatter_data1.push([
            parseInt(data[i]["age"]),
            parseInt(data[i]["healthcare"]),
            data[i]["abbr"]
        ]);
    }

    var width = 700;
    var height = 300;

    var xLinearScale = d3.scaleLinear()
      .domain([0, 50])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, 50])
      .range([0, height]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", width)
            .attr("height", height);


    svg.selectAll("circle")
           .data(scatter_data1)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
               return xLinearScale(d[0]);
          })
          .attr("cy", function(d) {
               return yLinearScale(d[1]);
          })
          .attr("r", 2.5);

    svg.selectAll("text") // Note "text", not "circle" or "rect"
        .data(scatter_data1)
        .enter()
        .append("text") // Same here!
        .text(function(d) {
          return d[2];
        })
        .attr("x", function(d) {
            return xLinearScale(d[0]);
        })
        .attr("y", function(d) {
            return yLinearScale(d[1]);
        })

});
