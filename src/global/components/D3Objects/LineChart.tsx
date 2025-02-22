import * as d3 from 'd3';
import { IMemberData } from '@/types/dataTypes';
import { useEffect, useRef } from 'react';
import { useSelectedMember } from '@/hooks/useSelectedMember';

const margin = { top: 20, right: 80, bottom: 40, left: 80 };

interface Props {
  data: IMemberData[];
}

export default function LineChart({ data }: Props): React.JSX.Element {
  const width = 700;
  const height = 500;
  const { refetchData } = useSelectedMember();

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType('navigation');
    if (
      data.length === 0 &&
      navigationEntries.length > 0 &&
      (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload'
    ) {
      setTimeout(refetchData, 100);
    }
  }, [data, refetchData]);

  const chartRef = useRef<SVGSVGElement | null>(null);
  const dataArray = data?.map((item) => {
    return { dateCollected: new Date(item.dateCollected), subscribers: item.subscribers };
  });

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();
    const dateExtent = d3.extent(dataArray, (d) => d.dateCollected) as [Date, Date];

    const x = d3
      .scaleUtc()
      .domain(dateExtent)
      .range([margin.left, width - margin.right]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(dataArray, (d) => 2 * d.subscribers) || 1])
      .range([height - margin.bottom, margin.top]);

    // Create X axis and grid lines
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(dateExtent.length)
          .tickSizeOuter(2)
          .tickSize(-height + margin.top + margin.bottom)
          .tickFormat(null)
      )
      .selectAll('text')
      .style('font-size', '12px')
      .text((d) => d3.timeFormat('%m/%d/%Y')(d as Date))
      .attr('transform', 'translate(0, 5)');

    // Create Y axis and grid lines
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSizeOuter(2)
          .tickSize(-width + margin.left + margin.right)
          .tickFormat(null)
      )
      .selectAll('text')
      .style('font-size', '12px');

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('padding', '5px 10px')
      .style('background', 'rgba(0, 0,0,0.2)')
      .style('color', 'white')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('display', 'none');

    // Create data and dot on data point
    svg
      .selectAll('.dot')
      .data(dataArray)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => x(d.dateCollected))
      .attr('cy', (d) => y(d.subscribers))
      .attr('r', 4)
      .attr('fill', 'white')
      .attr('stroke-width', 1)
      .on('mouseover', function (event: MouseEvent, d) {
        tooltip
          .style('display', 'inline-block')
          .html(
            `Date: ${d.dateCollected.toLocaleDateString()} <br>Subscribers: ${d.subscribers.toLocaleString()}`
          )
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY + 5}px`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMinYMin meet');
  }, [dataArray, height, width]);

  return <svg ref={chartRef} className="h-auto w-[90%] sm:w-[70%]" />;
}
