import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import type { IMemberInfo } from '~/types/dataTypes';
import LoadingChart from '../animation/LoadingChart';
import { calculateFontSize } from '~/utils/d3Helpers';

interface HierarchyNode {
  name: string;
  generation?: string;
  value?: number;
  children?: HierarchyNode[];
}

interface Props {
  data: IMemberInfo[] | undefined;
}

export default function BubbleChart({ data }: Props) {
  if (data === undefined) return <LoadingChart />;
  const groupByGen = data?.reduce(
    (group, member) => {
      (group[member.generation] ||= []).push(member);
      return group;
    },
    {} as Record<string, typeof data>
  );
  const generations = Object.keys(groupByGen);

  const width = Math.min(window.innerWidth * 0.9, 1200);
  const height = Math.min(window.innerHeight - 160, 800);

  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('text-anchor', 'middle');

    const color = d3.scaleOrdinal().domain(generations).range(d3.schemeCategory10);

    const pack = d3.pack<HierarchyNode>().size([width, height]);

    const inputObject: HierarchyNode = {
      name: 'root',
      children: generations.map((generation) => ({
        name: generation,
        children: groupByGen[generation].map((member) => ({
          name: member.memberNameEn,
          value: member.subscribers,
          generation: member.generation,
        })),
      })),
    };

    const hierarchy = d3.hierarchy(inputObject).sum((d) => d.value ?? 0);

    const root = pack(hierarchy);

    const nodes = root.descendants?.() ?? [];

    const bubbles = svg
      .selectAll('.bubble')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'bubble')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

    bubbles
      .filter((d) => d.depth === 1)
      .append('circle')
      .attr('r', (d) => d.r)
      .attr('fill', (d) => color(d.data.name) as string)
      .attr('opacity', 0.4);

    bubbles
      .filter((d) => d.depth === 2)
      .append('circle')
      .attr('r', (d) => d.r)
      .attr('fill', (d) => color(d.parent?.data.name ?? '') as string);

    bubbles
      .filter((d) => d.depth === 2)
      .append('text')
      .attr('dy', '-0.4em')
      .style('text-anchor', 'middle')
      .style('font-size', (d) => `${calculateFontSize(d.r) * 0.8}px`)
      .text((d) => d.data.name);

    // Member subscriber count
    bubbles
      .filter((d) => d.depth === 2)
      .append('text')
      .attr('x', 0)
      .attr('dy', '1.2em')
      .style('font-size', (d) => `${calculateFontSize(d.r)}px`)
      .text((d) => d.data.value?.toLocaleString() ?? 0);
  }, [height, width]);

  return <svg ref={chartRef} className="h-auto w-[90%] rounded-4xl bg-slate-500 sm:w-[70%]" />;
}
