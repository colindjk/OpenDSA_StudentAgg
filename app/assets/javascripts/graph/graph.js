$.ajax({
           type: "GET",
           contentType: "application/json; charset=utf-8",
           url: 'index',
           dataType: 'json',
           success: function (data) {
               draw(data);
           },
           error: function (result) {
               error();
           }
       });

function draw(data_by_day) {

  var data = data_by_day;

  var valueLabelWidth = 40; // space reserved for value labels (right)
  var barHeight = 20; // height of one bar
  var barLabelWidth = 100; // space reserved for bar labels
  var barLabelPadding = 5; // padding between bar and bar labels (left)
  var gridLabelHeight = 18; // space reserved for gridline labels
  var gridChartOffset = 3; // space between start of grid and first bar
  var maxBarWidth = 420; // width of the bar with the max value

  // accessor functions 
  var barLabel = function(d) { return d.day_of; };
  var barValue = function(d) { return parseFloat(d.num_users_day); };

  // scales
  var yScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeBands([0, data.length * barHeight]);
  var y = function(d, i) { return yScale(i); };
  var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
  var x = d3.scale.linear().domain([0, d3.max(data, barValue)]).range([0, maxBarWidth]);

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>Users:</strong> <span style='color:red'>" + d.num_users_day + "</span>";
    });

  // svg container element
  var chart = d3.select('body').append("svg")
    .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
    .attr('height', gridLabelHeight + gridChartOffset + data.length * barHeight);

  chart.call(tip);

  // grid line labels
  var gridContainer = chart.append('g')
    .attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')'); 
  gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")
    .attr("x", x)
    .attr("dy", -3)
    .attr("text-anchor", "middle")
    .text(String);
  // vertical grid lines
  gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
    .style("stroke", "#ccc");

  // bar labels
  var labelsContainer = chart.append('g')
    .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
  labelsContainer.selectAll('text').data(data).enter().append('text')
    .attr('y', yText)
    .attr('stroke', 'none')
    .attr('fill', 'black')
    .attr("dy", ".35em") // vertical-align: middle
    .attr('text-anchor', 'end')
    .text(barLabel);

  // bars
  var barsContainer = chart.append('g')
    .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 

  barsContainer.selectAll("rect").data(data).enter().append("rect")
    .attr('y', y)
    .attr('height', yScale.rangeBand())
    .attr('width', function(d) { return x(barValue(d)); })
    .attr('stroke', 'white')
    .attr('fill', 'steelblue')
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

  // bar value labels
  barsContainer.selectAll("text").data(data).enter().append("text")
    .attr("x", function(d) { return x(barValue(d)); })
    .attr("y", yText)
    .attr("dx", 3) // padding-left
    .attr("dy", ".35em") // vertical-align: middle
    .attr("text-anchor", "start") // text-align: right
    .attr("fill", "black")
    .attr("stroke", "none")
    .text(function(d) { return d3.round(barValue(d), 2); });

  // start line
  barsContainer.append("line")
    .attr("y1", -gridChartOffset)
    .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
    .style("stroke", "#000");

  //var width  = 2000;
  //var height = 2000;

  //var widthScale = d3.scale.linear()
                     //.domain([0, 200])
                     //.range([0, width]);

  //var color = d3.scale.linear()
                //.domain([0, 200])
                //.range(["green", "blue"]);

  //var axis = d3.svg.axis()
              //.scale(widthScale);

  //var canvas = d3.select("body")
                 //.append("svg")
                 //.attr("width",  width)
                 //.attr("height", height)
                 //.append("g") // add 'everyone' to a group
                 //.attr("transform", "translate(50, 0)");
                 ////.call(axis);

  //var bars = canvas.selectAll("rect")
              //.data(data_by_day)
              //.enter()
              //.append("rect")
              //.attr("width",
                //function (data) { return widthScale(data.num_users_day); })
              //.attr("height", 50)
              //.attr("fill",
                //function(data) { return color(data.num_users_day); })
              //.attr("y", function(data, index) { return index * 100; });

  //var data = data_by_day;
  //console.log(data);
  //var color = d3.scale.category20b();
  //var width = 420,
      //barHeight = 20;

  //var x = d3.scale.linear()
      //.range([0, width])
      //.domain([0,
          //d3.max(
            //data.map(function (day) { return day.num_users_day; }))]);

  //var chart = d3.select("#graph")
      //.attr("width", width)
      //.attr("height", barHeight * data.length);

  //var bar = chart.selectAll("g")
      //.data(data.map(function (day) { return day.num_users_day; }))
      //.enter().append("g")
      //.attr("transform", function (d, i) {
                //return "translate(0," + i * barHeight + ")";
            //});

  //bar.append("rect")
      //.attr("width", x)
      //.attr("height", barHeight - 1)
      //.style("fill", function (d) {
        //return color(d);
      //});

  //bar.append("text")
      //.attr("x", function (d) {
                //return x(d) - 10;
            //})
      //.attr("y", barHeight / 2)
      //.attr("dy", ".35em")
      //.style("fill", "white")
      //.text(function (d) {
                //return d;
            //});

}

function error() {
  console.log("error");
}
