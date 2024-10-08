import dagre from "@dagrejs/dagre";

import { computeTableDimension } from "../computeTableDimension";

import type { JSONTableRef, JSONTableTable } from "shared/types/tableSchema";

import { TABLES_GAP_X, TABLES_GAP_Y } from "@/constants/sizing";
import { type XYPosition } from "@/types/positions";

const computeTablesPositions = (
  tables: JSONTableTable[],
  refs: JSONTableRef[],
): Map<string, XYPosition> => {
  const tablesPositions = new Map<string, XYPosition>();

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

  graph.nodes().forEach((node) => {
    const { x, y } = graph.node(node);
    tablesPositions.set(node, { x, y });
  });
  return tablesPositions;
};

export default computeTablesPositions;
