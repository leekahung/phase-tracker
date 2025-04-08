import {
  select,
  extent,
  scaleTime,
  scaleLinear,
  min,
  max,
  line as d3Line,
  timeFormat,
  axisBottom,
  axisLeft,
} from 'd3';
import { useEffect, useRef } from 'react';
import type { IMemberData } from '~/types/dataTypes';
import LoadingChart from '../animation/LoadingChart';

const margin = { top: 20, right: 70, bottom: 40, left: 90 };
const formatNumber = (num: number, digits: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: digits,
  }).format(num);
};

interface Props {
  data: IMemberData[] | undefined;
  dataLabel: string;
}

export default function LineChart({ data, dataLabel }: Props) {
  if (data === undefined) return <LoadingChart />;
  const width = 700;
  const height = 500;

  const chartRef = useRef<SVGSVGElement | null>(null);
  const dataArray = data
    ?.map((item) => {
      return {
        dateCollected: new Date(item.dateCollected),
        value: item[dataLabel as keyof IMemberData] as number,
      };
    })
    .sort((a, b) => a.dateCollected.getTime() - b.dateCollected.getTime());

  useEffect(() => {
    const svg = select(chartRef.current);
    svg.selectAll('*').remove();
    const dateExtent = extent(dataArray, (d) => d.dateCollected) as [Date, Date];

    const x = scaleTime()
      .domain(dateExtent)
      .range([margin.left, width - margin.right]);
    const y = scaleLinear()
      .domain([
        min(dataArray, (d) => 0.99 * d.value) || 0,
        max(dataArray, (d) => 1.01 * d.value) || 1,
      ])
      .range([height - margin.bottom, margin.top]);
    const line = d3Line<{ dateCollected: Date; value: number }>()
      .x((d) => x(d.dateCollected))
      .y((d) => y(d.value));

    svg
      .append('rect')
      .attr('x', `${margin.left}`)
      .attr('y', `${margin.top}`)
      .attr('width', `${width - margin.left - margin.right}`)
      .attr('height', `${height - margin.bottom - margin.top}`)
      .attr('fill', 'rgba(255, 255, 255, 0.4)')
      .attr('filter', 'url(#blur)');

    // Create X axis and grid lines
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        axisBottom(x)
          .tickValues(dataArray.map((d) => d.dateCollected))
          .tickSizeOuter(2)
          .tickSize(-height + margin.top + margin.bottom)
          .tickFormat(null)
      )
      .selectAll('text')
      .attr('class', (_, index) => (index % 2 !== 0 ? 'hidden' : 'text-lg sm:text-sm'))
      .text((d) => timeFormat('%m/%d')(d as Date))
      .attr('transform', 'translate(0, 10)');

    // Create Y axis and grid lines
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        axisLeft(y)
          .ticks(5)
          .tickSizeOuter(2)
          .tickSize(-width + margin.left + margin.right)
          .tickFormat((value) => formatNumber(value as number, 2))
      )
      .selectAll('text')
      .attr('class', 'text-lg sm:text-sm')
      .attr('transform', 'translate(-5, 0)');

    // Create data line
    svg
      .append('path')
      .datum(dataArray)
      .attr('fill', 'none')
      .attr('stroke', 'lightgray')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Removes any old tooltips
    const tooltipClass = `tooltip-${dataLabel}`;
    select(`.${tooltipClass}`).remove();

    // Creates new tooltips
    const tooltip = select('body')
      .append('div')
      .attr('class', `${tooltipClass} p-2 text-slate-200 bg-slate-900 absolute text-sm`)
      .style('border-radius', '4px')
      .style('display', 'none');

    const tooltipLabel =
      dataLabel.charAt(0).toLocaleUpperCase() +
      dataLabel.replace(/([a-z])([A-Z])/g, '$1 $2').slice(1);

    // Create dot on data point
    svg
      .selectAll('.dot')
      .data(dataArray)
      .enter()
      .append('circle')
      .attr('class', 'dot cursor-pointer')
      .attr('cx', (d) => x(d.dateCollected))
      .attr('cy', (d) => y(d.value))
      .attr('r', 3)
      .attr('fill', 'lightgray')
      .attr('stroke', 'lightgray')
      .attr('stroke-width', 2)
      .on('mouseenter', function (event: MouseEvent, d) {
        tooltip
          .style('display', 'inline-block')
          .html(
            `Date: ${d.dateCollected.toLocaleDateString()} <br>${tooltipLabel}: ${d.value.toLocaleString()}`
          )
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY + 5}px`);
      })
      .on('mouseleave', () => {
        tooltip.style('display', 'none');
      });

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMinYMin meet');

    return () => {
      select(`.${tooltipClass}`).remove();
    };
  }, [dataLabel, dataArray, height, width]);

  return <svg ref={chartRef} className="h-auto w-[90%] max-w-[1000px] sm:w-[70%]" />;
}
