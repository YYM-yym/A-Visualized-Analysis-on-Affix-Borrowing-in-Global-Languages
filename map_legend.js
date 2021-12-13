var svg = d3.select('#charty');

var width = svg.attr('width'),
    height = svg.attr('height'),
    g = svg.append('g')

var color = d3.scaleOrdinal([
    '#c45000',
    '#fe9b56',
    '#f9c29c',
    '#bcbcbc',
]);

svg.append("circle")
    .attr('cx', 50)
    .attr('cy', 50 + 225)
    .attr('r', 10)
    .style('fill', color(0));

svg.append('text')
    .attr('x', 80)
    .attr('y', 50 + 225)
    .style('fill', 'white')
    .text('> 1000000')
    .style('font-size', '21px')
    .attr('alignment-baseline', 'middle');

svg.append("circle")
    .attr('cx', 50)
    .attr('cy', 75 + 225)
    .attr('r', 10)
    .style('fill', color(1));

svg.append('text')
    .attr('x', 80)
    .attr('y', 75 + 225)
    .style('fill', 'white')
    .text('> 10000')
    .style('font-size', '21px')
    .attr('alignment-baseline', 'middle');

svg.append("circle")
    .attr('cx', 50)
    .attr('cy', 100 + 225)
    .attr('r', 10)
    .style('fill', color(2));

svg.append('text')
    .attr('x', 80)
    .attr('y', 100 + 225)
    .style('fill', 'white')
    .text('> 0')
    .style('font-size', '21px')
    .attr('alignment-baseline', 'middle');

svg.append("circle")
    .attr('cx', 50)
    .attr('cy', 125 + 225)
    .attr('r', 10)
    .style('fill', color(3));

svg.append('text')
    .attr('x', 80)
    .attr('y', 125 + 225)
    .style('fill', 'white')
    .text('Extinct')
    .style('font-size', '21px')
    .attr('alignment-baseline', 'middle');