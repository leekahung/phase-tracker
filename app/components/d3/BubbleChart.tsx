import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import type { IMemberInfo } from '~/types/dataTypes';
import LoadingChart from '../animation/LoadingChart';
import { calculateFontSize } from '~/utils/d3Helpers';
import DataTable from '~/pages/member/components/DataCharts/DataTable';

interface HierarchyNode {
  name?: string;
  generation?: string;
  value?: number;
  children?: HierarchyNode[];
}

interface SimulatedHierarchyNode extends d3.HierarchyCircularNode<HierarchyNode> {
  vx: number;
  vy: number;
}

interface Props {
  data: IMemberInfo[] | undefined;
}

export default function BubbleChart({ data }: Props) {
  if (data === undefined) return <LoadingChart />;
  const [genSelected, setGenSelected] = useState<string[]>([]);

  const handleGenSelected = (generation: string): void => {
    setGenSelected((prev) => {
      if ([...prev].includes(generation)) {
        return prev.filter((gen) => gen !== generation);
      }
      return [...prev, generation];
    });
  };

  const groupByGen = data?.reduce(
    (group, member) => {
      (group[member.generation] ||= []).push(member);
      return group;
    },
    {} as Record<string, typeof data>
  );
  const generations = Object.keys(groupByGen);

  const width = Math.min(window.innerWidth * 0.9, 1200);
  const height = Math.min(window.innerHeight - 200, 800);

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

    const inputObject: HierarchyNode = {
      children: data
        .map((member) => ({
          name: member.memberNameEn,
          value: member.subscribers,
          generation: member.generation,
        }))
        .filter((gen) => {
          const filterCondition = genSelected.includes(gen.generation);
          if (genSelected.length === 0) return !filterCondition;
          return filterCondition;
        }),
    };

    const hierarchy = d3.hierarchy<HierarchyNode>(inputObject).sum((d) => d.value ?? 0);
    const nodes = d3.pack<HierarchyNode>().size([width, height]).padding(1)(hierarchy).leaves();

    const simulation = d3
      .forceSimulation(nodes)
      .force('x', d3.forceX(width / 2).strength(0.01))
      .force('y', d3.forceY(height / 2).strength(0.01))
      .force('cluster', forceCluster())
      .force('collide', forceCollide())
      .force('bounds', forceBoundaries(width, height));

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('fill', (d) => color(d.data.generation || 'default') as string)
      .call(drag(simulation));

    node
      .transition()
      .delay(() => Math.random() * 500)
      .duration(750)
      .attrTween('r', (d) => {
        const i = d3.interpolate(0, d.r);
        return (t) => `${(d.r = i(t))}`;
      });

    const labelNamePart1 = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('dy', (d) => `-${calculateFontSize(d.r)}px`)
      .attr('fill', 'white')
      .attr('font-size', (d) => `${calculateFontSize(d.r)}px`)
      .attr('width', (d) => `${d.r}px`)
      .attr('text-anchor', 'middle')
      .attr('class', 'opacity-0 transition-opacity duration-700')
      .text((d) => `${d.data.name?.split(' ')[0]}`);

    const labelNamePart2 = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('dy', 0)
      .attr('fill', 'white')
      .attr('font-size', (d) => `${calculateFontSize(d.r)}px`)
      .attr('width', (d) => `${d.r}px`)
      .attr('text-anchor', 'middle')
      .attr('class', 'opacity-0 transition-opacity duration-700')
      .text((d) => `${d.data.name?.split(' ')[1]}`);

    const labelValues = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('dy', (d) => `${calculateFontSize(d.r) * 1.3}px`)
      .attr('fill', 'white')
      .attr('font-size', (d) => `${calculateFontSize(d.r)}px`)
      .attr('text-anchor', 'middle')
      .attr('class', 'opacity-0 transition-opacity duration-700')
      .text((d) => `${d.data.value?.toLocaleString()}`);

    setTimeout(() => {
      d3.selectAll('text').classed('opacity-100', true).classed('opacity-0', false);
    }, 700);

    simulation.on('tick', () => {
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      labelNamePart1.attr('x', (d) => d.x).attr('y', (d) => d.y);
      labelNamePart2.attr('x', (d) => d.x).attr('y', (d) => d.y);
      labelValues.attr('x', (d) => d.x).attr('y', (d) => d.y);
    });
  }, [height, width, genSelected]);

  return (
    <>
      <svg ref={chartRef} className="h-auto w-[90%] rounded-4xl bg-slate-500 sm:w-[70%]" />
      <DataTable
        genList={generations}
        groupObject={groupByGen}
        genSelected={genSelected}
        handleGenSelected={handleGenSelected}
      />
    </>
  );
}

const drag = (simulation) => {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  const dragAction = d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);

  return dragAction;
};

function centroid(nodes: d3.HierarchyCircularNode<HierarchyNode>[]): { x: number; y: number } {
  let x = 0;
  let y = 0;
  let z = 0;
  for (const d of nodes) {
    const k = d.r ** 2;
    x += d.x * k;
    y += d.y * k;
    z += k;
  }
  return { x: x / z, y: y / z };
}

function forceCluster() {
  const strength = 0.2;
  let nodes: SimulatedHierarchyNode[];

  function force(alpha: number) {
    const centroids = d3.rollup(nodes, centroid, (d) => d.data.generation);
    const l = alpha * strength;
    for (const d of nodes) {
      const { x: cx, y: cy } = centroids.get(d.data.generation) as { x: number; y: number };
      d.vx -= (d.x - cx) * l;
      d.vy -= (d.y - cy) * l;
    }
  }

  force.initialize = (_: SimulatedHierarchyNode[]) => (nodes = _);

  return force;
}

function forceCollide() {
  const alpha = 0.4;
  const paddingWithinGroup = 2;
  const paddingBetweenGroups = 4;
  let nodes: SimulatedHierarchyNode[];
  let maxRadius: number;

  function force() {
    const quadtree = d3.quadtree(
      nodes,
      (d) => d.x,
      (d) => d.y
    );
    for (const d of nodes) {
      const r = d.r + maxRadius;
      const nx1 = d.x - r,
        ny1 = d.y - r;
      const nx2 = d.x + r,
        ny2 = d.y + r;
      quadtree.visit((q, x1, y1, x2, y2) => {
        if (!q.length)
          do {
            if ('data' in q && q.data !== d) {
              const r =
                d.r +
                q.data.r +
                (d.data.generation === q.data.data.generation
                  ? paddingWithinGroup
                  : paddingBetweenGroups);
              let x = d.x - q.data.x;
              let y = d.y - q.data.y;
              let l = Math.hypot(x, y);
              if (l < r) {
                l = ((l - r) / l) * alpha;
                d.x -= x *= l;
                d.y -= y *= l;
                q.data.x += x;
                q.data.y += y;
              }
            }
          } while (q === q.next);
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    }
  }

  force.initialize = (_: SimulatedHierarchyNode[]) =>
    (maxRadius =
      (d3.max((nodes = _), (d) => d.r) ?? 0) + Math.max(paddingWithinGroup, paddingBetweenGroups));

  return force;
}

function forceBoundaries(width: number, height: number) {
  let nodes: SimulatedHierarchyNode[];

  function force() {
    for (const d of nodes) {
      d.x = Math.max(d.r, Math.min(width - d.r, d.x));
      d.y = Math.max(d.r, Math.min(height - d.r, d.y));
    }
  }

  force.initialize = (_: SimulatedHierarchyNode[]) => (nodes = _);

  return force;
}
