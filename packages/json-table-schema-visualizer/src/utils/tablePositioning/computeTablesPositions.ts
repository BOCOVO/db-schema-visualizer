import dagre from "@dagrejs/dagre";

import { computeTableDimension } from "../computeTableDimension";

import type { JSONTableRef, JSONTableTable } from "shared/types/tableSchema";

import { TABLES_GAP_X, TABLES_GAP_Y } from "@/constants/sizing";
import { type XYPosition } from "@/types/positions";

const computeTablesPositions = (
  tables: JSONTableTable[],
  refs: JSONTableRef[],
): Map<string, XYPosition> => {
  const graph = new dagre.graphlib.Graph();
  graph.setGraph({
    nodesep: TABLES_GAP_X * 3,
    ranksep: TABLES_GAP_Y * 3,
    rankdir: "LR",
  });
  graph.setDefaultEdgeLabel(function () {
    return {};
  });

  tables.forEach((table) => {
    const { height, width } = computeTableDimension(table);
    graph.setNode(table.name, { width, height });
  });

  refs.forEach((ref) => {
    graph.setEdge(ref.endpoints[0].tableName, ref.endpoints[1].tableName);
  });

  dagre.layout(graph);

  const rawPositions: Array<{ name: string; x: number; y: number }> = [];

  graph.nodes().forEach((node) => {
    const nodeData = graph.node(node);
    if (nodeData == null) return;
    const width = !isNaN(nodeData.width) ? nodeData.width : 0;
    const height = !isNaN(nodeData.height) ? nodeData.height : 0;
    const topLeftX = nodeData.x - width / 2;
    const topLeftY = nodeData.y - height / 2;
    rawPositions.push({ name: node, x: topLeftX, y: topLeftY });
  });

  if (rawPositions.length === 0) {
    return new Map<string, XYPosition>();
  }

  const minX = Math.min(...rawPositions.map((pos) => pos.x));
  const minY = Math.min(...rawPositions.map((pos) => pos.y));

  const paddingX = TABLES_GAP_X;
  const paddingY = TABLES_GAP_Y;

  const tablesPositions = new Map<string, XYPosition>();
  rawPositions.forEach((pos) => {
    tablesPositions.set(pos.name, {
      x: pos.x - minX + paddingX,
      y: pos.y - minY + paddingY,
    });
  });

  return tablesPositions;
};

export default computeTablesPositions;
