import dagre from "@dagrejs/dagre";

import { computeTableDimension } from "../computeTableDimension";

import type { JSONTableRef, JSONTableTable } from "shared/types/tableSchema";

import { TABLES_GAP_X, TABLES_GAP_Y } from "@/constants/sizing";
import { type XYPosition } from "@/types/positions";

const computeTablesPositions = (
  tables: JSONTableTable[],
  refs: JSONTableRef[],
): Map<string, XYPosition> => {
  console.log({ tables, refs });
  const tablesPositions = new Map<string, XYPosition>();

  const graph = new dagre.graphlib.Graph();
  graph.setGraph({
    nodesep: TABLES_GAP_X * 4,
    ranksep: TABLES_GAP_Y * 4,
    rankdir: "LR",
  });
  graph.setDefaultEdgeLabel(function () {
    return {};
  });

  tables.forEach((table) => {
    const { height, width } = computeTableDimension(table);
    console.log(table.name, { width, height });
    graph.setNode(table.name, { width, height });
  });

  refs.forEach((ref) => {
    console.log(ref.endpoints[0].tableName, ref.endpoints[1].tableName);
    graph.setEdge(ref.endpoints[0].tableName, ref.endpoints[1].tableName);
  });

  dagre.layout(graph, {
    customOrder(graph, order) {
      console.log(order);
    },
  });

  graph.nodes().forEach((node) => {
    const { x, y } = graph.node(node);
    tablesPositions.set(node, { x, y });
  });
  return tablesPositions;
};

export default computeTablesPositions;
