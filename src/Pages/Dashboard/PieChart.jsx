import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const svgWidth = 300;
const svgHeight = 300;
const radius = Math.min(svgWidth, svgHeight) / 2;

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0 && chartRef.current) {
      d3.select(chartRef.current).selectAll('svg').remove();

      const svg = d3.select(chartRef.current)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`);

      const pie = d3.pie().value(d => d.value);
      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const slices = pie(data);

      const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.label))
        .range(['#ff8c00', '#dc143c', '#008080', '#9932cc', '#7cfc00']);

      svg.selectAll('path')
        .data(slices)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => colorScale(data[i].label));

      svg.selectAll('text')
        .data(slices)
        .enter()
        .append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .text(d => d.data.label);
    }
  }, [data]);

  return <div className='m-10 p-10'>
  <h1 className='text-3xl text-center font-bold text-blue-800 p-5'>Task Status in Pie Chart</h1>
  <div ref={chartRef}></div>
</div>;
};

export default PieChart;
