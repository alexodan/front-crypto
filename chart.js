export function drawChart(data, chartId) {
  var width = 960;
  var height = 400;

  var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 960 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var svg = d3.select(`#${chartId}`)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleTime()
    .domain(d3.extent(data, (d) => d.date))
    .range([ 0, width ]);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
    .domain([
      d3.min(data, (d) => d.max_purchase_price),
      d3.max(data, (d) => d.min_selling_price+1)
    ])
    .range([ height, 0 ]);

  svg.append("g").call(d3.axisLeft(y));

  appendPath(svg, data, 'date', 'max_purchase_price', x, y, "green");
  appendPath(svg, data, 'date', 'min_selling_price', x, y, "red");
}

function appendPath(svg, data, xProperty, yProperty, x, y, color) {
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x((d) => x(d[xProperty]))
      .y((d) => y(d[yProperty]))
      .curve(d3.curveLinear)
    );
}