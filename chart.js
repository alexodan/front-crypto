import { aggregateMinMaxPricesByDate } from './utils.js';
import objs from './data.js';

var data = aggregateMinMaxPricesByDate(objs);

var width = 460;
var height = 400;

var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#my_dataviz")
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

// Add Y axis
var y = d3.scaleLinear()
  .domain([110, d3.max(data, (d) => d.max_purchase_price)])
  .range([ height, 0 ]);

svg.append("g")
  .call(d3.axisLeft(y));

// Add the line
svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x((d) => x(d.date))
    .y((d) => y(d.max_purchase_price))
  );
