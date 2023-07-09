import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const svgWidth = 500;
const svgHeight = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0 && chartRef.current) {
      const svg = d3.select(chartRef.current);

      svg.selectAll('*').remove(); // Clear any existing chart elements

      const chart = svg
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const xScale = d3
        .scaleBand()
        .range([0, chartWidth])
        .padding(0.1)
        .domain(data.map(d => d.x));

      const yScale = d3
        .scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(data, d => d.y)]);

      const colorScale = d3
        .scaleOrdinal()
        .domain(data.map(d => d.x))
        .range(['#d62728', '#1f77b4', '#2ca02c', '#ff7f0e']);

      chart
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.x))
        .attr('y', d => yScale(d.y))
        .attr('width', xScale.bandwidth())
        .attr('height', d => chartHeight - yScale(d.y))
        .style('fill', d => colorScale(d.x))
        .each(function(d) {
          const bar = d3.select(this);
          const barWidth = bar.attr('width');
          const barHeight = bar.attr('height');
          const x = parseFloat(bar.attr('x')) + parseFloat(barWidth) / 2;
          const y = parseFloat(bar.attr('y')) + parseFloat(barHeight) / 2;

          chart
            .append('text')
            .attr('class', 'bar-label')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .text(d.y);
        });

      chart
        .append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));

      chart.append('g').call(d3.axisLeft(yScale));
    }
  }, [data]);

  return <div className='m-10 p-10'>
    <h1 className='text-3xl text-center font-bold text-blue-800 py-5'>Task Status in Bar Chart</h1>
    <div ref={chartRef}></div>
  </div>;
};

export default BarChart;
